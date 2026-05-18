'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('nz_admin_token') : null;
    if (token) router.replace('/admin/dashboard');
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await r.json();
      if (r.ok && data.token) {
        localStorage.setItem('nz_admin_token', data.token);
        toast.success('Welcome back!');
        router.replace('/admin/dashboard');
      } else {
        toast.error(data.error || 'Invalid password');
      }
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center brand-gradient p-4 relative overflow-hidden">
      <div className="absolute inset-0 spice-pattern" />
      <Card className="glass w-full max-w-md relative z-10 border-yellow-400/30">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <Logo size="lg" />
            <div className="divider-ornament mt-4 w-full">
              <span className="text-yellow-700 text-xs tracking-[0.3em] font-semibold">ADMIN PORTAL</span>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pwd" className="text-zinc-800">Admin Password</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <Input
                  id="pwd"
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="pl-9 pr-9 h-11"
                  required
                />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700">
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={loading} className="btn-gold w-full h-11 text-base">
              {loading ? 'Authenticating…' : 'Sign In'}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-zinc-500">
            Secure dashboard access for Nimad ZAYKA Spices
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
