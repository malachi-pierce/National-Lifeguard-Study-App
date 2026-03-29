/**
 * Mock Firestore Database Service
 * Simulates Firestore using localStorage for local development
 */

export interface MockDocument {
  id: string
  [key: string]: any
}

class MockCollection {
  private name: string
  private docs: Map<string, any> = new Map()

  constructor(name: string) {
    this.name = name
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(`mock_db_${this.name}`)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        this.docs = new Map(Object.entries(data))
      } catch (e) {
        console.error(`Failed to load mock collection '${this.name}':`, e)
      }
    }
  }

  private saveToStorage() {
    const data = Object.fromEntries(this.docs)
    localStorage.setItem(`mock_db_${this.name}`, JSON.stringify(data))
  }

  async add(data: any) {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.docs.set(id, { id, ...data, _createdAt: Date.now() })
    this.saveToStorage()
    return { id }
  }

  async getDocs() {
    const docs = Array.from(this.docs.values()).map(doc => ({
      id: doc.id,
      data: () => {
        const { id, _createdAt, ...rest } = doc
        return rest
      }
    }))
    return { docs }
  }

  async getDoc(id: string) {
    const doc = this.docs.get(id)
    if (!doc) {
      return { exists: () => false }
    }
    const { id: docId, _createdAt, ...rest } = doc
    return {
      exists: () => true,
      id: docId,
      data: () => rest
    }
  }

  async setDoc(id: string, data: any) {
    this.docs.set(id, { id, ...data, _createdAt: Date.now() })
    this.saveToStorage()
  }

  async updateDoc(id: string, data: any) {
    const existing = this.docs.get(id)
    if (existing) {
      this.docs.set(id, { ...existing, ...data })
      this.saveToStorage()
    }
  }

  async deleteDoc(id: string) {
    this.docs.delete(id)
    this.saveToStorage()
  }

  async query(...constraints: any[]) {
    // Simple mock query - just returns all docs
    // In a real implementation, you'd filter based on constraints
    return this.getDocs()
  }
}

class MockFirestoreService {
  private collections: Map<string, MockCollection> = new Map()

  collection(name: string) {
    if (!this.collections.has(name)) {
      this.collections.set(name, new MockCollection(name))
    }
    return this.collections.get(name)!
  }

  async clearAllData() {
    this.collections.clear()
    // Also clear localStorage
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('mock_db_')) {
        localStorage.removeItem(key)
      }
    })
  }
}

export const mockFirestoreService = new MockFirestoreService()

