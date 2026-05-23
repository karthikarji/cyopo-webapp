import React from "react";

const BCTQuote: React.FC<{ bio: string }> = ({ bio }) => {
  const firstSentence = bio.split(/(?<=[.!?])\s+/)[0] ?? bio;

  return (
    <section id='about' className='bg-[#0f0f0f] py-24 px-6'>
      <div className='max-w-5xl mx-auto'>
        <div className='flex gap-8'>
          {/* Left border — uses var(--tp) */}
          <div className='w-1 flex-shrink-0 rounded' style={{ background: "var(--tp)" }} />
          <blockquote className='font-black uppercase italic leading-tight text-white' style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>
            "{firstSentence}"
          </blockquote>
        </div>
        {bio.length > firstSentence.length && (
          <p className='mt-10 text-white/40 leading-relaxed max-w-2xl text-sm'>{bio.slice(firstSentence.length).trim()}</p>
        )}
      </div>
    </section>
  );
};

export default BCTQuote;
