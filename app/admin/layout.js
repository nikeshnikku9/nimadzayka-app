'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard, Package, QrCode, Barcode, Users, LogOut, Menu, Home,
} from 'lucide-react';
import Logo from '@/components/Logo';

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/products', icon: Package, label: 'Products' },
  { href: '/admin/qrcode', icon: QrCode, label: 'QR Generator' },
  { href: '/admin/barcode', icon: Barcode, label: 'Barcode Studio' },
  { href: '/admin/enquiries', icon: Users, label: 'Enquiries' },
];

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === '/admin') { setReady(true); return; }
    const token = localStorage.getItem('nz_admin_token');
    if (!token) { router.replace('/admin'); return; }
    setReady(true);
  }, [pathname, router]);

  if (!ready) return <div className="min-h-screen flex items-center justify-center bg-[#fdfaf3]"><div className="text-red-900 font-display">Loading…</div></div>;
  if (pathname === '/admin') return children;

  const logout = () => {
    localStorage.removeItem('nz_admin_token');
    router.replace('/admin');
  };

  const Sidebar = ({ onNav }) => (
    <aside className="w-64 brand-gradient text-yellow-100 min-h-screen flex flex-col">
      <div className="p-5 border-b border-yellow-400/20">
            <Logo size="md" />
            <div className="mt-2 text-xs tracking-widest text-yellow-300">ADMIN PORTAL</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNav}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                active ? 'bg-yellow-400 text-red-900 font-semibold shadow-md' : 'hover:bg-red-800/40 text-yellow-100'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-yellow-400/20 space-y-1">
        <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-800/40 text-yellow-100">
          <Home className="w-4 h-4" /> View Storefront
        </Link>
        <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-800/40 text-yellow-100">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#fdfaf3]">
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0">
        <header className="lg:hidden sticky top-0 z-30 glass border-b border-yellow-700/20 px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-red-700 text-red-900">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
