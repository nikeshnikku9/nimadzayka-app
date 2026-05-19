'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

export default function QRGenerator() {

  const [url, setUrl] = useState('https://nimadzayka-app.vercel.app');
  const [qr, setQr] = useState('');

  const generateQR = async () => {
    const data = await QRCode.toDataURL(url);
    setQr(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-yellow-400 mb-4">
        QR Generator
      </h1>

      <p className="text-zinc-400 mb-8">
        Generate QR codes for products & links
      </p>

      <div className="max-w-xl bg-zinc-900 p-6 rounded-3xl">

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white mb-5"
        />

        <button
          onClick={generateQR}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-xl"
        >
          Generate QR
        </button>

        {qr && (
          <div className="mt-8 text-center">

            <img
              src={qr}
              alt="QR Code"
              className="mx-auto rounded-2xl bg-white p-3"
            />

            <a
              href={qr}
              download="nimad-zayka-qr.png"
              className="inline-block mt-5 bg-green-600 px-5 py-3 rounded-xl font-bold"
            >
              Download QR
            </a>

          </div>
        )}

      </div>

    </div>
  );
}
