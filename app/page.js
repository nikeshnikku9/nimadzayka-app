"'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import {
  MessageCircle, Instagram, Globe, BookOpen, Phone, MapPin,
} from 'lucide-react';
import { brandInfo } from '@/lib/seed-data';

export default function Home() {
  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'qr_scan', path: '/' }),
    }).catch(() => {});
  }, []);

  const track = (event) => {
    // Fire-and-forget tracking using sendBeacon (works while navigating away)
    try {
      const data = JSON.stringify({ event, path: '/' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/track', new Blob([data], { type: 'application/json' }));
      } else {
        fetch('/api/analytics/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data, keepalive: true });
      }
    } catch {}
  };

  const whatsappUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent('Hello Nimad ZAYKA! I would like to know more about your spices.')}`;
  const websiteUrl = `https://${brandInfo.website}`;

  const buttons = [
    {
      label: 'Order on WhatsApp',
      sub: '+91 6265996333',
      icon: MessageCircle,
      bg: 'bg-gradient-to-br from-green-500 to-green-700',
      href: whatsappUrl,
      event: 'whatsapp_click',
      external: true,
    },
    {
      label: 'Follow on Instagram',
      sub: '@nimadzayka.in',
      icon: Instagram,
      bg: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500',
      href: brandInfo.instagram,
      event: 'instagram_click',
      external: true,
    },
    {
      label: 'Visit Our Website',
      sub: 'nimadzayka.com',
      icon: Globe,
      bg: 'bg-gradient-to-br from-amber-500 to-yellow-700',
      href: websiteUrl,
      event: 'website_click',
      external: true,
    },
    {
      label: 'View Brochure',
      sub: 'All products & catalogue',
      icon: BookOpen,
      bg: 'bg-gradient-to-br from-red-700 to-red-950',
      href: '/brochure',
      event: 'brochure_click',
      external: false,
    },
  ];

  return (
    <main className=\"min-h-screen brand-gradient relative overflow-hidden\">
      {/* Background layers — all pointer-events-none so they never block clicks */}
      <div className=\"absolute inset-0 spice-pattern opacity-60 pointer-events-none\" />
      <div
        className=\"absolute inset-0 opacity-20 pointer-events-none\"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1716816211590-c15a328a5ff0)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className=\"absolute inset-0 bg-gradient-to-b from-red-950/40 via-transparent to-black/70 pointer-events-none\" />

      <div className=\"relative z-10 min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto\">
        {/* TOP / LOGO */}
        <div className=\"flex-shrink-0 pt-8 flex flex-col items-center\">
          <div className=\"float\">
            <Logo size=\"xl\" />
          </div>
          <div className=\"divider-ornament mt-6 w-72\">
            <span className=\"text-yellow-300 text-[10px] tracking-[0.4em] font-semibold\">PREMIUM INDIAN SPICES</span>
          </div>
          <h1 className=\"mt-5 text-2xl sm:text-3xl font-serif-display italic gold-text text-center px-4 leading-tight\">
            Swaad jo Nimad se aayo
          </h1>
        </div>

        {/* BUTTONS — all anchor tags for guaranteed reliability */}
        <div className=\"w-full space-y-3 mt-8 relative z-20\">
          {buttons.map(({ label, sub, icon: Icon, bg, href, event, external }) => {
            const inner = (
              <div className={`${bg} rounded-2xl p-4 flex items-center gap-4 shadow-2xl border border-yellow-400/20 active:scale-95 transition-transform`}>
                <div className=\"w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center shrink-0\">
                  <Icon className=\"w-6 h-6 text-white\" />
                </div>
                <div className=\"flex-1 text-left\">
                  <div className=\"text-white font-semibold text-base leading-tight\">{label}</div>
                  <div className=\"text-white/80 text-xs mt-0.5\">{sub}</div>
                </div>
                <div className=\"text-white/70 text-xl\">›</div>
              </div>
            );

            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  target=\"_blank\"
                  rel=\"noopener noreferrer\"
                  onClick={() => track(event)}
                  className=\"block cursor-pointer\"
                >
                  {inner}
                </a>
              );
            }
            return (
              <Link
                key={label}
                href={href}
                onClick={() => track(event)}
                className=\"block cursor-pointer\"
              >
                {inner}
              </Link>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className=\"flex-shrink-0 pb-6 pt-8 text-center w-full\">
          <div className=\"divider-ornament w-full mb-3\">
            <span className=\"text-yellow-400/80 text-[10px] tracking-[0.3em]\">FSSAI: {brandInfo.fssai}</span>
          </div>
          <div className=\"flex items-center justify-center gap-3 text-xs text-yellow-100/70 mb-2\">
            <a href={`tel:${brandInfo.phone}`} className=\"flex items-center gap-1 hover:text-yellow-300\">
              <Phone className=\"w-3 h-3\" /> {brandInfo.phone}
            </a>
          </div>
          <div className=\"text-[10px] text-yellow-100/50 flex items-start justify-center gap-1 px-2\">
            <MapPin className=\"w-3 h-3 mt-0.5 shrink-0\" />
            <span>Julwaniya Road, Rajpur, Barwani, MP - 451447</span>
          </div>
          <div className=\"text-[10px] text-yellow-100/40 mt-3\">
            © {new Date().getFullYear()} Nimad ZAYKA Spices ·
            <Link href=\"/admin\" className=\"ml-1 hover:text-yellow-300\">Admin</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
"
