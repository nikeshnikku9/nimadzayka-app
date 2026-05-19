'use client'

import { useEffect, useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'

export default function BarcodePage() {

  const svgRef = useRef(null)

  const [barcode, setBarcode] = useState('8901234567890')
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  useEffect(() => {

    if (!svgRef.current) return

    try {

      JsBarcode(svgRef.current, barcode, {
        format: 'EAN13',
        lineColor: '#000',
        background: '#fff',
        width: 2,
        height: 100,
        displayValue: true,
      })

    } catch (err) {
      console.log(err)
    }

  }, [barcode])

  async function saveProduct() {

    try {

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barcode,
          product,
          price,
          stock,
        }),
      })

      const data = await res.json()

      alert('Product Saved Successfully')

      console.log(data)

    } catch (err) {

      console.log(err)

      alert('Error Saving Product')

    }

  }

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: 'white',
        padding: '40px',
      }}
    >

      <h1 style={{ fontSize: '40px', marginBottom: '30px' }}>
        Barcode Studio
      </h1>

      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
        }}
      >

        <div
          style={{
            background: '#1e1e1e',
            padding: '30px',
            borderRadius: '20px',
            width: '400px',
          }}
        >

          <input
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={saveProduct}
            style={{
              width: '100%',
              background: '#FFD700',
              color: '#000',
              border: 'none',
              padding: '15px',
              borderRadius: '12px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            SAVE PRODUCT
          </button>

        </div>

        <div
          style={{
            background: '#1e1e1e',
            padding: '30px',
            borderRadius: '20px',
          }}
        >

          <div
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '20px',
            }}
          >

            <svg ref={svgRef}></svg>

          </div>

        </div>

      </div>

    </div>

  )

}

const inputStyle = {
  width: '100%',
  padding: '15px',
  marginBottom: '15px',
  borderRadius: '10px',
  border: '1px solid #444',
  background: '#222',
  color: '#fff',
}
