'use client'

export default function Dashboard() {

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold text-yellow-400 mb-4">
        NIMAD ZAYKA
      </h1>

      <p className="text-zinc-300 mb-10">
        Admin Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-yellow-300">
            Products
          </h2>

          <p className="mt-3 text-zinc-400">
            Add & manage products
          </p>
        </div>

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-yellow-300">
            QR Codes
          </h2>

          <p className="mt-3 text-zinc-400">
            Generate QR codes
          </p>
        </div>

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-yellow-300">
            Barcode
          </h2>

          <p className="mt-3 text-zinc-400">
            Create product barcodes
          </p>
        </div>

        <div className="bg-zinc-900 border border-yellow-500 rounded-3xl p-6">
          <h2 className="text-2xl font-bold text-yellow-300">
            Orders
          </h2>

          <p className="mt-3 text-zinc-400">
            Customer enquiries & orders
          </p>
        </div>

      </div>

    </main>
  )
}
