'use client';

import { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Download, QrCode as QrIcon, Copy, RefreshCw } from 'lucide-react';
import { brandInfo } from '@/lib/seed-data';
import { LOGO_URL } from '@/components/Logo';

export default function QRGenerator() {
  const [type, setType] = useState('product');
  const [text, setText] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedBarcode, setSelectedBarcode] = useState('');
  const [size, setSize] = useState(600);
  const [darkColor, setDarkColor] = useState('#7F1D1D');
  const [lightColor, setLightColor] = useState('#FDFAF3');
  const [withLogo, setWithLogo] = useState(true);
  const [errorCorrection, setErrorCorrection] = useState('H');
  const [dataUrl, setDataUrl] = useState('');
  const [svgString, setSvgString] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts);
  }, []);

  const getOrigin = () => typeof window !== 'undefined' ? window.location.origin : '';

  const computeText = () => {
    if (type === 'product' && selectedSlug) return `${getOrigin()}/product/${selectedSlug}`;
    if (type === 'barcode' && selectedBarcode) return `${getOrigin()}/b/${selectedBarcode}`;
    if (type === 'whatsapp') return `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent('Hello Nimad ZAYKA!')}`;
    if (type === 'instagram') return brandInfo.instagram;
    if (type === 'home') return getOrigin();
    return text || getOrigin();
  };

  const generate = async () => {
    const value = computeText();
    if (!value) { toast.error('Enter content or pick a product'); return; }
    try {
      // PNG with logo overlay via canvas
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      await QRCode.toCanvas(canvas, value, {
        width: size, margin: 2,
        color: { dark: darkColor, light: lightColor },
        errorCorrectionLevel: errorCorrection,
      });
      if (withLogo) {
        const ctx = canvas.getContext('2d');
        const logoSize = size * 0.24;
        const x = (size - logoSize) / 2;
        const y = (size - logoSize) / 2;
        // Load the real brand logo image
        await new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // White background pad
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(x - 6, y - 6, logoSize + 12, logoSize + 12);
            ctx.drawImage(img, x, y, logoSize, logoSize);
            resolve();
          };
          img.onerror = () => {
            // Fallback to text badge
            ctx.fillStyle = '#B91C1C';
            ctx.fillRect(x - 8, y - 8, logoSize + 16, logoSize + 16);
            ctx.fillStyle = '#FFF8E7';
            ctx.font = `bold ${logoSize * 0.32}px Cinzel, serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('NIMAD', size / 2, size / 2 - logoSize * 0.15);
            ctx.fillText('ZAYKA', size / 2, size / 2 + logoSize * 0.2);
            resolve();
          };
          img.src = LOGO_URL;
        });
      }
      setDataUrl(canvas.toDataURL('image/png'));
      const svg = await QRCode.toString(value, {
        type: 'svg', margin: 2,
        color: { dark: darkColor, light: lightColor },
        errorCorrectionLevel: errorCorrection,
      });
      setSvgString(svg);
    } catch (e) { toast.error('Generation failed: ' + e.message); }
  };

  useEffect(() => { generate(); /* eslint-disable-next-line */ }, [type, selectedSlug, selectedBarcode, size, darkColor, lightColor, withLogo, errorCorrection, text]);

  const downloadPng = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl; a.download = `qr-${type}-${selectedSlug || 'code'}.png`; a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = `qr-${type}-${selectedSlug || 'code'}.svg`; a.click();
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(computeText());
    toast.success('Copied to clipboard');
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="font-serif-display text-3xl font-bold text-red-900 flex items-center gap-3"><QrIcon className="w-7 h-7" /> QR Code Studio</h1>
        <p className="text-zinc-600 text-sm">Generate beautiful QR codes for products, WhatsApp & more</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium"><CardContent className="p-6 space-y-4">
          <Tabs value={type} onValueChange={setType}>
            <TabsList className="w-full grid grid-cols-5 bg-yellow-50">
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="barcode">Barcode</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
            <TabsContent value="product" className="mt-3">
              <Label>Select Product (links to product page)</Label>
              <Select value={selectedSlug} onValueChange={setSelectedSlug}>
                <SelectTrigger><SelectValue placeholder="Choose a product…" /></SelectTrigger>
                <SelectContent>
                  {products.map(p => <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </TabsContent>
            <TabsContent value="barcode" className="mt-3">
              <Label>Select Variant (links to barcode lookup /b/{`{barcode}`})</Label>
              <Select value={selectedBarcode} onValueChange={setSelectedBarcode}>
                <SelectTrigger><SelectValue placeholder="Choose a variant…" /></SelectTrigger>
                <SelectContent>
                  {products.flatMap(p => (p.variants || []).map(v => (
                    <SelectItem key={v.barcode || v.sku} value={v.barcode || v.sku}>
                      {p.name} – {v.weight} – {v.barcode || v.sku}
                    </SelectItem>
                  )))}
                </SelectContent>
              </Select>
              <p className="text-xs text-zinc-500 mt-1">Smart QR — when retailer/consumer scans, opens the GS1-style product details page with WhatsApp order button.</p>
            </TabsContent>
            <TabsContent value="whatsapp" className="mt-3">
              <Label>WhatsApp Link</Label>
              <Input readOnly value={`wa.me/${brandInfo.whatsapp}`} />
            </TabsContent>
            <TabsContent value="home" className="mt-3">
              <Label>Home Page URL</Label>
              <Input readOnly value={getOrigin()} />
            </TabsContent>
            <TabsContent value="custom" className="mt-3">
              <Label>Custom URL / Text</Label>
              <Input value={text} onChange={e => setText(e.target.value)} placeholder="https://..." />
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div><Label>QR Color</Label><Input type="color" value={darkColor} onChange={e => setDarkColor(e.target.value)} className="h-10 cursor-pointer" /></div>
            <div><Label>Background</Label><Input type="color" value={lightColor} onChange={e => setLightColor(e.target.value)} className="h-10 cursor-pointer" /></div>
          </div>

          <div>
            <Label>Size: {size}px</Label>
            <Slider value={[size]} min={200} max={1200} step={50} onValueChange={v => setSize(v[0])} className="mt-2" />
          </div>

          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div><Label>Brand Logo in Center</Label><p className="text-xs text-zinc-500">Adds NIMAD ZAYKA badge</p></div>
            <Switch checked={withLogo} onCheckedChange={setWithLogo} />
          </div>

          <div>
            <Label>Error Correction</Label>
            <Select value={errorCorrection} onValueChange={setErrorCorrection}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="L">Low (7%)</SelectItem>
                <SelectItem value="M">Medium (15%)</SelectItem>
                <SelectItem value="Q">Quartile (25%)</SelectItem>
                <SelectItem value="H">High (30%) - Recommended with logo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent></Card>

        <Card className="card-premium"><CardContent className="p-6">
          <h3 className="font-serif-display text-lg font-bold text-red-900 mb-3">Preview</h3>
          <div className="bg-white p-4 rounded-xl border border-yellow-700/20 flex items-center justify-center min-h-[300px]">
            {dataUrl ? <img src={dataUrl} alt="QR" className="max-w-full max-h-[400px]" /> : <div className="text-zinc-400">Configure and preview…</div>}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="mt-3 p-2 bg-yellow-50 rounded text-xs text-zinc-600 break-all">{computeText()}</div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Button onClick={downloadPng} className="btn-gold gap-1.5"><Download className="w-4 h-4" /> PNG</Button>
            <Button onClick={downloadSvg} variant="outline" className="gap-1.5 border-red-700 text-red-800"><Download className="w-4 h-4" /> SVG</Button>
            <Button onClick={copyUrl} variant="outline" className="gap-1.5"><Copy className="w-4 h-4" /> URL</Button>
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
