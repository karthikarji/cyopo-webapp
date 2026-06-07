import React from "react";

const CheckoutSkeleton: React.FC = () => (
  <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 max-w-4xl mx-auto animate-pulse'>
    <div className='flex flex-col gap-4'>
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
        <div className='h-4 w-24 bg-surface-container rounded mb-3' />
        <div className='h-7 w-40 bg-surface-container rounded mb-2' />
        <div className='h-4 w-32 bg-surface-container rounded mb-6' />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='h-4 bg-surface-container rounded mb-3' />
        ))}
        <div className='h-px bg-surface-container my-4' />
        {[1, 2, 3].map((i) => (
          <div key={i} className='flex justify-between mb-2'>
            <div className='h-4 w-32 bg-surface-container rounded' />
            <div className='h-4 w-16 bg-surface-container rounded' />
          </div>
        ))}
      </div>
    </div>
    <div className='flex flex-col gap-4'>
      <div className='bg-surface border border-outline-variant/20 rounded-2xl p-6'>
        <div className='h-4 w-24 bg-surface-container rounded mb-4' />
        <div className='h-10 bg-surface-container rounded-xl mb-4' />
        <div className='h-12 bg-surface-container rounded-xl mt-6' />
      </div>
    </div>
  </div>
);

export default CheckoutSkeleton;
