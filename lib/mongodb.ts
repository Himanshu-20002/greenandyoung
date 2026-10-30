import { MongoClient, Db } from 'mongodb'
import dns from 'dns'

if (typeof window === 'undefined') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4'])
  } catch {
    // Ignore in non-Node environments
  }
}

const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/greenandyoung'
const dbName = process.env.MONGODB_DB || 'greenandyoung'

const options = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options)
    global._mongoClientPromise = global._mongoClient.connect()
  }
  client = global._mongoClient
  clientPromise = global._mongoClientPromise!
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export const db: Db = client.db(dbName)

export async function getDb(): Promise<Db> {
  await clientPromise
  return client.db(dbName)
}

export { client, clientPromise }
export default clientPromise
