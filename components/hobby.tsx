import React from 'react';

interface HobbyCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const HobbyCard: React.FC<HobbyCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-md border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition p-4 font-[Inter]">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-xl font-semibold mb-2 font-[Inter]">{title}</h3>
      <p className="text-gray-600 text-sm font-[Inter]">{description}</p>
    </div>
  );
};

export default HobbyCard;
