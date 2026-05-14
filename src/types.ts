import { MemoryNode, Connection, Cluster, AppSettings } from './db'

export type { MemoryNode, Connection, Cluster, AppSettings }

export type Mood = 'positive' | 'negative' | 'neutral' | 'energetic' | 'calm' | 'reflective' | 'inspired' | 'anxious'

export type VisualMode = 'canvas' | 'timeline' | 'clusters' | 'focus'

export interface NodeData {
  node: MemoryNode
  connections: Connection[]
}

export interface Command {
  id: string
  label: string
  shortcut?: string
  action: () => void
  icon?: string
}

export const MOOD_COLORS: Record<string, string> = {
  positive: '#00ff88',
  negative: '#ff4466',
  neutral: '#888888',
  energetic: '#ffaa00',
  calm: '#00f5ff',
  reflective: '#7b00ff',
  inspired: '#ff00aa',
  anxious: '#ff6644',
}

export const MOOD_ICONS: Record<string, string> = {
  positive: '☀',
  negative: '☁',
  neutral: '○',
  energetic: '⚡',
  calm: '~',
  reflective: '◎',
  inspired: '✦',
  anxious: '◎',
}