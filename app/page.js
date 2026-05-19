'use client'

import Image from "next/image";
import {
  Phone,
  Globe,
  MapPin,
  BookOpen,
  Instagram,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2000&auto=format&fit=crop')",
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center px-5 py-10">

        {/* LOGO */}
        <div className="w-[230px] mb-5">
          <Image
            src="https://i.postimg.cc/4x6M0L7M/nimad-zayka-logo.png"
            alt="Nimad Zayka"
            width={500}
            height={500}
            className="w-full drop-shadow-2xl"
          />
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center tracking-wide drop-shadow-2xl">
          NIMAD ZAYKA
        </h1>

        {/* SUBTITLE */}
        <p className="text-yellow-400 text-lg md:text-2xl mt-4 tracking-[5px] font-semibold text-center">
          PREMIUM INDIAN SPICES
        </p>

        {/* LINE */}
        <div className="w-56 h-[2px] bg-yellow-500 mt-5 mb-5" />

        {/* TAGLINE */}
        <h2 className="text-yellow-100 text-2xl italic text-center font-semibold">
          Swaad jo Nimad se aayo
        </h2>

        {/* BUTTONS */}
        <div className="w-full max-w-md mt-10 flex flex-col gap-5">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/916265996333"
            target="_blank"
            className="flex items-center justify-between rounded-3xl bg-green-600/90 border border-green-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">
              <MessageCircle size={42} className="text-white" />
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
              <Instagram size={42} className="text-white" />

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

              <Globe size={42} className="text-white" />

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

              <Phone size={42} className="text-white" />

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

              <MapPin size={42} className="text-white" />

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
            href="#"
            className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-red-700 to-orange-700 border border-orange-300 p-5 shadow-2xl hover:scale-[1.02] transition"
          >
            <div className="flex items-center gap-4">

              <BookOpen size={42} className="text-white" />

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
        <div className="mt-14 text-center text-yellow-100">

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-lg">

            <div>
              <p className="font-bold text-yellow-300">
                FSSAI
              </p>

              <p>21425190000195</p>
            </div>

            <div>
              <p className="font-bold text-yellow-300">
                100% NATURAL
              </p>
            </div>

            <div>
              <p className="font-bold text-yellow-300">
                Packed with Purity,
              </p>

              <p>Delivered with Trust.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
