'use client';

import { useState, useRef } from 'react';
import JsBarcode from 'jsbarcode';

export default function BarcodePage() {

  const [value, setValue] = useState('890123456789');
  const svgRef = useRef(null);

  const generateBarcode = () => {

    JsBarcode(svgRef.current, value, {
      format: 'CODE128',
     
