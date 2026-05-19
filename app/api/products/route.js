export async function GET() {

  return Response.json([
    {
      product:'Haldi Powder',
      barcode:'9201234567890',
      price:45,
      stock:100
    }
  ])

}
