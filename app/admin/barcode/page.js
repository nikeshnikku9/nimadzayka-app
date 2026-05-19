'use client';

import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function BarcodePage() {

  const svgRef = useRef(null);
  const printRef = useRef(null);

  const [code, setCode] = useState('8901234567890');
  const [productName, setProductName] = useState('NIMAD ZAYKA HALDI');
  const [price, setPrice] = useState('₹70');
  const [weight, setWeight] = useState('100g');

  useEffect(() => {

    if (!svgRef.current)
