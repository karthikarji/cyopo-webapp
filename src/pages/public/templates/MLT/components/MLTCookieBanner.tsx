import React from "react";

interface Props {
  hasResponded: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const MLTCookieBanner: React.FC<Props> = ({ hasResponded, onAccept, onDecline }) => {
  if (hasResponded) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 p-4'>
      <div className='max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-5 flex flex-col sm:flex-row sm:items-center gap-4'>
        <p className='text-sm text-gray-600 flex-1'>
          We use analytics to help portfolio owners understand how their work is being discovered. No personal data is sold or shared.
        </p>
        <div className='flex items-center gap-2 flex-shrink-0'>
          <button onClick={onDecline} className='px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors'>
            Decline
          </button>
          {/* Accept button uses var(--tp) */}
          <button
            onClick={onAccept}
            style={{ background: "var(--tp)" }}
            className='px-4 py-2 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity'>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default MLTCookieBanner;
