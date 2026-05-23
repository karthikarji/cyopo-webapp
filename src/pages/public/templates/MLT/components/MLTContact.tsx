import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

interface Props {
  portfolio: Portfolio;
}

const MLTContact: React.FC<Props> = ({ portfolio }) => {
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
        setError(data.error ?? "Failed to send message. Please try again.");
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

  const inputCls =
    "px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition-all";

  return (
    <section id='contact' className='py-24 bg-white'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-start'>
          {/* Left */}
          <div>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
              Let's Create
              <br />
              Together
            </h2>
            <p className='text-gray-400 mb-10 leading-relaxed'>
              I'm currently open to new collaborations, freelance opportunities, or technical consulting engagements.
            </p>

            <div className='flex flex-col gap-4'>
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className='flex items-center gap-4 text-sm text-gray-600 hover:text-gray-900 transition-colors group'>
                  <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors flex-shrink-0'>
                    <Mail size={15} className='text-gray-500' />
                  </div>
                  {profile.email}
                </a>
              )}
              {profile?.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className='flex items-center gap-4 text-sm text-gray-600 hover:text-gray-900 transition-colors group'>
                  <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors flex-shrink-0'>
                    <Phone size={15} className='text-gray-500' />
                  </div>
                  {profile.phone}
                </a>
              )}
              {profile?.location && (
                <div className='flex items-center gap-4 text-sm text-gray-600'>
                  <div className='w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0'>
                    <MapPin size={15} className='text-gray-500' />
                  </div>
                  Based in {profile.location}
                </div>
              )}
            </div>
          </div>

          {/* Right — form */}
          <div className='bg-gray-50 rounded-2xl p-8 border border-gray-100'>
            {sent ? (
              <div className='flex flex-col items-center justify-center gap-3 py-12 text-center'>
                <div className='w-12 h-12 rounded-full bg-green-100 flex items-center justify-center'>
                  <span className='material-symbols-outlined text-green-600'>check_circle</span>
                </div>
                <h3 className='font-semibold text-gray-900'>Message sent!</h3>
                <p className='text-sm text-gray-500'>I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {[
                  { label: "Full Name", field: "name", type: "text", placeholder: "Your Name" },
                  { label: "Email Address", field: "email", type: "email", placeholder: "email@example.com" },
                  { label: "Subject", field: "subject", type: "text", placeholder: "What's this about?" },
                ].map(({ label, field, type, placeholder }) => (
                  <div key={field} className='flex flex-col gap-1.5'>
                    <label className='text-xs font-medium text-gray-500 uppercase tracking-wide'>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      required
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className={inputCls}
                    />
                  </div>
                ))}

                <div className='flex flex-col gap-1.5'>
                  <label className='text-xs font-medium text-gray-500 uppercase tracking-wide'>Message</label>
                  <textarea
                    placeholder='How can I help you?'
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={[inputCls, "resize-none"].join(" ")}
                  />
                </div>

                {error && (
                  <div className='flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl'>
                    <span className='material-symbols-outlined text-red-500 text-[16px] flex-shrink-0 mt-0.5'>error</span>
                    <p className='text-sm text-red-700'>{error}</p>
                  </div>
                )}

                {/* Submit — uses --tp */}
                <button
                  type='submit'
                  disabled={sending}
                  style={{ background: "var(--tp)" }}
                  className='flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 mt-2'>
                  {sending ? (
                    <span className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  ) : (
                    <>
                      <Send size={13} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLTContact;
