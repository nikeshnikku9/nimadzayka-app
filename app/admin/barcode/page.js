'use client'

import { useEffect, useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'

export default function BarcodePage() {

  const svgRef = useRef(null)

  const [barcode, setBarcode] = useState('9201234567890')
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  useEffect(() => {

    if (!svgRef.current) return

    try {

      JsBarcode(svgRef.current, barcode, {
        format: 'EAN13',
        lineColor: '#000000',
        background: '#ffffff',
        width: 2,
        height: 120,
        displayValue: true,
        fontSize: 20,
        margin: 10,
      })

    } catch (e) {
      console.log(e)
    }

  }, [barcode])

  async function saveProduct() {

    try {

      const response = await fetch('/api/products', {
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

      const data = await response.json()

      console.log(data)

      if (data.success) {

        alert('Product Saved Successfully')

      } else {

        alert(data.error || 'Save Failed')

      }

    } catch (err) {

      console.log(err)

      alert('Server Error')

    }

  }

  return (

    <div
      style={{
        background: '#0f0f0f',
        minHeight: '100vh',
        padding: '40px',
        color: 'white',
      }}
    >

      <h1
        style={{
          fontSize: '42px',
          marginBottom: '30px',
          color: '#FFD700',
        }}
      >
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
            background: '#1b1b1b',
            padding: '30px',
            borderRadius: '20px',
            width: '400px',
          }}
        >

          <input
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Barcode"
            style={inputStyle}
          />

          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product Name"
            style={inputStyle}
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            style={inputStyle}
          />

          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Stock"
            style={inputStyle}
          />

          <button
            onClick={saveProduct}
            style={{
              width: '100%',
              background: '#FFD700',
              color: '#000',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            SAVE PRODUCT
          </button>

        </div>

        <div
          style={{
            background: '#1b1b1b',
            padding: '30px',
            borderRadius: '20px',
          }}
        >

          <div
            style={{
              background: '#ffffff',
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
  marginBottom: '20px',
  borderRadius: '10px',
  border: '1px solid #444',
  background: '#111',
  color: '#fff',
  fontSize: '16px',
}
