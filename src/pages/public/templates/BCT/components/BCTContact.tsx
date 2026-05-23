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

  // Input border-bottom uses var(--tp) on focus via onFocus/onBlur
  const inputBaseCls =
    "w-full bg-transparent border-b border-white/10 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none transition-colors duration-200";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--tp)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "";
  };

  return (
    <section id='contact' className='bg-[#0a0a0a] py-24 px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Heading */}
        <h2 className='font-black uppercase text-white leading-none mb-4' style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
          Let's Work
        </h2>

        {/* Email — hover uses var(--tp) */}
        {profile?.email && (
          <a
            href={`mailto:${profile.email}`}
            className='text-white/30 text-sm tracking-widest transition-colors duration-200'
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--tp)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
            {profile.email}
          </a>
        )}

        {/* Form */}
        <div className='mt-16 max-w-2xl'>
          {sent ? (
            <div className='flex items-center gap-4 py-8'>
              {/* Success dot uses var(--tp) */}
              <div className='w-2 h-2 rounded-full' style={{ background: "var(--tp)" }} />
              <p className='text-white font-bold uppercase tracking-widest text-sm'>Message received. I'll be in touch.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex flex-col gap-0'>
              {[
                { field: "name", type: "text", placeholder: "Your Name" },
                { field: "email", type: "email", placeholder: "Email Address" },
                { field: "subject", type: "text", placeholder: "Subject" },
              ].map(({ field, type, placeholder }) => (
                <input
                  key={field}
                  type={type}
                  placeholder={placeholder}
                  required
                  value={form[field as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={inputBaseCls}
                />
              ))}

              <textarea
                placeholder='Your Message'
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={[inputBaseCls, "resize-none"].join(" ")}
              />

              {/* Error — uses var(--tp) */}
              {error && (
                <p style={{ color: "var(--tp)" }} className='text-xs mt-4 tracking-widest'>
                  {error}
                </p>
              )}

              {/* Submit button — uses var(--tp) */}
              <button
                type='submit'
                disabled={sending}
                style={{ background: "var(--tp)" }}
                className='mt-8 self-start px-8 py-4 text-white text-xs font-bold tracking-[0.3em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50'>
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
