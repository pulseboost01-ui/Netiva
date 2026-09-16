import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const isPlaceholder = !uri || /username:password@cluster\.mongodb\.net/.test(uri)
let mongoUnavailable = isPlaceholder

if (!uri && process.env.NODE_ENV === 'production') {
  console.warn('MONGODB_URI is not configured; admin metrics will be unavailable.')
}

const globalForMongo = globalThis as unknown as { mongoClientPromise?: Promise<MongoClient> }

export function getMongoClient(): Promise<MongoClient> | null {
  if (!uri || mongoUnavailable) return null
  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri)
    globalForMongo.mongoClientPromise = client.connect().catch((error) => {
      mongoUnavailable = true
      throw error
    })
  }
  return globalForMongo.mongoClientPromise
}

export async function getMetricsCollection() {
  const clientPromise = getMongoClient()
  if (!clientPromise) return null
  try {
    const client = await clientPromise
    return client.db(process.env.MONGODB_DB || 'epl-hub').collection('metrics')
  } catch {
    return null
  }
}
