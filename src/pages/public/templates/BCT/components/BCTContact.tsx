import React, { useState } from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

interface Props {
  portfolio: Portfolio;
}

const BCTContact: React.FC<Props> = ({ portfolio }) => {
  const { profile } = portfolio;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? "http://localhost:8080"}/api/v1/public/portfolios/${portfolio.slug}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) {
        setError(data.error ?? "Failed to send. Please try again.");
        return;
      }
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 4000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputCls = [
    "w-full bg-transparent border-b border-white/10 py-4 text-white text-sm",
    "placeholder:text-white/20 focus:outline-none focus:border-[#e63329]",
    "transition-colors duration-200",
  ].join(" ");

  return (
    <section id='contact' className='bg-[#0a0a0a] py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <h2 className='font-black uppercase text-white leading-none mb-4' style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
          Let's Work
        </h2>

        {profile?.email && (
          <a href={`mailto:${profile.email}`} className='text-white/30 text-sm hover:text-[#e63329] transition-colors tracking-widest'>
            {profile.email}
          </a>
        )}

        {/* Contact form */}
        <div className='mt-16 max-w-2xl'>
          {sent ? (
            <div className='flex items-center gap-4 py-8'>
              <div className='w-2 h-2 rounded-full bg-[#e63329]' />
              <p className='text-white font-bold uppercase tracking-widest text-sm'>Message received. I'll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-0'>
              <input
                type='text'
                placeholder='Your Name'
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={inputCls}
              />
              <input
                type='email'
                placeholder='Email Address'
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={inputCls}
              />
              <input
                type='text'
                placeholder='Subject'
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className={inputCls}
              />
              <textarea
                placeholder='Your Message'
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={[inputCls, "resize-none"].join(" ")}
              />

              {error && <p className='text-[#e63329] text-xs mt-4 tracking-widest'>{error}</p>}

              <button
                type='submit'
                disabled={sending}
                className='mt-8 self-start px-8 py-4 bg-[#e63329] text-white text-xs font-bold tracking-[0.3em] uppercase hover:bg-[#c02820] transition-colors disabled:opacity-50'>
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BCTContact;
