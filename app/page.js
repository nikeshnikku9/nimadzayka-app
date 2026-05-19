'use client'

import {
  Phone,
  Globe,
  MapPin,
  BookOpen,
  Instagram,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/75" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-5 py-10">

        {/* BRAND BOX */}
        <div className="text-center">

          <div className="bg-red-700/95 border-4 border-yellow-500 rounded-[35px] px-10 py-8 shadow-2xl">
            <h1 className="text-white text-6xl md:text-7xl font-extrabold leading-tight tracking-wide">
              NIMAD
              <br />
              ZAYKA
            </h1>

            <p className="text-white text-2xl mt-3 tracking-[5px] font-semibold">
              SPICES
            </p>
          </div>

          {/* PREMIUM */}
          <div className="mt-8">

            <p className="text-yellow-400 text-2xl md:text-3xl font-semibold tracking-[5px]">
              PREMIUM INDIAN SPICES
            </p>

            <div className="w-72 h-[2px] bg-yellow-500 mx-auto mt-4 mb-4" />

            <p className="text-yellow-100 text-xl italic">
              Swaad jo Nimad se aayo
            </p>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="w-full max-w-md mt-10 flex flex-col gap-5">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/916265996333"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-green-600/90 border border-green-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <MessageCircle size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Order on WhatsApp
                </h3>

                <p className="text-green-100 text-lg">
                  +91 6265996333
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/nimadzayka.in"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-pink-500 to-orange-500 border border-pink-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <Instagram size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Follow on Instagram
                </h3>

                <p className="text-pink-100 text-lg">
                  @nimadzayka.in
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>

          {/* WEBSITE */}
          <a
            href="https://www.nimadzayka.com"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-yellow-600/90 border border-yellow-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <Globe size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Visit Our Website
                </h3>

                <p className="text-yellow-100 text-lg">
                  www.nimadzayka.com
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>

          {/* CALL */}
          <a
            href="tel:6265996333"
            className="flex items-center justify-between rounded-3xl bg-red-600/90 border border-red-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <Phone size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Call Us
                </h3>

                <p className="text-red-100 text-lg">
                  +91 6265996333
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>

          {/* ADDRESS */}
          <a
            href="https://maps.app.goo.gl/2s3ikrK5QHkxCa6L8"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-orange-700/90 border border-orange-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <MapPin size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  Our Address
                </h3>

                <p className="text-orange-100 text-lg">
                  Nimad ZAYKA, India
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>

          {/* BROCHURE */}
          <a
            href="/brochure.pdf"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-red-700 to-orange-700 border border-orange-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center">
                <BookOpen size={38} className="text-white" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  View Brochure
                </h3>

                <p className="text-orange-100 text-lg">
                  All products & catalogue
                </p>
              </div>
            </div>

            <ChevronRight className="text-white" size={34} />
          </a>
        </div>

        {/* FOOTER */}
        <div className="mt-14 text-center text-yellow-100 border-t border-yellow-600 pt-8 w-full max-w-5xl">

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-lg">

            {/* FSSAI */}
            <div>
              <p className="text-3xl font-bold italic">
                fssai
              </p>

              <p className="mt-2">
                FSSAI: 21425190000195
              </p>
            </div>

            {/* NATURAL */}
            <div>
              <p className="font-bold text-yellow-300 text-3xl">
                100% NATURAL
              </p>
            </div>

            {/* TRUST */}
            <div>
              <p className="font-bold text-yellow-300 text-2xl">
                Packed with Purity,
              </p>

              <p className="text-xl">
                Delivered with Trust.
              </p>
            </div>

            {/* ADMIN PANEL */}
            <a
              href="/admin"
              className="bg-black/70 border border-yellow-400 rounded-2xl px-5 py-4 hover:bg-black/90 transition"
            >
              <div className="flex items-center gap-3">

                <ShieldCheck className="text-yellow-400" size={28} />

                <div className="text-left">
                  <h3 className="text-white font-bold text-lg">
                    Admin Panel
                  </h3>

                  <p className="text-yellow-300 text-sm">
                    Manage Website
                  </p>
                </div>

              </div>
            </a>

          </div>
        </div>
      </div>
    </main>
  );
}
