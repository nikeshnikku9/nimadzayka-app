'use client';

import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';

export default function BarcodePage() {

  const svgRef = useRef(null);

  const [code, setCode] = useState('8901234567890');

  useEffect(() => {

    if (!svgRef.current) return;

    try {

      JsBarcode(svgRef.current, code, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 100,
        displayValue: true,
        background: '#fff',
      });

    } catch (err) {
      console.log(err);
    }

  }, [code]);

  const downloadBarcode = () => {

    const svg = svgRef.current;

    const serializer = new XMLSerializer();

    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: 'image/svg+xml;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');

    link.href = url;

    link.download = 'nimad-zayka-barcode.svg';

    link.click();
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-yellow-400 mb-3">
        Barcode Studio
      </h1>

      <p className="text-zinc-400 mb-10">
        Generate premium product barcodes
      </p>

      <div className="max-w-2xl bg-zinc-900 p-8 rounded-3xl border border-yellow-500/20">

        <label className="block mb-3 text-lg">
          Enter Barcode Number
        </label>

        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-4 rounded-2xl bg-black border border-zinc-700 text-white mb-8"
        />

        <div className="bg-white rounded-2xl p-6 flex justify-center">

          <svg ref={svgRef}></svg>

        </div>

        <button
          onClick={downloadBarcode}
          className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-2xl"
        >
          Download Barcode
        </button>

      </div>

    </main>
  );
}
