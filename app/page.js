'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: '#7a0000',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center'
    }}>
      
      <h1 style={{
        fontSize: '60px',
        fontWeight: 'bold',
        lineHeight: '70px'
      }}>
        NIMAD<br />ZAYKA
      </h1>

      <p style={{
        marginTop: '10px',
        fontSize: '20px'
      }}>
        Premium Indian Spices
      </p>

      <div style={{
        marginTop: '40px',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>

        <a
          href="https://wa.me/916265996333"
          target="_blank"
          style={{
            background: '#25D366',
            padding: '18px',
            borderRadius: '14px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Order on WhatsApp
        </a>

        <a
          href="https://instagram.com/nimadzayka.in"
          target="_blank"
          style={{
            background: '#E1306C',
            padding: '18px',
            borderRadius: '14px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Follow on Instagram
        </a>

        <Link
          href="/admin"
          style={{
            background: '#f5b301',
            padding: '18px',
            borderRadius: '14px',
            color: 'black',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Admin Panel
        </Link>

      </div>
    </main>
  );
}
