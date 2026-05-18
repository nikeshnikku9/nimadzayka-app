'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Trash2, CheckCircle, Clock, MessageCircle, Search } from 'lucide-react';
import { brandInfo } from '@/lib/seed-data';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [q, setQ] = useState('');

  const token = () => localStorage.getItem('nz_admin_token');

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/enquiries', { headers: { Authorization: `Bearer ${token()}` } });
    const data = await r.json();
    setEnquiries(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markStatus = async (id, status) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ status }),
    });
    toast.success(`Marked as ${status}`);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    await fetch(`/api/enquiries/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
    toast.success('Deleted');
    load();
  };

  const filtered = enquiries.filter(e => {
    if (filter !== 'all' && e.status !== filter) return false;
    if (q && !`${e.name} ${e.phone} ${e.city} ${e.email}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="font-serif-display text-3xl font-bold text-red-900">Distributor Enquiries</h1>
        <p className="text-zinc-600 text-sm">Manage and respond to incoming business leads</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, phone, city…" className="pl-9" />
        </div>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList className="bg-yellow-50">
            <TabsTrigger value="all">All ({enquiries.length})</TabsTrigger>
            <TabsTrigger value="new">New ({enquiries.filter(e => e.status === 'new').length})</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? <p className="text-zinc-500">Loading…</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(e => (
            <Card key={e.id} className="card-premium"><CardContent className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-serif-display font-bold text-zinc-900">{e.name}</h3>
                  <p className="text-xs text-zinc-500">{new Date(e.createdAt).toLocaleString()}</p>
                </div>
                <Badge className={
                  e.status === 'new' ? 'bg-red-100 text-red-800 border border-red-300' :
                  e.status === 'contacted' ? 'bg-yellow-100 text-yellow-900 border border-yellow-300' :
                  'bg-green-100 text-green-800 border border-green-300'
                }>{e.status}</Badge>
              </div>
              <div className="space-y-1 text-sm text-zinc-700">
                <a href={`tel:${e.phone}`} className="flex items-center gap-2 hover:text-red-700"><Phone className="w-3.5 h-3.5" /> {e.phone}</a>
                {e.email && <a href={`mailto:${e.email}`} className="flex items-center gap-2 hover:text-red-700"><Mail className="w-3.5 h-3.5" /> {e.email}</a>}
                {e.city && <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {e.city}</div>}
              </div>
              {e.message && <p className="mt-3 text-sm text-zinc-600 bg-yellow-50 p-2 rounded">“{e.message}”</p>}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <a href={`https://wa.me/${e.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello ${e.name}, this is Nimad ZAYKA Spices.`)}`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="btn-gold h-8 gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</Button>
                </a>
                {e.status !== 'contacted' && <Button size="sm" variant="outline" className="h-8 gap-1.5 border-yellow-700 text-yellow-800" onClick={() => markStatus(e.id, 'contacted')}><Clock className="w-3.5 h-3.5" /> Mark Contacted</Button>}
                {e.status !== 'closed' && <Button size="sm" variant="outline" className="h-8 gap-1.5 border-green-700 text-green-800" onClick={() => markStatus(e.id, 'closed')}><CheckCircle className="w-3.5 h-3.5" /> Close</Button>}
                <Button size="sm" variant="outline" className="h-8 border-red-700 text-red-700" onClick={() => remove(e.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
              </div>
            </CardContent></Card>
          ))}
          {!filtered.length && <p className="text-zinc-500 col-span-full text-center py-8">No enquiries{filter !== 'all' && ` (${filter})`} yet.</p>}
        </div>
      )}
    </div>
  );
}
