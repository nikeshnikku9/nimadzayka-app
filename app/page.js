'use client';

import {
  MessageCircle,
  Instagram,
  Globe,
  Phone,
  MapPin,
  BookOpen,
} from 'lucide-react';

export default function Home() {
  const buttons = [
    {
      title: 'Order on WhatsApp',
      sub: '+91 6265996333',
      icon: MessageCircle,
      link: 'https://wa.me/916265996333',
      bg: 'from-green-500 to-green-700',
    },
    {
      title: 'Follow on Instagram',
      sub: '@nimadzayka.in',
      icon: Instagram,
      link: 'https://instagram.com/nimadzayka.in',
      bg: 'from-pink-500 via-red-500 to-yellow-500',
    },
    {
      title: 'Visit Our Website',
      sub: 'www.nimadzayka.com',
      icon: Globe,
      link: 'https://www.nimadzayka.com',
      bg: 'from-yellow-500 to-orange-700',
    },
    {
      title: 'Call Us',
      sub: '+91 6265996333',
      icon: Phone,
      link: 'tel:6265996333',
      bg: 'from-red-500 to-red-800',
    },
    {
      title: 'Our Address',
      sub: 'Nimad ZAYKA, India',
      icon: MapPin,
      link: 'https://maps.app.goo.gl/2s3ikrK5QHkxCa6L8',
      bg: 'from-orange-600 to-amber-900',
    },
    {
      title: 'View Brochure',
      sub: 'All products & catalogue',
      icon: BookOpen,
      link: '#',
      bg: 'from-red-700 to-red-950',
    },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden text-white">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.82)), url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-md mx-auto px-5 py-8">

        {/* LOGO */}
        <div className="flex justify-center">
          <img
            src="https://i.imgur.com/FqGgJcZ.png"
            alt="Nimad Zayka"
            className="w-64 drop-shadow-2xl"
          />
        </div>

        {/* TAGLINE */}
        <div className="text-center mt-5">
          <div className="h-[2px] w-44 bg-yellow-500 mx-auto mb-4" />

          <p className="text-yellow-400 tracking-[3px] text-sm font-semibold">
            PREMIUM INDIAN SPICES
          </p>

          <div className="h-[2px] w-44 bg-yellow-500 mx-auto mt-4" />

          <h2 className="mt-6 text-2xl italic text-yellow-100 font-semibold">
            Swaad jo Nimad se aayo
          </h2>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 space-y-4">
          {buttons.map((btn, index) => {
            const Icon = btn.icon;

            return (
              <a
                key={index}
                href={btn.link}
                target="_blank"
                className={`bg-gradient-to-r ${btn.bg} rounded-2xl p-4 flex items-center gap-4 shadow-2xl border border-yellow-400/20 hover:scale-[1.02] transition`}
              >
                <div className="w-14 h-14 rounded-full border border-white/40 bg-white/10 flex items-center justify-center shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-xl leading-tight">
                    {btn.title}
                  </h3>

                  <p className="text-white/80 text-sm mt-1">
                    {btn.sub}
                  </p>
                </div>

                <div className="text-3xl text-white/70">
                  ›
                </div>
              </a>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-10 pt-6 border-t border-yellow-500/30">

          <div className="flex justify-between text-center gap-2">

            <div className="flex-1">
              <h3 className="text-yellow-400 text-xl font-bold">
                FSSAI
              </h3>

              <p className="text-xs text-yellow-100 mt-2">
                21425190000195
              </p>
            </div>

            <div className="flex-1 border-l border-r border-yellow-500/20">
              <h3 className="text-yellow-400 text-2xl font-bold">
                100%
              </h3>

              <p className="text-xs text-yellow-100 mt-2">
                NATURAL
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs text-yellow-100 leading-5">
                Packed with Purity,
                Delivered with Trust.
              </p>
            </div>

          </div>

          <div className="text-center mt-6">
            <a
              href="/admin"
              className="text-yellow-300 text-sm underline"
            >
              Admin Panel
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
