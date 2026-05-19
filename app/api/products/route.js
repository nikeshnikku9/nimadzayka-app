import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL

export async function POST(req) {

  try {

    const body = await req.json()

    const client = new MongoClient(uri)

    await client.connect()

    const db = client.db('nimad_zayka')

    const collection = db.collection('products')

    const result = await collection.insertOne({
      barcode: body.barcode,
      product: body.product,
      price: body.price,
      stock: body.stock,
      createdAt: new Date(),
    })

    await client.close()

    return Response.json({
      success: true,
      result,
    })

  } catch (err) {

    return Response.json({
      success: false,
      error: err.message,
    })

  }

}

export async function GET() {

  try {

    const client = new MongoClient(uri)

    await client.connect()

    const db = client.db('nimad_zayka')

    const collection = db.collection('products')

    const products = await collection.find().toArray()

    await client.close()

    return Response.json(products)

  } catch (err) {

    return Response.json({
      success: false,
      error: err.message,
    })

  }

}
