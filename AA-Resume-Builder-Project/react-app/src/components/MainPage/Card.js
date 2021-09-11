import React from 'react';
import CardContainer from './CardContainer';

const Card = ({ title, tags, button }) => {
  // if (!tags) {
  //   tags = ['demo_tag'];
  // }
  if (button) {
    return (
      <div className="inline-block px-3">
        <div className="bg-accentLight w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="mt-24 px-6 py-3">
            <div className="font-bold text-xl mb-2 text-white">{title}</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="inline-block px-3">
      <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="px-6 py-3 bg-accentLight">
          <div className="font-bold text-xl mb-2 text-white">{title}</div>
        </div>
        <div className="px-3 py-1">
          {tags &&
            tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2"
              >
                #{tag}
              </span>
            ))}
          {!tags && (
            <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
              Click here!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
