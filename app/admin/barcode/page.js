'use client'

import { useEffect, useRef, useState } from 'react'
import JsBarcode from 'jsbarcode'

export default function Page() {

  const svgRef = useRef()

  const [barcode, setBarcode] = useState('9201234567890')

  useEffect(() => {

    if (!svgRef.current) return

    JsBarcode(svgRef.current, barcode, {
      format: 'EAN13',
      width: 2,
      height: 100,
      displayValue: true,
      background: '#fff',
      lineColor: '#000',
    })

  }, [barcode])

  return (

    <div style={{
      background:'#111',
      minHeight:'100vh',
      padding:'40px',
      color:'#fff'
    }}>

      <h1>Barcode Studio</h1>

      <input
        value={barcode}
        onChange={(e)=>setBarcode(e.target.value)}
        style={{
          padding:'15px',
          width:'300px',
          marginBottom:'30px',
          color:'#000'
        }}
      />

      <div style={{
        background:'#fff',
        padding:'30px',
        borderRadius:'20px',
        width:'fit-content'
      }}>

        <svg ref={svgRef}></svg>

      </div>

    </div>

  )
}
