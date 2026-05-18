'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Save, X, Plus, Upload, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

async function fileToBase64(file, maxW = 1200) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width, h = img.height;
        if (w > maxW) { h = h * (maxW / w); w = maxW; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const slugify = s => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function ProductForm({ mode, id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', nameHindi: '', slug: '', category: 'standard-plastic', tagline: '',
    description: '', ingredients: '', usage: '', recipes: '',
    variants: [{ weight: '100g', mrp: 100, price: 90, sku: '', barcode: '' }],
    images: [], thumbnail: '',
    batchNumber: `NZ-${new Date().getFullYear()}-001`,
    mfgDate: new Date().toISOString().slice(0, 10),
    expDate: new Date(Date.now() + 365 * 86400000).toISOString().slice(0, 10),
    tags: [],
    metaTitle: '', metaDescription: '',
    stockStatus: 'in-stock',
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      fetch(`/api/products/${id}`).then(r => r.json()).then(d => {
        setForm(prev => ({ ...prev, ...d }));
        setLoading(false);
      });
    }
  }, [mode, id]);

  const onDrop = async (files) => {
    try {
      const base64s = await Promise.all(files.slice(0, 5).map(f => fileToBase64(f)));
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...base64s].slice(0, 8),
        thumbnail: prev.thumbnail || base64s[0],
      }));
      toast.success(`${base64s.length} image(s) uploaded`);
    } catch { toast.error('Upload failed'); }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, maxSize: 10 * 1024 * 1024,
  });

  const setField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const setVariant = (i, k, v) => {
    setForm(prev => {
      const variants = [...prev.variants];
      variants[i] = { ...variants[i], [k]: v };
      return { ...prev, variants };
    });
  };

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { weight: '50g', mrp: 50, price: 45, sku: '', barcode: '' }],
    }));
  };

  const removeVariant = (i) => {
    setForm(prev => ({ ...prev, variants: prev.variants.filter((_, idx) => idx !== i) }));
  };

  const generateSku = (i) => {
    const namePart = form.name.split(' ')[0]?.slice(0, 2).toUpperCase() || 'XX';
    const weightPart = form.variants[i].weight.replace(/[^0-9]/g, '');
    const sku = `NZ-${namePart}-${weightPart}`;
    setVariant(i, 'sku', sku);
    if (!form.variants[i].barcode) {
      const barcode = '890' + Math.floor(1000000000 + Math.random() * 9000000000);
      setVariant(i, 'barcode', barcode);
    }
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setField('tags', [...form.tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (t) => setField('tags', form.tags.filter(x => x !== t));

  const removeImage = (i) => {
    const imgs = form.images.filter((_, idx) => idx !== i);
    setForm(prev => ({
      ...prev,
      images: imgs,
      thumbnail: prev.thumbnail === prev.images[i] ? (imgs[0] || '') : prev.thumbnail,
    }));
  };

  const save = async () => {
    if (!form.name) { toast.error('Name is required'); return; }
    setSaving(true);
    const payload = { ...form, slug: form.slug || slugify(form.name) };
    const token = localStorage.getItem('nz_admin_token');
    const url = mode === 'edit' ? `/api/products/${id}` : '/api/products';
    const method = mode === 'edit' ? 'PUT' : 'POST';
    try {
      const r = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (r.ok) {
        toast.success(`Product ${mode === 'edit' ? 'updated' : 'created'}!`);
        router.push('/admin/products');
      } else {
        const e = await r.json();
        toast.error(e.error || 'Save failed');
      }
    } catch { toast.error('Network error'); }
    setSaving(false);
  };

  if (loading) return <p className="text-zinc-500">Loading…</p>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products"><Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button></Link>
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-red-900">
              {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-zinc-600 text-sm">Manage product details, variants & SEO</p>
          </div>
        </div>
        <Button onClick={save} disabled={saving} className="btn-gold gap-2">
          <Save className="w-4 h-4" /> {saving ? 'Saving…' : 'Save Product'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {/* BASIC */}
          <Card className="card-premium"><CardContent className="p-5 space-y-4">
            <h2 className="font-serif-display text-lg font-bold text-red-900">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><Label>Product Name *</Label><Input value={form.name} onChange={e => { setField('name', e.target.value); if (!form.slug || mode==='create') setField('slug', slugify(e.target.value)); }} /></div>
              <div><Label>Hindi Name</Label><Input value={form.nameHindi} onChange={e => setField('nameHindi', e.target.value)} placeholder="हल्दी पाउडर" /></div>
              <div><Label>URL Slug</Label><Input value={form.slug} onChange={e => setField('slug', slugify(e.target.value))} /></div>
              <div><Label>Category</Label>
                <Select value={form.category} onValueChange={v => setField('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium-box">Premium Box</SelectItem>
                    <SelectItem value="standard-plastic">Standard Plastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:col-span-2"><Label>Tagline</Label><Input value={form.tagline} onChange={e => setField('tagline', e.target.value)} placeholder="e.g. The Heart of Indian Cuisine" /></div>
            </div>
          </CardContent></Card>

          {/* CONTENT */}
          <Card className="card-premium"><CardContent className="p-5 space-y-3">
            <h2 className="font-serif-display text-lg font-bold text-red-900">Content</h2>
            <div><Label>Description</Label><Textarea rows={3} value={form.description} onChange={e => setField('description', e.target.value)} /></div>
            <div><Label>Ingredients</Label><Textarea rows={2} value={form.ingredients} onChange={e => setField('ingredients', e.target.value)} /></div>
            <div><Label>Usage Suggestions</Label><Textarea rows={2} value={form.usage} onChange={e => setField('usage', e.target.value)} /></div>
            <div><Label>Recipe Ideas</Label><Textarea rows={2} value={form.recipes} onChange={e => setField('recipes', e.target.value)} /></div>
          </CardContent></Card>

          {/* VARIANTS */}
          <Card className="card-premium"><CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif-display text-lg font-bold text-red-900">Variants & Pricing</h2>
              <Button onClick={addVariant} size="sm" variant="outline" className="gap-1.5"><Plus className="w-4 h-4" /> Add Variant</Button>
            </div>
            <div className="space-y-3">
              {form.variants.map((v, i) => (
                <div key={i} className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-3 rounded-lg bg-yellow-50 border border-yellow-700/20">
                  <div><Label className="text-xs">Weight</Label><Input value={v.weight} onChange={e => setVariant(i, 'weight', e.target.value)} placeholder="100g" /></div>
                  <div><Label className="text-xs">MRP ₹</Label><Input type="number" value={v.mrp} onChange={e => setVariant(i, 'mrp', Number(e.target.value))} /></div>
                  <div><Label className="text-xs">Price ₹</Label><Input type="number" value={v.price} onChange={e => setVariant(i, 'price', Number(e.target.value))} /></div>
                  <div className="sm:col-span-1"><Label className="text-xs">SKU</Label><Input value={v.sku} onChange={e => setVariant(i, 'sku', e.target.value)} placeholder="NZ-XX-100" /></div>
                  <div className="sm:col-span-1"><Label className="text-xs">Barcode</Label><Input value={v.barcode} onChange={e => setVariant(i, 'barcode', e.target.value)} placeholder="8901234XXXXXX" /></div>
                  <div className="flex items-end gap-1">
                    <Button size="sm" variant="outline" onClick={() => generateSku(i)} className="flex-1 text-xs">Auto</Button>
                    {form.variants.length > 1 && <Button size="sm" variant="outline" onClick={() => removeVariant(i)} className="text-red-700"><X className="w-4 h-4" /></Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent></Card>

          {/* SEO */}
          <Card className="card-premium"><CardContent className="p-5 space-y-3">
            <h2 className="font-serif-display text-lg font-bold text-red-900">SEO</h2>
            <div><Label>Meta Title</Label><Input value={form.metaTitle} onChange={e => setField('metaTitle', e.target.value)} /></div>
            <div><Label>Meta Description</Label><Textarea rows={2} value={form.metaDescription} onChange={e => setField('metaDescription', e.target.value)} /></div>
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mt-1">
                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} placeholder="Add tag and press Enter" />
                <Button onClick={addTag} variant="outline" size="sm">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map(t => (
                  <Badge key={t} className="bg-yellow-200 text-zinc-800 hover:bg-yellow-200 gap-1 pr-1">
                    {t} <button onClick={() => removeTag(t)} className="hover:text-red-700"><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent></Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* IMAGES */}
          <Card className="card-premium"><CardContent className="p-5 space-y-3">
            <h2 className="font-serif-display text-lg font-bold text-red-900">Images</h2>
            <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-red-700 bg-red-50' : 'border-yellow-700/30 bg-yellow-50/50 hover:bg-yellow-50'}`}>
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 mx-auto text-yellow-700 mb-2" />
              <p className="text-sm text-zinc-700">{isDragActive ? 'Drop here…' : 'Drag & drop or click to upload'}</p>
              <p className="text-xs text-zinc-500 mt-1">Max 8 images, 10MB each</p>
            </div>
            {form.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {form.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-yellow-700/20 group">
                    <img src={img} alt={`img ${i}`} className="w-full h-full object-cover" />
                    {form.thumbnail === img && <Badge className="absolute top-1 left-1 bg-yellow-400 text-red-900 text-[10px]">MAIN</Badge>}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => setField('thumbnail', img)} className="h-7 text-xs">Set Main</Button>
                      <Button size="sm" variant="outline" onClick={() => removeImage(i)} className="h-7 text-xs text-red-700">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent></Card>

          {/* BATCH */}
          <Card className="card-premium"><CardContent className="p-5 space-y-3">
            <h2 className="font-serif-display text-lg font-bold text-red-900">Batch & Dates</h2>
            <div><Label>Batch Number</Label><Input value={form.batchNumber} onChange={e => setField('batchNumber', e.target.value)} /></div>
            <div><Label>Manufacturing Date</Label><Input type="date" value={form.mfgDate} onChange={e => setField('mfgDate', e.target.value)} /></div>
            <div><Label>Expiry Date</Label><Input type="date" value={form.expDate} onChange={e => setField('expDate', e.target.value)} /></div>
          </CardContent></Card>

          {/* STOCK */}
          <Card className="card-premium"><CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <Label>In Stock</Label>
                <p className="text-xs text-zinc-500">Toggle availability</p>
              </div>
              <Switch checked={form.stockStatus === 'in-stock'} onCheckedChange={c => setField('stockStatus', c ? 'in-stock' : 'out-of-stock')} />
            </div>
          </CardContent></Card>
        </div>
      </div>
    </div>
  );
}
