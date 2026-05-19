'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package, Users, QrCode, MessageCircle, TrendingUp, Eye, ArrowUpRight,
} from 'lucide-react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('nz_admin_token');
    fetch('/api/analytics/summary', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const stats = [
    { icon: Package, label: 'Total Products', value: data?.totalProducts ?? '—', color: 'from-red-700 to-red-900', href: '/admin/products' },
    { icon: Users, label: 'Distributor Enquiries', value: data?.totalEnquiries ?? '—', color: 'from-yellow-500 to-orange-600', href: '/admin/enquiries' },
    { icon: Eye, label: 'Total Page Views', value: data?.monthScans ?? '—', color: 'from-amber-600 to-yellow-700', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp Clicks', value: data?.whatsappClicks ?? '—', color: 'from-green-600 to-emerald-700', href: '#' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-red-900">Welcome Back</h1>
        <p className="text-zinc-600 mt-1">Here’s what’s happening with Nimad ZAYKA today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(({ icon: Icon, label, value, color, href }) => (
          <Link key={label} href={href}>
            <Card className="card-premium overflow-hidden h-full">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-bold text-zinc-900 font-serif-display">{value}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="card-premium lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif-display text-xl font-bold text-red-900">Top Performing Products</h2>
              <TrendingUp className="w-5 h-5 text-yellow-700" />
            </div>
            {data?.topProducts?.length ? (
              <ul className="space-y-3">
                {data.topProducts.map((p, i) => (
                  <li key={p.slug} className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-700/20">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full brand-gradient text-yellow-300 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <Link href={`/product/${p.slug}`} className="font-semibold text-zinc-800 hover:text-red-700">/product/{p.slug}</Link>
                    </div>
                    <Badge className="bg-red-900 text-yellow-300">{p.count} views</Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-zinc-500 text-sm">No data yet. Share product links to gather analytics.</p>
            )}
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardContent className="p-6">
            <h2 className="font-serif-display text-xl font-bold text-red-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/admin/products/new"><Button className="btn-gold w-full justify-start gap-2"><Package className="w-4 h-4" /> Add New Product</Button></Link>
              <Link href="/admin/qrcode"><Button variant="outline" className="w-full justify-start gap-2 border-red-700 text-red-900"><QrCode className="w-4 h-4" /> Generate QR Code</Button></Link>
              <Link href="/admin/barcode"><Button variant="outline" className="w-full justify-start gap-2 border-yellow-700 text-yellow-800"><Package className="w-4 h-4" /> Print Barcodes</Button></Link>
              <Link href="/admin/enquiries"><Button variant="outline" className="w-full justify-start gap-2 border-zinc-700 text-zinc-800"><Users className="w-4 h-4" /> View Enquiries</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-premium">
        <CardContent className="p-6">
          <h2 className="font-serif-display text-xl font-bold text-red-900 mb-4">Recent Activity</h2>
          {data?.recentEvents?.length ? (
            <ul className="space-y-2 text-sm">
              {data.recentEvents.slice(0, 10).map((e) => (
                <li key={e.id} className="flex items-center justify-between border-b border-yellow-700/10 pb-2">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-yellow-700" />
                    <span className="font-mono text-xs text-zinc-700">{e.event}</span>
                    {e.productSlug && <Badge variant="outline" className="text-xs">{e.productSlug}</Badge>}
                    {e.path && <span className="text-xs text-zinc-500">{e.path}</span>}
                  </div>
                  <span className="text-xs text-zinc-400">{new Date(e.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-zinc-500 text-sm">No activity recorded yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
