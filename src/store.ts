import { create } from 'zustand'
import { MemoryNode, Connection, Cluster, AppSettings } from './db'
import * as db from './db'
import i18n from './i18n'
import { extractKeywords, detectMood } from './ai'

interface AppState {
  nodes: MemoryNode[]
  connections: Connection[]
  clusters: Cluster[]
  settings: AppSettings | null
  selectedNodeId: string | null
  isLoading: boolean
  searchQuery: string
  visualMode: 'canvas' | 'timeline' | 'clusters' | 'focus'
  isCommandPaletteOpen: boolean
  isSettingsOpen: boolean
  isOnboardingOpen: boolean

  initialize: () => Promise<void>
  loadNodes: () => Promise<void>
  createNode: (title: string, content: string, tags?: string[]) => Promise<void>
  addNode: (node: MemoryNode) => Promise<void>
  updateNode: (id: string, updates: Partial<MemoryNode>) => Promise<void>
  deleteNode: (id: string) => Promise<void>
  selectNode: (id: string | null) => void

  loadConnections: () => Promise<void>
  addConnection: (connection: Connection) => Promise<void>
  deleteConnection: (id: string) => Promise<void>

  loadClusters: () => Promise<void>
  addCluster: (cluster: Cluster) => Promise<void>
  updateCluster: (id: string, updates: Partial<Cluster>) => Promise<void>
  deleteCluster: (id: string) => Promise<void>

  loadSettings: () => Promise<void>
  updateSettings: (updates: Partial<AppSettings>) => Promise<void>
  setLanguage: (language: string) => Promise<void>

  setSearchQuery: (query: string) => void
  setVisualMode: (mode: 'canvas' | 'timeline' | 'clusters' | 'focus') => void
  setCommandPaletteOpen: (open: boolean) => void
  setSettingsOpen: (open: boolean) => void
  setOnboardingOpen: (open: boolean) => void

  exportData: () => Promise<{ nodes: MemoryNode[]; connections: Connection[]; clusters: Cluster[] }>
  importData: (data: { nodes?: MemoryNode[]; connections?: Connection[]; clusters?: Cluster[] }) => Promise<void>
  clearAllData: () => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  nodes: [],
  connections: [],
  clusters: [],
  settings: null,
  selectedNodeId: null,
  isLoading: true,
  searchQuery: '',
  visualMode: 'canvas',
  isCommandPaletteOpen: false,
  isSettingsOpen: false,
  isOnboardingOpen: false,

  initialize: async () => {
    set({ isLoading: true })
    await db.initializeDB()
    await get().loadNodes()
    await get().loadConnections()
    await get().loadClusters()
    await get().loadSettings()
    set({ isLoading: false })
  },

  loadNodes: async () => {
    const nodes = await db.getAllNodes()
    set({ nodes })
  },

  createNode: async (title, content, tags = []) => {
    const keywords = extractKeywords(content)
    const mood = detectMood(content)
    const node: MemoryNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      content,
      tags,
      mood,
      keywords,
      x: Math.random() * 600 + 100,
      y: Math.random() * 400 + 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await get().addNode(node)
  },

  addNode: async (node) => {
    await db.addNode(node)
    await get().loadNodes()
    await generateAutoConnections(node.id, get)
  },

  updateNode: async (id, updates) => {
    await db.updateNode(id, updates)
    await get().loadNodes()
  },

  deleteNode: async (id) => {
    await db.deleteNode(id)
    await get().loadNodes()
    await get().loadConnections()
  },

  selectNode: (id) => {
    set({ selectedNodeId: id })
  },

  loadConnections: async () => {
    const connections = await db.getAllConnections()
    set({ connections })
  },

  addConnection: async (connection) => {
    await db.addConnection(connection)
    await get().loadConnections()
  },

  deleteConnection: async (id) => {
    await db.deleteConnection(id)
    await get().loadConnections()
  },

  loadClusters: async () => {
    const clusters = await db.getAllClusters()
    set({ clusters })
  },

  addCluster: async (cluster) => {
    await db.addCluster(cluster)
    await get().loadClusters()
  },

  updateCluster: async (id, updates) => {
    await db.updateCluster(id, updates)
    await get().loadClusters()
  },

  deleteCluster: async (id) => {
    await db.deleteCluster(id)
    await get().loadClusters()
  },

  loadSettings: async () => {
    const settings = await db.getSettings()
    if (settings) {
      set({ settings, visualMode: settings.visualMode as any })
      i18n.changeLanguage(settings.language)
    }
  },

  updateSettings: async (updates) => {
    await db.updateSettings(updates)
    await get().loadSettings()
  },

  setLanguage: async (language) => {
    await get().updateSettings({ language })
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setVisualMode: (mode) => {
    set({ visualMode: mode })
    if (get().settings) {
      db.updateSettings({ visualMode: mode })
    }
  },
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setOnboardingOpen: (open) => set({ isOnboardingOpen: open }),

  exportData: async () => {
    return db.exportAllData()
  },

  importData: async (data) => {
    await db.importData(data)
    await get().loadNodes()
    await get().loadConnections()
    await get().loadClusters()
  },

  clearAllData: async () => {
    await db.clearAllData()
    set({ nodes: [], connections: [], clusters: [], selectedNodeId: null })
  },
}))

async function generateAutoConnections(newNodeId: string, get: any) {
  const state = useAppStore.getState()
  const newNode = state.nodes.find(n => n.id === newNodeId)
  if (!newNode || newNode.keywords.length === 0) return

  const threshold = 0.3

  for (const existingNode of state.nodes) {
    if (existingNode.id === newNodeId) continue

    const similarity = calculateKeywordSimilarity(newNode.keywords, existingNode.keywords)
    if (similarity >= threshold) {
      const existingConnection = state.connections.find(
        c => (c.sourceId === newNodeId && c.targetId === existingNode.id) ||
             (c.targetId === newNodeId && c.sourceId === existingNode.id)
      )

      if (!existingConnection) {
        await db.addConnection({
          id: `conn-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          sourceId: newNodeId,
          targetId: existingNode.id,
          strength: similarity,
          createdAt: new Date(),
        })
      }
    }
  }

  await get().loadConnections()
}

function calculateKeywordSimilarity(keywords1: string[], keywords2: string[]): number {
  if (keywords1.length === 0 || keywords2.length === 0) return 0

  const set1 = new Set(keywords1.map(k => k.toLowerCase()))
  const set2 = new Set(keywords2.map(k => k.toLowerCase()))

  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])

  return intersection.size / union.size
}