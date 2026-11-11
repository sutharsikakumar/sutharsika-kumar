// world-model.js — WebGL "world in a box" diorama (client-only, self-contained).
// await mountWorldModel(root) -> dispose() | null   (null = WebGL unavailable; caller keeps the static poster)
// Ported from the world-model-3d.html prototype; scene code is unchanged apart from lifecycle handling.

const tick = () => new Promise(r => setTimeout(r, 0));   // yield to the main thread between build chunks

export async function mountWorldModel(root) {
  const cv = root.querySelector('canvas');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let gl = null;
  try { gl = cv.getContext('webgl', { antialias: true }); } catch (e) { gl = null; }
  if (!gl) return null;
  const DERIV = !!gl.getExtension('OES_standard_derivatives');

  // ---------------------------------------------------------------- palette
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  const SLATE = hex('#474d64'), TEAL = hex('#509777'), GREEN = hex('#6fb16f'), LIME = hex('#dad881'),
        CREAM = hex('#efeeba'), INK = hex('#141414'), BG = hex('#fcfcfa');
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const ramp = t => {                                   // elevation → palette
    const S = [TEAL, GREEN, LIME, CREAM], x = Math.min(.999, Math.max(0, t)) * (S.length - 1), i = Math.floor(x);
    return mix(S[i], S[i + 1], x - i);
  };

  // ---------------------------------------------------------------- rng + noise
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const gauss = () => { let u = 0; while (!u) u = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(6.2831853 * rnd()); };
  const h2 = (i, j) => { const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return n - Math.floor(n); };
  function vnoise(x, z) {
    const i = Math.floor(x), j = Math.floor(z), fx = x - i, fz = z - j, u = fx * fx * (3 - 2 * fx), v = fz * fz * (3 - 2 * fz);
    const a = h2(i, j), b = h2(i + 1, j), c = h2(i, j + 1), d = h2(i + 1, j + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  const fbm = (x, z) => { let s = 0, a = .5, f = 1; for (let o = 0; o < 5; o++) { s += a * (vnoise(x * f, z * f) - .5); f *= 2.03; a *= .5; } return s; };

  // ---------------------------------------------------------------- terrain
  const WATER = -.075;
  const height = (x, z) => {
    const r = Math.max(Math.abs(x), Math.abs(z));
    return .16 * Math.sin(2.1 * x + .3) * Math.cos(1.7 * z) + .05 * Math.sin(5 * x + 3 * z) - .045 * (x + z)
         + .2 * fbm(x * 2.3 + 5.1, z * 2.3 + 9.7) - .35 * Math.max(0, r - .8);
  };
  const hy = (x, z) => Math.max(WATER, height(x, z));
  const land = (x, z) => { const y = height(x, z); return (y - WATER) / .34; };
  function groundCol(x, z) {
    const y = height(x, z);
    if (y < WATER) return mix(mix(SLATE, BG, .42), SLATE, Math.min(1, (WATER - y) / .12)); 
    if (y < WATER + .018) return mix(LIME, CREAM, .55);                              
    return mix(ramp(land(x, z)), [0, 0, 0], (vnoise(x * 40, z * 40) - .5) * .06);
  }


  const GP = [], GN = [], GC = [];         
  function tri(a, b, c, na, nb, nc, ca, cb, cc, flag = 0) {
    GP.push(...a, ...b, ...c); GN.push(...na, ...nb, ...nc); GC.push(...ca, flag, ...cb, flag, ...cc, flag);
  }
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => { const l = Math.hypot(...a) || 1; return a.map(v => v / l); };
  const ftri = (a, b, c, col, flag = 0) => { const n = norm(cross(sub(b, a), sub(c, a))); tri(a, b, c, n, n, n, col, col, col, flag); };

  // terrain grid (smooth normals, vertex colours)
  const M = 200, tn = (x, z) => { const e = .004; return norm([hy(x - e, z) - hy(x + e, z), 2 * e, hy(x, z - e) - hy(x, z + e)]); };
  const V = [];
  for (let i = 0; i <= M; i++) { if (i % 20 === 0) await tick(); V[i] = []; for (let j = 0; j <= M; j++) {
    const x = i / M * 2 - 1, z = j / M * 2 - 1;
    V[i][j] = { p: [x, hy(x, z), z], n: tn(x, z), c: groundCol(x, z), in: true, w: height(x, z) < WATER };
  } }
  for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) {
    const a = V[i][j], b = V[i][j + 1], c = V[i + 1][j], d = V[i + 1][j + 1];
    if (!(a.in && b.in && c.in && d.in)) continue;
    const f = (a.w && b.w && c.w && d.w) ? 0 : 1;
    tri(a.p, b.p, c.p, a.n, b.n, c.n, a.c, b.c, c.c, f);
    tri(b.p, d.p, c.p, b.n, d.n, c.n, b.c, d.c, c.c, f);
  }
  const TERRAIN_VERTS = GP.length / 3;

  // icosphere (subdiv 1) for foliage / rocks
  const ICO = (() => {
    const t = (1 + Math.sqrt(5)) / 2;
    let v = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(norm);
    let f = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
             [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
    const base = f.map(([a, b, c]) => [v[a], v[b], v[c]]);
    const s1 = [];
    for (const [a, b, c] of base) {
      const ab = norm(a.map((x, i) => x + b[i])), bc = norm(b.map((x, i) => x + c[i])), ca = norm(c.map((x, i) => x + a[i]));
      s1.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    return { 0: base, 1: s1 };
  })();
  function blob(c, r, col, { sub = 1, squash = .85, wob = .16, vary = .05 } = {}) {
    const k = [rnd() * 9 + 3, rnd() * 9 + 3, rnd() * 9 + 3];
    const tf = u => { const s = 1 + wob * Math.sin(u[0] * k[0] + u[1] * k[1] + u[2] * k[2]);
      return [c[0] + u[0] * r * s, c[1] + u[1] * r * s * squash, c[2] + u[2] * r * s]; };
    for (const [a, b, d] of ICO[sub]) ftri(tf(a), tf(b), tf(d), mix(col, rnd() < .5 ? BG : SLATE, rnd() * vary));
  }
  function cone(cx, by, cz, r, h, col, seg = 9, rot = 0) {
    const top = [cx, by + h, cz];
    for (let s = 0; s < seg; s++) {
      const a0 = rot + s / seg * 6.2832, a1 = rot + (s + 1) / seg * 6.2832;
      ftri(top, [cx + Math.cos(a1) * r, by, cz + Math.sin(a1) * r], [cx + Math.cos(a0) * r, by, cz + Math.sin(a0) * r],
           mix(col, s % 2 ? BG : SLATE, .04));
      // underside skirt so tiers read as layered
      ftri([cx, by + h * .12, cz], [cx + Math.cos(a0) * r, by, cz + Math.sin(a0) * r], [cx + Math.cos(a1) * r, by, cz + Math.sin(a1) * r], mix(col, SLATE, .35));
    }
  }
  function cyl(cx, by, cz, r, h, col, seg = 6) {
    for (let s = 0; s < seg; s++) {
      const a0 = s / seg * 6.2832, a1 = (s + 1) / seg * 6.2832;
      const p00 = [cx + Math.cos(a0) * r, by, cz + Math.sin(a0) * r], p01 = [cx + Math.cos(a1) * r, by, cz + Math.sin(a1) * r];
      const p10 = [p00[0], by + h, p00[2]], p11 = [p01[0], by + h, p01[2]];
      ftri(p00, p10, p01, col); ftri(p01, p10, p11, col);
    }
  }
  const BARK = mix(SLATE, hex('#7b6a55'), .55);
  const PINE = mix(SLATE, TEAL, .5);

  function pine(x, z, s) {
    const y = hy(x, z), h = (.085 + rnd() * .06) * s, r = (.026 + rnd() * .008) * s, rot = rnd() * 6;
    cyl(x, y - .004, z, .0045 * s, h * .3, BARK);
    const tiers = 3 + (rnd() < .5 ? 1 : 0);
    for (let k = 0; k < tiers; k++) {
      const f = k / tiers;
      cone(x, y + h * (.16 + .62 * f), z, r * (1 - .62 * f), h * (.44 - .1 * f), mix(PINE, TEAL, f * .55 + rnd() * .08), 9, rot + k);
    }
  }
  function leafy(x, z, s) {
    const y = hy(x, z), h = (.045 + rnd() * .025) * s, r = (.022 + rnd() * .008) * s;
    cyl(x, y - .004, z, .0042 * s, h * .9, BARK);
    const base = [GREEN, mix(GREEN, LIME, .45), mix(TEAL, GREEN, .5)][Math.floor(rnd() * 3)];
    const n = 4 + Math.floor(rnd() * 3);
    blob([x, y + h + r * .5, z], r, base);
    for (let k = 0; k < n; k++) {
      const a = k / n * 6.2832 + rnd(), d = r * (.55 + rnd() * .25);
      blob([x + Math.cos(a) * d, y + h + r * (.1 + rnd() * .5), z + Math.sin(a) * d], r * (.55 + rnd() * .25), mix(base, k % 2 ? LIME : TEAL, .15 + rnd() * .1));
    }
  }
  function shrub(x, z) { const y = hy(x, z), r = .008 + rnd() * .008;
    blob([x, y + r * .5, z], r, mix(TEAL, GREEN, rnd()), { squash: .7 }); }
  function rock(x, z) { const y = hy(x, z), r = .01 + rnd() * .018;
    blob([x, y + r * .2, z], r, mix(SLATE, CREAM, .45 + rnd() * .2), { sub: 0, squash: .55 + rnd() * .2, wob: .3, vary: .1 }); }

  const spots = [];
  const ok = (x, z, minD) => spots.every(s => Math.hypot(s[0] - x, s[1] - z) > minD);
  function scatter(n, test, fn, minD, tries = 9000) {
    for (let k = 0, t = 0; k < n && t < tries; t++) {
      const x = rnd() * 1.84 - .92, z = rnd() * 1.84 - .92;
      if (Math.max(Math.abs(x), Math.abs(z)) > .9 || height(x, z) < WATER + .012 || !test(land(x, z), x, z) || !ok(x, z, minD)) continue;
      spots.push([x, z]); fn(x, z); k++;
    }
  }
  // groves: cluster trees around a few centres for a natural look
  const groves = Array.from({ length: 9 }, () => [rnd() * 1.4 - .7, rnd() * 1.4 - .7]);
  const nearGrove = (x, z) => groves.some(g => Math.hypot(g[0] - x, g[1] - z) < .26);
  scatter(110, (l, x, z) => l > .32 && l < .78 && (nearGrove(x, z) || rnd() < .25), (x, z) => pine(x, z, .85 + rnd() * .4), .034);
  scatter(70, (l, x, z) => l > .05 && l < .45 && (nearGrove(x, z) || rnd() < .3), (x, z) => leafy(x, z, .85 + rnd() * .35), .04);
  scatter(140, l => l > .03 && l < .6, shrub, .018);
  scatter(55, l => l > .55 || rnd() < .12, rock, .02);
  const NVERT = GP.length / 3;
  await tick();

  // ---------------------------------------------------------------- particles = area-weighted samples of the same surfaces
  const PP = [], PC = [], PN = [], PS = [];
  const L = norm([-.4, .85, .35]);
  const DENS = 9000;
  for (let t = 0; t < NVERT; t += 3) {
    if (t % 3000 === 0) await tick();
    const a = GP.slice(t * 3, t * 3 + 3), b = GP.slice(t * 3 + 3, t * 3 + 6), c = GP.slice(t * 3 + 6, t * 3 + 9);
    const area = Math.hypot(...cross(sub(b, a), sub(c, a))) / 2;
    let n = area * DENS * (t < TERRAIN_VERTS ? 1.15 : .75); n = Math.floor(n) + (rnd() < n % 1 ? 1 : 0);
    const nrm = GN.slice(t * 3, t * 3 + 3), col = GC.slice(t * 4, t * 4 + 3);
    const lit = .55 + .45 * Math.max(0, nrm[0] * L[0] + nrm[1] * L[1] + nrm[2] * L[2]) + .06 * nrm[1];
    for (let k = 0; k < n; k++) {
      let u = rnd(), v = rnd(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
      PP.push(a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * v, a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * v, a[2] + (b[2] - a[2]) * u + (c[2] - a[2]) * v);
      PC.push(...col.map(x => Math.min(1, x * lit)));
      PN.push(gauss(), gauss(), gauss()); PS.push(rnd());
    }
  }
  const NPTS = PS.length;

  // ---------------------------------------------------------------- GL plumbing
  function prog(vs, fs) {
    const p = gl.createProgram();
    for (const [t, s] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(sh);
      gl.attachShader(p, sh);
    }
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw gl.getProgramInfoLog(p);
    const u = {}, a = {};
    for (let i = 0; i < gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS); i++) { const n = gl.getActiveUniform(p, i).name; u[n] = gl.getUniformLocation(p, n); }
    for (let i = 0; i < gl.getProgramParameter(p, gl.ACTIVE_ATTRIBUTES); i++) { const n = gl.getActiveAttrib(p, i).name; a[n] = gl.getAttribLocation(p, n); }
    return { p, u, a };
  }
  const buf = (d, usage = gl.STATIC_DRAW) => { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, d, usage); return b; };
  let enabled = [];
  function use(pg, attrs) {
    gl.useProgram(pg.p);
    enabled.forEach(l => gl.disableVertexAttribArray(l)); enabled = [];
    for (const [name, b, size] of attrs) { const l = pg.a[name]; if (l === undefined) continue;
      gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, size, gl.FLOAT, false, 0, 0); enabled.push(l); }
  }

  // surface: lit, ink contour lines, soft rim; cut at the ε boundary
  const meshPg = prog(`
    attribute vec3 aPos; attribute vec3 aNor; attribute vec4 aCol;
    uniform mat4 uMVP;
    varying vec3 vP; varying vec3 vN; varying vec4 vCol;
    void main(){ vP = aPos; vN = aNor; vCol = aCol; gl_Position = uMVP * vec4(aPos, 1.); }`,
  `${DERIV ? '#extension GL_OES_standard_derivatives : enable' : ''}
    precision highp float;
    uniform vec3 uAgent; uniform vec3 uEye; uniform float uEps;
    varying vec3 vP; varying vec3 vN; varying vec4 vCol;
    void main(){
      float d = distance(vP.xz, uAgent.xz);
      float a = 1. - smoothstep(uEps - .02, uEps, d);
      if (a < .01) discard;
      vec3 N = normalize(vN), L = normalize(vec3(-.4, .85, .35)), V = normalize(uEye - vP);
      vec3 c = vCol.rgb * (.55 + .45 * max(dot(N, L), 0.)) + .06 * N.y;
      ${DERIV ? `
      float k = vP.y * 60.;
      float w = abs(fract(k - .5) - .5) / max(fwidth(k), 1e-4);
      c = mix(c, vec3(.08), (1. - smoothstep(0., 1.1, w)) * .2 * vCol.a);` : ''}
      c = mix(c, vec3(.08), pow(1. - max(dot(N, V), 0.), 4.) * .22);
      gl_FragColor = vec4(c, a);
    }`);
  const meshB = { pos: buf(new Float32Array(GP)), nor: buf(new Float32Array(GN)), col: buf(new Float32Array(GC)) };

  // particles: linear-schedule forward diffusion beyond ε
  const ptPg = prog(`
    attribute vec3 aPos; attribute vec3 aCol; attribute vec3 aNoise; attribute float aSeed;
    uniform mat4 uMVP; uniform vec3 uAgent; uniform float uEps, uSpan, uTime, uPx, uSize, uSigma, uFloor;
    uniform vec3 uBoxLo, uBoxHi;
    vec3 reflectInto(vec3 p, vec3 lo, vec3 hi){            // fold noise back inside the box walls
      vec3 L = hi - lo, q = mod(p - lo, 2. * L);
      return lo + (L - abs(q - L));
    }
    varying vec4 vCol; varying float vCross;
    void main(){
      float d = distance(aPos.xz, uAgent.xz);
      float t = clamp((d - uEps) / uSpan, 0., 1.);            // linear in distance
      float ab = 1. - t * t;                                   // noise level √(1−ᾱ) = t grows linearly with distance
      vec3 n = aNoise + .12 * vec3(sin(uTime*.45 + aSeed*41.), sin(uTime*.38 + aSeed*73.), cos(uTime*.41 + aSeed*19.));
      vec3 p;
      p.xz = aPos.xz + sqrt(1. - ab) * uSigma * n.xz;
      p.y  = uFloor + sqrt(ab) * (aPos.y - uFloor) + sqrt(1. - ab) * uSigma * .6 * n.y;
      p = reflectInto(p, uBoxLo, uBoxHi);
      gl_Position = uMVP * vec4(p, 1.);
      vCross = (aSeed < .006 && t > .2) ? 1. : 0.;
      vec3 haze = vec3(.80, .80, .77);
      vCol = vec4(mix(aCol, haze, t), mix(1., .5, t));
      if (vCross > .5) vCol = vec4(.08, .08, .08, .75);
      float sz = vCross > .5 ? 7. * uPx : min(uSize * uPx / gl_Position.w, 4.5 * uPx);
      gl_PointSize = d < uEps - .02 ? 0. : sz;
    }`, `
    precision mediump float; varying vec4 vCol; varying float vCross;
    void main(){
      vec2 c = gl_PointCoord - .5;
      if (vCross > .5) { if (min(abs(c.x), abs(c.y)) > .045) discard; gl_FragColor = vCol; return; }
      float r = dot(c, c); if (r > .25) discard;
      gl_FragColor = vec4(vCol.rgb, vCol.a * smoothstep(.25, .1, r));
    }`);
  const ptB = { pos: buf(new Float32Array(PP)), col: buf(new Float32Array(PC)), noise: buf(new Float32Array(PN)), seed: buf(new Float32Array(PS)) };

  // thin lines: rings, dreams
  const lnPg = prog(`
    attribute vec3 aPos; attribute float aA; uniform mat4 uMVP; varying float vA;
    void main(){ vA = aA; gl_Position = uMVP * vec4(aPos, 1.); gl_PointSize = 1.; }`, `
    precision mediump float; uniform vec3 uColor; varying float vA;
    void main(){ gl_FragColor = vec4(uColor, vA); }`);
  const LMAX = 6000, lnP = new Float32Array(LMAX * 3), lnA = new Float32Array(LMAX);
  const lnB = { pos: buf(lnP.byteLength, gl.DYNAMIC_DRAW), a: buf(lnA.byteLength, gl.DYNAMIC_DRAW) };
  function drawLines(mvp, verts, mode, color) {
    if (!verts.length) return;
    verts.forEach((v, i) => { lnP.set(v.slice(0, 3), i * 3); lnA[i] = v[3]; });
    use(lnPg, [['aPos', lnB.pos, 3], ['aA', lnB.a, 1]]);
    gl.bindBuffer(gl.ARRAY_BUFFER, lnB.pos); gl.bufferSubData(gl.ARRAY_BUFFER, 0, lnP.subarray(0, verts.length * 3));
    gl.bindBuffer(gl.ARRAY_BUFFER, lnB.a); gl.bufferSubData(gl.ARRAY_BUFFER, 0, lnA.subarray(0, verts.length));
    gl.uniformMatrix4fv(lnPg.u.uMVP, false, mvp); gl.uniform3fv(lnPg.u.uColor, color);
    gl.drawArrays(mode, 0, verts.length);
  }

  // ---------------------------------------------------------------- camera math
  function persp(fov, asp, n, f) { const t = 1 / Math.tan(fov / 2);
    return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (f + n) / (n - f), -1, 0, 0, 2 * f * n / (n - f), 0]; }
  function lookAt(e, c) {
    const z = norm(sub(e, c)), x = norm(cross([0, 1, 0], z)), y = cross(z, x), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    return [x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dot(x, e), -dot(y, e), -dot(z, e), 1];
  }
  function mul(a, b) { const o = new Array(16).fill(0);
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]; return o; }
  function project(m, p) {
    const x = m[0] * p[0] + m[4] * p[1] + m[8] * p[2] + m[12], y = m[1] * p[0] + m[5] * p[1] + m[9] * p[2] + m[13],
          w = m[3] * p[0] + m[7] * p[1] + m[11] * p[2] + m[15];
    return [(x / w + 1) / 2 * W, (1 - y / w) / 2 * H];
  }

  // ---------------------------------------------------------------- agent + dreams
  const pathAt = t => {
    const x = .5 * Math.sin(.21 * t) + .12 * Math.sin(.57 * t + 1), z = .45 * Math.sin(.29 * t + 1.2) + .1 * Math.cos(.43 * t);
    return [x, hy(x, z) + .03, z];
  };
  const DT = 1.8, DN = 7, DK = 48;
  let dreams = [], dreamIdx = -1, dreamSteps = 0;
  function makeDreams(t) {
    const a = pathAt(t), b = pathAt(t + .15), hd = Math.atan2(b[2] - a[2], b[0] - a[0]);
    dreams = [];
    for (let n = 0; n < DN; n++) {
      let th = hd + (n === 0 ? 0 : (rnd() - .5) * 2), x = a[0], z = a[2]; const bend = (rnd() - .5) * .1, pts = [];
      for (let k = 0; k < DK; k++) { th += bend + (rnd() - .5) * .07; x += Math.cos(th) * .0105; z += Math.sin(th) * .0105;
        pts.push([x, hy(x, z) + .012, z]); }
      dreams.push(pts);
    }
    dreamSteps += DN * DK;
  }

  // ---------------------------------------------------------------- interaction
  let az = .78, el = .6, dragging = false, lx = 0, ly = 0, idle = 0;
  const epsIn = root.querySelector('[data-eps]'), epsOut = root.querySelector('[data-eps-out]');
  let EPS = +epsIn.value;
  const onDown = e => { dragging = true; lx = e.clientX; ly = e.clientY; cv.setPointerCapture(e.pointerId); };
  const onMove = e => { if (!dragging) return;
    az -= (e.clientX - lx) * .005; el = Math.min(1.3, Math.max(.2, el + (e.clientY - ly) * .004)); lx = e.clientX; ly = e.clientY; idle = 0; requestDraw(); };
  const onUp = () => { dragging = false; };
  const onEps = () => { EPS = +epsIn.value; epsOut.textContent = EPS.toFixed(2); requestDraw(); };
  cv.addEventListener('pointerdown', onDown); cv.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onUp);
  epsIn.addEventListener('input', onEps);

  // ---------------------------------------------------------------- loop
  const box = root.querySelector('[data-agent-box]'), eq = root.querySelector('[data-eq]');
  const SPAN = 1.25, SIGMA = .26, BOX_LO = [-1, WATER - .14, -1], BOX_HI = [1, .46, 1];
  const inBox = (x, z) => Math.abs(x) <= 1 && Math.abs(z) <= 1;
  const boxEdges = [], grid = [];
  { const [a, b, c] = BOX_LO, [d, e, f] = BOX_HI, P = [[a,b,c],[d,b,c],[d,b,f],[a,b,f],[a,e,c],[d,e,c],[d,e,f],[a,e,f]];
    for (const [i, j] of [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]) boxEdges.push([...P[i], .55], [...P[j], .55]);
    for (let k = 1; k < 8; k++) { const v = -1 + k * .25;
      grid.push([v, b, c, .12], [v, b, f, .12], [a, b, v, .12], [d, b, v, .12]); } }
  let W = 0, H = 0, dpr = 1;
  function resize() { dpr = Math.min(2, devicePixelRatio || 1); W = cv.clientWidth; H = cv.clientHeight;
    cv.width = Math.max(1, W * dpr); cv.height = Math.max(1, H * dpr); gl.viewport(0, 0, cv.width, cv.height); requestDraw(); }

  gl.clearColor(...BG, 1);
  gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); gl.enable(gl.DEPTH_TEST);
  const start = performance.now(); let last = start, agentT = 0, epsNow = 0;

  function frame(now) {
    if (!W || !H) return;
    const dt = Math.min(.05, (now - last) / 1000); last = now;
    let time = (now - start) / 1000, intro = Math.min(1, time / 3.2);
    if (reduced) { time = 6; intro = 1; agentT = 4; epsNow = EPS; }     // still frame: no orbit, no agent motion, no intro
    else {
      if (!dragging) { idle += dt; if (idle > 1.5) az += dt * .045; }
      if (intro >= 1) agentT += dt;
      epsNow += (EPS * intro * intro * (3 - 2 * intro) - epsNow) * Math.min(1, dt * 6);
    }
    const agent = pathAt(agentT);
    if (Math.floor(agentT / DT) !== dreamIdx) { dreamIdx = Math.floor(agentT / DT); makeDreams(agentT); }
    const age = (agentT % DT) / DT;

    // near-isometric camera: narrow fov, far away
    const R = 7.7 / Math.min(1, W / H);               // keep the whole box in frame for any aspect
    const tgt = [agent[0] * .15, .02, agent[2] * .15];
    const eye = [tgt[0] + R * Math.cos(az) * Math.cos(el), tgt[1] + R * Math.sin(el), tgt[2] + R * Math.sin(az) * Math.cos(el)];
    const mvp = mul(persp(.42, W / H, .1, 30), lookAt(eye, tgt));
    const px = dpr * Math.max(620, Math.min(W, H)) / 900;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // 1 · rendered world inside ε
    use(meshPg, [['aPos', meshB.pos, 3], ['aNor', meshB.nor, 3], ['aCol', meshB.col, 4]]);
    gl.uniformMatrix4fv(meshPg.u.uMVP, false, mvp);
    gl.uniform3fv(meshPg.u.uAgent, agent); gl.uniform3fv(meshPg.u.uEye, eye); gl.uniform1f(meshPg.u.uEps, epsNow);
    gl.drawArrays(gl.TRIANGLES, 0, NVERT);

    // 2 · diffused particles beyond ε
    use(ptPg, [['aPos', ptB.pos, 3], ['aCol', ptB.col, 3], ['aNoise', ptB.noise, 3], ['aSeed', ptB.seed, 1]]);
    const U = ptPg.u;
    gl.uniformMatrix4fv(U.uMVP, false, mvp); gl.uniform3fv(U.uAgent, agent);
    gl.uniform1f(U.uEps, epsNow); gl.uniform1f(U.uSpan, SPAN); gl.uniform1f(U.uTime, time); gl.uniform1f(U.uPx, px);
    gl.uniform1f(U.uSize, 24); gl.uniform1f(U.uSigma, SIGMA); gl.uniform1f(U.uFloor, WATER);
    gl.uniform3fv(U.uBoxLo, BOX_LO); gl.uniform3fv(U.uBoxHi, BOX_HI);
    gl.drawArrays(gl.POINTS, 0, NPTS);

    // 3 · ink: ε ring (solid, on terrain), ε+Δ ring (dashed, on the water plane), dreams
    const ring = [], outer = [], RS = 160;
    for (let k = 0; k <= RS; k++) {
      const a = k / RS * 6.2832, x = agent[0] + Math.cos(a) * epsNow, z = agent[2] + Math.sin(a) * epsNow;
      ring.push([Math.max(-1, Math.min(1, x)), hy(x, z) + .004, Math.max(-1, Math.min(1, z)), inBox(x, z) ? .9 : 0]);
    }
    for (let k = 0; k < RS; k++) {
      if (k % 2) continue;
      for (const kk of [k, k + 1]) { const a = kk / RS * 6.2832, r = epsNow + SPAN;
        outer.push([agent[0] + Math.cos(a) * r, WATER, agent[2] + Math.sin(a) * r, inBox(agent[0] + Math.cos(a) * r, agent[2] + Math.sin(a) * r) ? .45 : 0]); }
    }
    gl.depthMask(false);
    drawLines(mvp, ring, gl.LINE_STRIP, INK);
    gl.disable(gl.DEPTH_TEST); drawLines(mvp, outer, gl.LINES, INK); drawLines(mvp, grid, gl.LINES, INK); drawLines(mvp, boxEdges, gl.LINES, INK); gl.enable(gl.DEPTH_TEST);
    if (intro >= 1) {
      const reveal = Math.min(DK, Math.floor(age * 2.6 * DK)), fade = Math.min(1, (1 - age) * 2.5);
      dreams.forEach((pts, i) => {
        if (reveal < 2) return;
        const v = pts.slice(0, reveal).map((p, k) => [...p, fade * (i === 0 ? 1 : .55) * (1 - k / DK * .7)]);
        drawLines(mvp, v, gl.LINE_STRIP, i === 0 ? SLATE : TEAL);
      });
    }
    gl.depthMask(true);

    // 4 · overlay: agent marker + equation under the box's lowest projected corner
    const [ax, ay] = project(mvp, agent);
    box.setAttribute('x', ax - 6); box.setAttribute('y', ay - 6);
    let low = [0, -1e9];
    for (const x of [BOX_LO[0], BOX_HI[0]]) for (const y of [BOX_LO[1], BOX_HI[1]]) for (const z of [BOX_LO[2], BOX_HI[2]]) {
      const q = project(mvp, [x, y, z]); if (q[1] > low[1]) low = q; }
    eq.style.left = Math.max(170, Math.min(W - 170, low[0])) + 'px';
    eq.style.top = Math.min(H - 82, low[1] + 18) + 'px';
    if (!root.classList.contains('is-live')) root.classList.add('is-live');   // hides the static poster after the first real frame
  }

  // ---------------------------------------------------------------- scheduling + lifecycle
  let raf = 0, drawQueued = false, disposed = false, onScreen = true, tabShown = !document.hidden;
  const running = () => !disposed && onScreen && tabShown && !reduced;
  function loop(now) { raf = 0; if (!running()) return; frame(now); raf = requestAnimationFrame(loop); }
  function kick() { if (!raf && running()) { last = performance.now(); raf = requestAnimationFrame(loop); } }
  function requestDraw() {                         // on-demand redraw (reduced-motion still frame)
    if (!reduced || drawQueued || disposed || !onScreen) return;
    drawQueued = true; requestAnimationFrame(t => { drawQueued = false; if (!disposed) frame(t); });
  }
  const onVis = () => { tabShown = !document.hidden; kick(); };
  const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; kick(); requestDraw(); });
  const onLost = e => { e.preventDefault(); root.classList.remove('is-live'); onScreen = false; };
  document.addEventListener('visibilitychange', onVis);
  cv.addEventListener('webglcontextlost', onLost);
  window.addEventListener('resize', resize);
  io.observe(root);
  resize(); kick(); requestDraw();

  return function dispose() {
    disposed = true;
    cancelAnimationFrame(raf); raf = 0;
    io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onUp);
    cv.removeEventListener('pointerdown', onDown); cv.removeEventListener('pointermove', onMove);
    cv.removeEventListener('webglcontextlost', onLost);
    epsIn.removeEventListener('input', onEps);
    [meshB.pos, meshB.nor, meshB.col, ptB.pos, ptB.col, ptB.noise, ptB.seed, lnB.pos, lnB.a].forEach(b => gl.deleteBuffer(b));
    [meshPg, ptPg, lnPg].forEach(p => gl.deleteProgram(p.p));
    const lose = gl.getExtension('WEBGL_lose_context'); if (lose) lose.loseContext();
    root.classList.remove('is-live');
  };
}
