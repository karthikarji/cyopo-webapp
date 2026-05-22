import React from "react";

interface Props {
  hasResponded: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const BCTCookieBanner: React.FC<Props> = ({ hasResponded, onAccept, onDecline }) => {
  if (hasResponded) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4'>
      <div className='max-w-2xl mx-auto bg-[#111111] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4'>
        <p className='text-sm text-white/50 flex-1'>
          We use analytics to help portfolio owners understand how their work is being discovered. No personal data is sold or shared.
        </p>
        <div className='flex items-center gap-2 flex-shrink-0'>
          <button onClick={onDecline} className='px-4 py-2 text-sm text-white/30 hover:text-white/60 transition-colors'>
            Decline
          </button>
          <button
            onClick={onAccept}
            className='px-4 py-2 bg-[#e63329] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#c02820] transition-colors'>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default BCTCookieBanner;
