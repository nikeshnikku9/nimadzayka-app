'use client';

import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';

export default function Page() {

  const svgRef = useRef(null);

  const [barcode, setBarcode] = useState('8901234567890');

  useEffect(() => {

    if (!svgRef.current) return;

    JsBarcode(svgRef.current, barcode, {
      format: 'EAN13',
      background: '#ffffff',
      lineColor: '#000000',
      width: 3,
      height: 100,
      displayValue: true,
    });

  }, [barcode]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050505',
        padding: '40px',
        color: 'white',
      }}
    >

      <h1
        style={{
          fontSize: '42px',
          color: '#facc15',
          marginBottom: '40px',
        }}
      >
        NIMAD ZAYKA Inventory Barcode System
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
        }}
      >

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
          }}
        >

          <h2 style={{ color: '#facc15' }}>
            Product Entry
          </h2>

          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Enter EAN13 Barcode"
            style={{
              width: '100%',
              padding: '15px',
              marginTop: '20px',
              borderRadius: '12px',
              border: '1px solid #333',
            }}
          />

          <input
            placeholder="Product Name"
            style={inputStyle}
          />

          <input
            placeholder="Price"
            style={inputStyle}
          />

          <input
            placeholder="Stock Quantity"
            style={inputStyle}
          />

          <button
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '20px',
              background: '#facc15',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            SAVE PRODUCT
          </button>

        </div>

        <div
          style={{
            background: '#111',
            padding: '30px',
            borderRadius: '20px',
          }}
        >

          <h2 style={{ color: '#facc15' }}>
            Barcode Preview
          </h2>

          <div
            style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >

            <svg ref={svgRef}></svg>

          </div>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '20px',
  borderRadius: '12px',
  border: '1px solid #333',
};
