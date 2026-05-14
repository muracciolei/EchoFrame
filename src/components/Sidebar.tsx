import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store'
import { motion, AnimatePresence } from 'framer-motion'

export default function Sidebar() {
  const { t } = useTranslation()
  const { nodes, searchQuery, setSearchQuery, selectNode } = useAppStore()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const filteredNodes = nodes.filter(node => 
    node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const sortedNodes = [...filteredNodes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: isCollapsed ? -240 : 0 }}
      className="fixed left-0 top-16 bottom-0 w-64 glass border-r border-glass-border z-40 flex flex-col"
    >
      <div className="p-3 border-b border-glass-border">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('actions.search')}
            className="w-full px-3 py-2 bg-surface rounded-lg border border-glass-border text-text-primary text-sm font-body placeholder:text-text-muted focus:border-primary/50 transition-colors"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted text-xs">⌘F</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <AnimatePresence>
          {sortedNodes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 text-center text-text-muted text-sm"
            >
              {t('empty.title')}
            </motion.div>
          ) : (
            sortedNodes.map((node, index) => (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => selectNode(node.id)}
                className="w-full p-3 mb-2 rounded-lg bg-surface/50 border border-transparent hover:bg-surface hover:border-glass-border text-left transition-all group"
              >
                <h3 className="text-sm font-body text-text-primary truncate">{node.title}</h3>
                <p className="text-xs text-text-muted mt-1 line-clamp-2">{node.content}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded bg-${getMoodColor(node.mood)}/20 text-${getMoodColor(node.mood)}`}>
                    {t(`moods.${node.mood}`)}
                  </span>
                  {node.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs text-text-muted">#{tag}</span>
                  ))}
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 w-6 h-12 bg-surface border border-glass-border rounded-r-lg flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
      >
        {isCollapsed ? '▶' : '◀'}
      </button>
    </motion.aside>
  )
}

function getMoodColor(mood: string): string {
  const colors: Record<string, string> = {
    positive: 'success',
    negative: 'error',
    neutral: 'text-muted',
    energetic: 'warning',
    calm: 'primary',
    reflective: 'tertiary',
    inspired: 'secondary',
    anxious: 'warning',
  }
  return colors[mood] || 'text-muted'
}