import Dexie, { Table } from 'dexie'

export interface MemoryNode {
  id: string
  title: string
  content: string
  tags: string[]
  mood: string
  keywords: string[]
  x: number
  y: number
  createdAt: Date
  updatedAt: Date
}

export interface Connection {
  id: string
  sourceId: string
  targetId: string
  strength: number
  createdAt: Date
}

export interface Cluster {
  id: string
  name: string
  nodeIds: string[]
  color: string
  createdAt: Date
}

export interface AppSettings {
  id: string
  language: string
  animationsEnabled: boolean
  onboardingCompleted: boolean
  visualMode: string
}

class EchoFrameDB extends Dexie {
  nodes!: Table<MemoryNode>
  connections!: Table<Connection>
  clusters!: Table<Cluster>
  settings!: Table<AppSettings>

  constructor() {
    super('EchoFrameDB')
    this.version(1).stores({
      nodes: 'id, title, createdAt, updatedAt, *tags, *keywords, mood',
      connections: 'id, sourceId, targetId',
      clusters: 'id, name',
      settings: 'id',
    })
  }
}

export const db = new EchoFrameDB()

export async function initializeDB() {
  const settings = await db.settings.get('default')
  if (!settings) {
    await db.settings.add({
      id: 'default',
      language: 'en',
      animationsEnabled: true,
      onboardingCompleted: false,
      visualMode: 'canvas',
    })
  }

  // Add demo data if no nodes exist
  const existingNodes = await db.nodes.count()
  if (existingNodes === 0) {
    const demoNodes: MemoryNode[] = [
      {
        id: 'demo-1',
        title: 'Morning Reflection',
        content: 'Today I woke up feeling inspired. The sunrise was beautiful and reminded me of new beginnings. I feel motivated to start working on my creative projects.',
        tags: ['reflection', 'inspiration', 'morning'],
        mood: 'inspired',
        keywords: ['inspired', 'sunrise', 'beginnings', 'motivated', 'creative'],
        x: 100,
        y: 100,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: 'demo-2',
        title: 'AI and Creativity',
        content: 'Artificial intelligence is transforming how we create art. I wonder if AI can truly understand human emotion or if it just mimics patterns.',
        tags: ['ai', 'creativity', 'technology'],
        mood: 'reflective',
        keywords: ['artificial', 'intelligence', 'create', 'art', 'emotion', 'patterns'],
        x: 400,
        y: 150,
        createdAt: new Date('2024-01-16'),
        updatedAt: new Date('2024-01-16'),
      },
      {
        id: 'demo-3',
        title: 'Coffee Shop Thoughts',
        content: 'Sitting in my favorite coffee shop, watching people. Everyone seems lost in their own worlds. I feel connected yet isolated.',
        tags: ['coffee', 'people', 'observation'],
        mood: 'calm',
        keywords: ['coffee', 'shop', 'people', 'watching', 'connected', 'isolated'],
        x: 200,
        y: 300,
        createdAt: new Date('2024-01-17'),
        updatedAt: new Date('2024-01-17'),
      },
      {
        id: 'demo-4',
        title: 'Future of Work',
        content: 'Remote work is changing everything. I miss the office interactions but love the flexibility. Finding balance is key.',
        tags: ['work', 'remote', 'balance'],
        mood: 'neutral',
        keywords: ['remote', 'work', 'office', 'interactions', 'flexibility', 'balance'],
        x: 500,
        y: 250,
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18'),
      },
      {
        id: 'demo-5',
        title: 'Dream Journal',
        content: 'Had a vivid dream about flying through clouds. Felt completely free and weightless. Woke up with a sense of possibility.',
        tags: ['dream', 'freedom', 'possibility'],
        mood: 'positive',
        keywords: ['dream', 'flying', 'clouds', 'free', 'weightless', 'possibility'],
        x: 300,
        y: 400,
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19'),
      },
    ]

    const demoConnections: Connection[] = [
      {
        id: 'conn-1',
        sourceId: 'demo-1',
        targetId: 'demo-2',
        strength: 0.6,
        createdAt: new Date(),
      },
      {
        id: 'conn-2',
        sourceId: 'demo-2',
        targetId: 'demo-5',
        strength: 0.4,
        createdAt: new Date(),
      },
      {
        id: 'conn-3',
        sourceId: 'demo-3',
        targetId: 'demo-4',
        strength: 0.5,
        createdAt: new Date(),
      },
    ]

    await db.nodes.bulkAdd(demoNodes)
    await db.connections.bulkAdd(demoConnections)
  }
}

export async function getAllNodes(): Promise<MemoryNode[]> {
  return db.nodes.toArray()
}

export async function getNode(id: string): Promise<MemoryNode | undefined> {
  return db.nodes.get(id)
}

export async function addNode(node: MemoryNode): Promise<string> {
  return db.nodes.add(node)
}

export async function updateNode(id: string, updates: Partial<MemoryNode>): Promise<number> {
  return db.nodes.update(id, { ...updates, updatedAt: new Date() })
}

export async function deleteNode(id: string): Promise<void> {
  await db.nodes.delete(id)
  await db.connections.where('sourceId').equals(id).or('targetId').equals(id).delete()
}

export async function getAllConnections(): Promise<Connection[]> {
  return db.connections.toArray()
}

export async function addConnection(connection: Connection): Promise<string> {
  return db.connections.add(connection)
}

export async function deleteConnection(id: string): Promise<void> {
  return db.connections.delete(id)
}

export async function getAllClusters(): Promise<Cluster[]> {
  return db.clusters.toArray()
}

export async function addCluster(cluster: Cluster): Promise<string> {
  return db.clusters.add(cluster)
}

export async function updateCluster(id: string, updates: Partial<Cluster>): Promise<number> {
  return db.clusters.update(id, updates)
}

export async function deleteCluster(id: string): Promise<void> {
  return db.clusters.delete(id)
}

export async function getSettings(): Promise<AppSettings | undefined> {
  return db.settings.get('default')
}

export async function updateSettings(updates: Partial<AppSettings>): Promise<number> {
  return db.settings.update('default', updates)
}

export async function clearAllData(): Promise<void> {
  await db.nodes.clear()
  await db.connections.clear()
  await db.clusters.clear()
}

export async function exportAllData(): Promise<{ nodes: MemoryNode[]; connections: Connection[]; clusters: Cluster[] }> {
  const nodes = await db.nodes.toArray()
  const connections = await db.connections.toArray()
  const clusters = await db.clusters.toArray()
  return { nodes, connections, clusters }
}

export async function importData(data: { nodes?: MemoryNode[]; connections?: Connection[]; clusters?: Cluster[] }): Promise<void> {
  if (data.nodes?.length) {
    await db.nodes.bulkPut(data.nodes)
  }
  if (data.connections?.length) {
    await db.connections.bulkPut(data.connections)
  }
  if (data.clusters?.length) {
    await db.clusters.bulkPut(data.clusters)
  }
}