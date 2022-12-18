/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

interface Props {
  src: string;
  title: string;
  publishedAt: string;
}

const Card: React.FC<Props> = ({ src, title, publishedAt }) => {
  return (
    <div className="group relative cursor-pointer">
      <img className="rounded" src={src} alt="image" />
      <style jsx>{`
        .overlay {
          background: linear-gradient(0deg, black, transparent);
        }
      `}</style>
      <div className="overlay absolute bottom-[-20px] hidden h-24 w-full px-4 pt-6 opacity-0 transition-all group-hover:bottom-0 group-hover:opacity-100">
        <div className="text-lg text-white">{title}</div>
        <div className="text-sm text-gray-400">
          {new Date(publishedAt).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Card;
