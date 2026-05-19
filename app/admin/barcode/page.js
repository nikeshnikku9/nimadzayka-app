'use client';

import { useEffect, useState, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, Printer, Barcode as BarcodeIcon, FileText } from 'lucide-react';

function BarcodeImage({ value, format = 'CODE128', text, height = 60, width = 1.8, displayValue = true }) {
  const svgRef = useRef(null);
  useEffect(() => {
    if (!svgRef.current || !value) return;
    try {
      JsBarcode(svgRef.current, value, {
        format, height, width, displayValue,
        text: text || value,
        background: '#ffffff',
        lineColor: '#0A0A0A',
        font: 'Inter, monospace',
        fontSize: 12,
        margin: 6,
      });
    } catch (e) {
      console.warn('Barcode error', e);
    }
  }, [value, format, text, height, width, displayValue]);
  return <svg ref={svgRef} />;
}

export default function BarcodePage() {
  const [tab, setTab] = useState('single');
  const [products, setProducts] = useState([]);

  // Single mode
  const [code, setCode] = useState('NZ-HP-100');
  const [format, setFormat] = useState('CODE128');

  // Batch mode
  const [selectedSkus, setSelectedSkus] = useState({});
  const printRef = useRef(null);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);

  const allVariants = products.flatMap(p =>
    (p.variants || []).map(v => ({ ...v, productName: p.name, productSlug: p.slug, batchNumber: p.batchNumber, mfgDate: p.mfgDate }))
  );

  const toggleSku = (sku) => setSelectedSkus(prev => ({ ...prev, [sku]: !prev[sku] }));
  const selectAll = () => setSelectedSkus(Object.fromEntries(allVariants.map(v => [v.sku, true])));
  const clearAll = () => setSelectedSkus({});

  const selectedVariants = allVariants.filter(v => selectedSkus[v.sku]);

  const downloadSinglePng = () => {
    const svg = document.querySelector('#single-barcode svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2; canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `barcode-${code}.png`; a.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const downloadSingleSvg = () => {
    const svg = document.querySelector('#single-barcode svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `barcode-${code}.svg`; a.click();
  };

  const printSheet = () => {
    window.print();
  };

  const downloadPdf = async () => {
    if (!printRef.current) return;
    toast.info('Generating PDF…');
    const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfW = 210, pdfH = 297;
    const ratio = canvas.width / canvas.height;
    const w = pdfW - 20;
    const h = w / ratio;
    let position = 10;
    if (h < pdfH - 20) {
      pdf.addImage(imgData, 'PNG', 10, position, w, h);
    } else {
      // multi-page
      let remaining = h;
      let y = 10;
      while (remaining > 0) {
        pdf.addImage(imgData, 'PNG', 10, y, w, h);
        remaining -= (pdfH - 20);
        if (remaining > 0) { pdf.addPage(); y = 10 - (h - remaining); }
      }
    }
    pdf.save(`nimad-zayka-barcodes-${Date.now()}.pdf`);
    toast.success('PDF downloaded');
  };

  return (
    <div className="max-w-7xl">
      <div className="mb-6 print:hidden">
        <h1 className="font-serif-display text-3xl font-bold text-red-900 flex items-center gap-3"><BarcodeIcon className="w-7 h-7" /> Barcode Studio</h1>
        <p className="text-zinc-600 text-sm">Generate Code128 / EAN13 barcodes with GS1-style workflow</p>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="print:hidden">
        <TabsList className="bg-yellow-50">
          <TabsTrigger value="single">Single Barcode</TabsTrigger>
          <TabsTrigger value="batch">Batch Print Sheet</TabsTrigger>
        </TabsList>

        {/* SINGLE */}
        <TabsContent value="single" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-premium"><CardContent className="p-6 space-y-4">
              <div>
                <Label>Code / SKU / EAN</Label>
                <Input value={code} onChange={e => setCode(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label>Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CODE128">Code 128 (alphanumeric)</SelectItem>
                    <SelectItem value="EAN13">EAN-13 (13 digits)</SelectItem>
                    <SelectItem value="EAN8">EAN-8 (8 digits)</SelectItem>
                    <SelectItem value="UPC">UPC-A</SelectItem>
                    <SelectItem value="CODE39">Code 39</SelectItem>
                    <SelectItem value="ITF14">ITF-14</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-zinc-500 mt-1">EAN-13 needs exactly 13 numeric digits.</p>
              </div>

              <div>
                <Label>Quick Pick from Products</Label>
                <Select onValueChange={v => setCode(v)}>
                  <SelectTrigger><SelectValue placeholder="Choose a product variant…" /></SelectTrigger>
                  <SelectContent>
                    {allVariants.map(v => (
                      <SelectItem key={v.sku} value={v.sku}>{v.productName} – {v.weight} – {v.sku}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent></Card>

            <Card className="card-premium"><CardContent className="p-6">
              <h3 className="font-serif-display text-lg font-bold text-red-900 mb-3">Preview</h3>
              <div id="single-barcode" className="bg-white p-6 rounded-xl border border-yellow-700/20 flex items-center justify-center">
                <BarcodeImage value={code} format={format} height={100} width={2.5} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <Button onClick={downloadSinglePng} className="btn-gold gap-1.5"><Download className="w-4 h-4" /> PNG</Button>
                <Button onClick={downloadSingleSvg} variant="outline" className="gap-1.5 border-red-700 text-red-800"><Download className="w-4 h-4" /> SVG</Button>
                <Button onClick={printSheet} variant="outline" className="gap-1.5"><Printer className="w-4 h-4" /> Print</Button>
              </div>
            </CardContent></Card>
          </div>
        </TabsContent>

        {/* BATCH */}
        <TabsContent value="batch" className="mt-4">
          <Card className="card-premium"><CardContent className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h3 className="font-serif-display text-lg font-bold text-red-900">Select Variants for Printing</h3>
              <div className="flex gap-2">
                <Button onClick={selectAll} variant="outline" size="sm">Select All</Button>
                <Button onClick={clearAll} variant="outline" size="sm">Clear</Button>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {allVariants.map(v => (
                <label key={v.sku} className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${selectedSkus[v.sku] ? 'border-red-700 bg-red-50' : 'border-yellow-700/20 bg-white'}`}>
                  <Checkbox checked={!!selectedSkus[v.sku]} onCheckedChange={() => toggleSku(v.sku)} />
                  <div className="text-sm flex-1 min-w-0">
                    <div className="font-semibold text-zinc-800 truncate">{v.productName}</div>
                    <div className="text-xs text-zinc-500">{v.weight} · {v.sku}</div>
                  </div>
                </label>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-yellow-700/20 pt-3">
              <Badge className="bg-red-900 text-yellow-300">{selectedVariants.length} selected</Badge>
              <div className="flex gap-2">
                <Button onClick={downloadPdf} variant="outline" className="gap-1.5 border-red-700 text-red-800" disabled={!selectedVariants.length}><FileText className="w-4 h-4" /> Download PDF</Button>
                <Button onClick={printSheet} className="btn-gold gap-1.5" disabled={!selectedVariants.length}><Printer className="w-4 h-4" /> Print Sheet</Button>
              </div>
            </div>
          </CardContent></Card>
        </TabsContent>
      </Tabs>

      {/* PRINTABLE LABEL SHEET */}
      <div className="mt-6" ref={printRef}>
        {tab === 'batch' && selectedVariants.length > 0 && (
          <div className="bg-white p-6 rounded-xl border border-yellow-700/20 print:border-0 print:p-0">
            <div className="text-center mb-4 print:hidden">
              <h2 className="font-serif-display text-xl font-bold text-red-900">Label Sheet Preview</h2>
              <p className="text-xs text-zinc-500">A4 portrait · 4 columns x N rows · Nimad ZAYKA branded</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:gap-2">
              {selectedVariants.map(v => (
                <div key={v.sku} className="border border-zinc-300 rounded-md p-2 bg-white text-center break-inside-avoid">
                  <div className="text-[10px] font-bold text-red-800 font-display tracking-wider">NIMAD ZAYKA</div>
                  <div className="text-[9px] text-zinc-600 truncate">{v.productName}</div>
                  <div className="my-1 flex justify-center">
                    <BarcodeImage value={v.barcode || v.sku} format={(v.barcode && v.barcode.length === 13) ? 'EAN13' : 'CODE128'} height={40} width={1.2} displayValue={false} />
                  </div>
                  <div className="text-[8px] font-mono text-zinc-800">{v.barcode || v.sku}</div>
                  <div className="text-[9px] font-semibold text-zinc-700 mt-1">{v.weight} · ₹{v.price}</div>
                  <div className="text-[7px] text-zinc-500">Batch: {v.batchNumber}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @media print {
          body { background: white; }
          aside, header, .print\:hidden { display: none !important; }
          main { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}

