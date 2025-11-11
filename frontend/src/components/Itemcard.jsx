import React from 'react';
import { useNavigate } from 'react-router-dom';

const Itemcard = ({ Item }) => {
  const { title, description, category, type, image, _id } = Item;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/item/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer bg-white border border-gray-200"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover border-b border-gray-200"
        />
      )}
      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">
            {category}
          </span>
          {type && (
            <span className="inline-block bg-gray-300 text-gray-900 px-2 py-1 rounded-full text-xs">
              {type}
            </span>
          )}
        </div>
        <h5 className="text-gray-900 font-semibold text-lg truncate">{title}</h5>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default Itemcard;
