import React from "react";

const PricingSkeleton: React.FC = () => (
  <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto'>
    {[1, 2, 3].map((i) => (
      <div key={i} className='bg-surface border border-outline-variant/20 rounded-2xl p-6 sm:p-8 animate-pulse'>
        <div className='h-6 bg-surface-container rounded-lg w-24 mb-2' />
        <div className='h-4 bg-surface-container rounded-lg w-40 mb-6' />
        <div className='h-12 bg-surface-container rounded-lg w-32 mb-8' />
        {[1, 2, 3, 4, 5].map((j) => (
          <div key={j} className='h-4 bg-surface-container rounded-lg mb-3' />
        ))}
        <div className='h-12 bg-surface-container rounded-xl mt-8' />
      </div>
    ))}
  </div>
);

export default PricingSkeleton;
