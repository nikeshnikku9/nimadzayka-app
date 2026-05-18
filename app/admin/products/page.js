'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Copy, Search, Eye, ExternalLink } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/products');
    const data = await r.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.slug.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const handleDuplicate = async (id) => {
    const token = localStorage.getItem('nz_admin_token');
    const r = await fetch(`/api/products/${id}/duplicate`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    if (r.ok) { toast.success('Product duplicated'); load(); } else { toast.error('Failed'); }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const token = localStorage.getItem('nz_admin_token');
    const r = await fetch(`/api/products/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (r.ok) { toast.success('Product deleted'); load(); } else { toast.error('Failed'); }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-serif-display text-3xl font-bold text-red-900">Product Catalog</h1>
          <p className="text-zinc-600 text-sm">Manage your spice collection</p>
        </div>
        <Link href="/admin/products/new"><Button className="btn-gold gap-2"><Plus className="w-4 h-4" /> Add Product</Button></Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products…" className="pl-9" />
        </div>
        <Tabs value={cat} onValueChange={setCat}>
          <TabsList className="bg-yellow-50 border border-yellow-700/20">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="premium-box">Premium</TabsTrigger>
            <TabsTrigger value="standard-plastic">Standard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? <p className="text-zinc-500">Loading…</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <Card key={p.id} className="card-premium">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-20 h-20 rounded-lg shrink-0 ${p.category === 'premium-box' ? 'brand-gradient' : 'bg-gradient-to-br from-amber-100 to-yellow-200'} flex items-center justify-center overflow-hidden`}>
                    {p.thumbnail ? <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover" /> : <span className={`font-display font-bold text-xl ${p.category === 'premium-box' ? 'text-yellow-300' : 'text-red-900'}`}>{p.name.split(' ').map(w => w[0]).join('').slice(0,2)}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif-display font-bold text-zinc-900 truncate">{p.name}</h3>
                        <p className="text-xs text-zinc-500 truncate">/product/{p.slug}</p>
                      </div>
                      <Badge className={p.category === 'premium-box' ? 'bg-red-900 text-yellow-300 shrink-0' : 'bg-yellow-600 text-zinc-900 shrink-0'}>
                        {p.category === 'premium-box' ? 'Premium' : 'Standard'}
                      </Badge>
                    </div>
                    <div className="text-xs text-zinc-600 mt-1">{p.variants?.length || 0} variants · From ₹{p.variants?.[0]?.price || '—'}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5 flex-wrap">
                  <Link href={`/product/${p.slug}`} target="_blank"><Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs"><Eye className="w-3.5 h-3.5" /> View</Button></Link>
                  <Link href={`/admin/products/${p.id}/edit`}><Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs border-yellow-700 text-yellow-800"><Edit className="w-3.5 h-3.5" /> Edit</Button></Link>
                  <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs" onClick={() => handleDuplicate(p.id)}><Copy className="w-3.5 h-3.5" /> Copy</Button>
                  <Button size="sm" variant="outline" className="gap-1.5 h-8 text-xs border-red-700 text-red-700 hover:bg-red-50" onClick={() => handleDelete(p.id, p.name)}><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {!filtered.length && <p className="text-zinc-500 col-span-full text-center py-8">No products found.</p>}
        </div>
      )}
    </div>
  );
}
