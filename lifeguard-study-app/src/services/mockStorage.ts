/**
 * Mock Firebase Storage Service
 * Simulates Firebase Storage using localStorage for local development
 */

class MockStorageService {
  private files: Map<string, string> = new Map()

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('mock_storage_files')
    if (stored) {
      try {
        this.files = new Map(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load mock storage files:', e)
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('mock_storage_files', JSON.stringify(Array.from(this.files.entries())))
  }

  ref(path: string) {
    return {
      path,
      putFile: async (file: File) => {
        // In a real app, this would upload to Firebase
        // For mock, we'll store a reference to the file
        const reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.onload = () => {
            this.files.set(path, reader.result as string)
            this.saveToStorage()
            resolve({ ref: { path }, metadata: { name: file.name } })
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      },
      getDownloadURL: async () => {
        const data = this.files.get(path)
        if (!data) {
          throw new Error(`File not found at path: ${path}`)
        }
        return data
      },
      delete: async () => {
        this.files.delete(path)
        this.saveToStorage()
      }
    }
  }

  async clearAllFiles() {
    this.files.clear()
    localStorage.removeItem('mock_storage_files')
  }
}

export const mockStorageService = new MockStorageService()

