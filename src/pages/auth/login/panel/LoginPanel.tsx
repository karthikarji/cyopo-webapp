import React from "react";
import { LOGIN_PANEL_HEADLINE, LOGIN_PANEL_SUB, LOGIN_PANEL_TESTIMONIALS } from "../Login.constants";

const LoginPanel: React.FC = () => {
  return (
    <div
      className='hidden lg:flex flex-col justify-between h-full p-12 relative overflow-hidden min-h-screen'
      style={{
        background: "linear-gradient(135deg, #2d1f4e 0%, #4f378a 50%, #6750a4 100%)",
      }}>
      {/* Floating orbs — purely decorative */}
      <div
        className='absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none'
        style={{ background: "rgba(207,188,255,0.15)" }}
      />
      <div
        className='absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl pointer-events-none'
        style={{ background: "rgba(233,221,255,0.10)" }}
      />

      {/* Logo */}
      <div className='relative z-10 flex items-center gap-2 font-headline font-bold text-xl text-white'>
        <span className='material-symbols-outlined text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        cyopo
      </div>

      {/* Headline */}
      <div className='relative z-10'>
        <h2 className='font-headline font-bold text-white text-3xl xl:text-4xl leading-tight mb-4 whitespace-pre-line'>{LOGIN_PANEL_HEADLINE}</h2>
        <p className='text-white/70 text-sm leading-relaxed max-w-xs'>{LOGIN_PANEL_SUB}</p>
      </div>

      {/* Testimonials */}
      <div className='relative z-10 flex flex-col gap-4'>
        {LOGIN_PANEL_TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.author} className='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4'>
            <p className='text-white/90 text-sm leading-relaxed mb-2'>"{testimonial.quote}"</p>
            <p className='text-white/50 text-xs font-medium'>— {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginPanel;
