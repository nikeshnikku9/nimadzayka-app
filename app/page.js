'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage:
          "linear-gradient(rgba(90,0,0,0.82), rgba(90,0,0,0.88)), url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: 'Arial',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(10px)',
          borderRadius: '28px',
          padding: '35px 25px',
          textAlign: 'center',
          boxShadow: '0 10px 35px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        {/* LOGO */}
        <img
          src="https://i.imgur.com/FqGgJcZ.png"
          alt="Nimad Zayka"
          style={{
            width: '220px',
            marginBottom: '20px',
          }}
        />

        {/* TAGLINE */}
        <p
          style={{
            color: '#fff',
            fontSize: '18px',
            marginBottom: '30px',
            fontWeight: '500',
            letterSpacing: '1px',
          }}
        >
          Swaad Jo Nimad Se Aayo
        </p>

        {/* WEBSITE BUTTON */}
        <a
          href="https://www.nimadzayka.com"
          target="_blank"
          style={buttonStyle('#f5b301', '#000')}
        >
          🌐 Visit Website
        </a>

        {/* WHATSAPP */}
        <a
          href="https://wa.me/916265996333"
          target="_blank"
          style={buttonStyle('#25D366', '#fff')}
        >
          💬 Order on WhatsApp
        </a>

        {/* CALL */}
        <a
          href="tel:6265996333"
          style={buttonStyle('#0d6efd', '#fff')}
        >
          📞 Call Us - 6265996333
        </a>

        {/* ADDRESS */}
        <a
          href="https://maps.app.goo.gl/2s3ikrK5QHkxCa6L8"
          target="_blank"
          style={buttonStyle('#dc3545', '#fff')}
        >
          📍 Store Address
        </a>

        {/* ADMIN */}
        <a
          href="/admin"
          style={buttonStyle('#ffffff', '#000')}
        >
          ⚙️ Admin Panel
        </a>
      </div>
    </main>
  );
}

function buttonStyle(bg, color) {
  return {
    display: 'block',
    width: '100%',
    background: bg,
    color: color,
    padding: '16px',
    marginBottom: '15px',
    borderRadius: '14px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '17px',
    transition: '0.3s',
    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
  };
}
