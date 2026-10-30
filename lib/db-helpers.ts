import { ObjectId } from 'mongodb'

/**
 * Normalizes MongoDB document by ensuring `id` is a string and handling `_id`.
 */
export function normalizeDoc<T extends Record<string, any>>(doc: T | null | undefined): any {
  if (!doc) return null
  const { _id, ...rest } = doc
  return {
    ...rest,
    id: _id ? _id.toString() : (rest as any).id,
  }
}

/**
 * Normalizes an array of MongoDB documents.
 */
export function normalizeDocs<T extends Record<string, any>>(docs: T[] | null | undefined): any[] {
  if (!docs || !Array.isArray(docs)) return []
  return docs.map(normalizeDoc)
}

/**
 * Safely converts an id string into a MongoDB ObjectId if valid.
 */
export function toObjectId(id: string): any {
  if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
    return new ObjectId(id)
  }
  return id
}
