'use client';

import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const products = [
  {
    name: 'Haldi Powder',
    sku: 'NZ-HP-100',
    barcode: '8901234567890',
    weight: '100g',
    price: '70',
    batch: 'NZ2401'
  },
  {
    name: 'Lal Mirch Powder',
    sku: 'NZ-LM-100',
    barcode: '8901234567891',
    weight: '100g',
    price: '90',
    batch: 'NZ2402'
  },
  {
    name: 'Dhaniya Powder',
    sku: 'NZ-DP-100',
    barcode: '8901234567892',
    weight: '100g',
    price: '60',
    batch: 'NZ2403'
  },
  {
    name: 'Garam Masala',
    sku: 'NZ-GM-100',
    barcode: '8901234567893',
    weight: '100g',
    price: '120',
    batch: 'NZ2404'
  }
];

function BarcodePreview({
  value,
  format = 'CODE128',
  height = 70,
  width = 2
}) {

  const svgRef = useRef(null);

  useEffect(() => {

    if (!svgRef.current || !value) return;

    try {

      JsBarcode(svgRef.current, value, {
        format,
        lineColor: '#000',
        width,
        height,
        displayValue: true,
        background: '#fff',
        fontSize: 16,
        margin: 10,
      });

    } catch (err) {
      console.log(err);
    }

  }, [value, format, height, width]);

  return <svg ref={svgRef}></svg>;
}

export default function BarcodePage() {

  const [tab, setTab] = useState('single');

  const [code, setCode] = useState('8901234567890');

  const printRef = useRef(null);

  const downloadSVG = () => {

    const svg = document.querySelector('#singleBarcode svg');

    if (!svg) return;

    const serializer = new XMLSerializer();

    const source = serializer.serializeToString(svg);

    const blob = new Blob([source], {
      type: 'image/svg+xml;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = 'barcode.svg';

    a.click();
  };

  const downloadPNG = () => {

    const svg = document.querySelector('#singleBarcode svg');

    if (!svg) return;

    const xml = new XMLSerializer().serializeToString(svg);

    const svg64 = btoa(xml);

    const image64 = 'data:image/svg+xml;base64,' + svg64;

    const img = new Image();

    img.onload = function () {

      const canvas = document.createElement('canvas');

      canvas.width = img.width * 2;

      canvas.height = img.height * 2;

      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#fff';

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const png = canvas.toDataURL('image/png');

      const a = document.createElement('a');

      a.href = png;

      a.download = 'barcode.png';

      a.click();
    };

    img.src = image64;
  };

  const downloadPDF = async () => {

    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();

    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);

    pdf.save('nimad-zayka-barcodes.pdf');
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-5xl font-bold text-[#7f1d1d]">
            Barcode Studio
          </h1>

          <p className="text-zinc-600 mt-2">
            Generate premium product barcodes
          </p>

        </div>

      </div>

      <div className="flex gap-4 mb-8">

        <button
          onClick={() => setTab('single')}
          className={`px-6 py-3 rounded-xl font-bold ${
            tab === 'single'
              ? 'bg-red-900 text-yellow-300'
              : 'bg-white'
          }`}
        >
          Single Barcode
        </button>

        <button
          onClick={() => setTab('batch')}
          className={`px-6 py-3 rounded-xl font-bold ${
            tab === 'batch'
              ? 'bg-red-900 text-yellow-300'
              : 'bg-white'
          }`}
        >
          Batch Labels
        </button>

      </div>

      {tab === 'single' && (

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl p-8 shadow-xl">

            <label className="block mb-3 font-semibold">
              Enter Barcode
            </label>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border rounded-2xl mb-6"
            />

            <label className="block mb-3 font-semibold">
              Quick Product Select
            </label>

            <select
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 border rounded-2xl"
            >

              {products.map((p) => (
                <option
                  key={p.barcode}
                  value={p.barcode}
                >
                  {p.name} - {p.weight}
                </option>
              ))}

            </select>

          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold text-[#7f1d1d] mb-6">
              Preview
            </h2>

            <div
              id="singleBarcode"
              className="bg-white border rounded-2xl p-8 flex justify-center"
            >

              <BarcodePreview value={code} />

            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">

              <button
                onClick={downloadPNG}
                className="bg-yellow-500 py-3 rounded-xl font-bold"
              >
                PNG
              </button>

              <button
                onClick={downloadSVG}
                className="bg-red-900 text-yellow-300 py-3 rounded-xl font-bold"
              >
                SVG
              </button>

              <button
                onClick={() => window.print()}
                className="bg-black text-white py-3 rounded-xl font-bold"
              >
                Print
              </button>

            </div>

          </div>

        </div>

      )}

      {tab === 'batch' && (

        <div className="bg-white rounded-3xl p-8 shadow-xl">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-[#7f1d1d]">
              Batch Barcode Labels
            </h2>

            <button
              onClick={downloadPDF}
              className="bg-red-900 text-yellow-300 px-6 py-3 rounded-xl font-bold"
            >
              Download PDF
            </button>

          </div>

          <div
            ref={printRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >

            {products.map((p) => (

              <div
                key={p.barcode}
                className="border rounded-xl p-3 text-center bg-white"
              >

                <h3 className="font-bold text-red-900 text-sm">
                  NIMAD ZAYKA
                </h3>

                <p className="text-xs text-zinc-500">
                  {p.name}
                </p>

                <div className="flex justify-center my-2">

                  <BarcodePreview
                    value={p.barcode}
                    height={40}
                    width={1.4}
                  />

                </div>

                <p className="text-[10px]">
                  {p.weight} · ₹{p.price}
                </p>

                <p className="text-[9px] text-zinc-500">
                  Batch: {p.batch}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </main>
  );
}
