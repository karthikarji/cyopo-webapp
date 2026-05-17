import React from "react";

interface Props {
  bio: string;
}

// Split bio into up to 3 paragraphs for the card layout
const splitBioToSections = (bio: string) => {
  const sentences = bio.split(/(?<=[.!?])\s+/);
  const third = Math.ceil(sentences.length / 3);
  return [
    { icon: "person", title: "Who I Am", text: sentences.slice(0, third).join(" ") },
    { icon: "lightbulb", title: "What I Do", text: sentences.slice(third, third * 2).join(" ") },
    { icon: "construction", title: "What I Build", text: sentences.slice(third * 2).join(" ") },
  ].filter((s) => s.text.trim().length > 0);
};

const MLTAbout: React.FC<Props> = ({ bio }) => {
  const sections = splitBioToSections(bio);

  return (
    <section id='about' className='py-24 bg-white'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>The Philosophy</h2>
          <p className='text-gray-400 max-w-lg mx-auto'>A little about who I am and how I think.</p>
        </div>

        <div
          className={`grid gap-8 ${sections.length === 1 ? "grid-cols-1 max-w-2xl mx-auto" : sections.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
          {sections.map((section, i) => (
            <div
              key={i}
              className='flex flex-col gap-4 p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200'>
              <div className='w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center'>
                <span className='material-symbols-outlined text-gray-600 text-[20px]'>{section.icon}</span>
              </div>
              <h3 className='font-semibold text-gray-900'>{section.title}</h3>
              <p className='text-sm text-gray-500 leading-relaxed'>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MLTAbout;
