import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store'

const CommandPalette: React.FC = () => {
  const { setCommandPaletteOpen, nodes, selectNode, setVisualMode } = useAppStore()
  const [query, setQuery] = useState('')
  const [filteredNodes, setFilteredNodes] = useState(nodes)

  useEffect(() => {
    const filtered = nodes.filter(node =>
      node.title.toLowerCase().includes(query.toLowerCase()) ||
      node.content.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredNodes(filtered)
  }, [query, nodes])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCommandPaletteOpen(false)
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
      <div className="bg-card p-4 rounded-lg w-full max-w-md mx-4">
        <input
          type="text"
          placeholder="Search nodes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded mb-4"
          autoFocus
        />
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredNodes.slice(0, 10).map((node) => (
            <div
              key={node.id}
              className="p-2 hover:bg-background rounded cursor-pointer"
              onClick={() => {
                selectNode(node.id)
                setCommandPaletteOpen(false)
              }}
            >
              <div className="font-medium">{node.title}</div>
              <div className="text-sm text-text-secondary">{node.content.substring(0, 50)}...</div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t space-y-2">
          <button
            onClick={() => {
              setVisualMode('canvas')
              setCommandPaletteOpen(false)
            }}
            className="w-full text-left p-2 hover:bg-background rounded"
          >
            Switch to Canvas View
          </button>
          <button
            onClick={() => {
              setVisualMode('timeline')
              setCommandPaletteOpen(false)
            }}
            className="w-full text-left p-2 hover:bg-background rounded"
          >
            Switch to Timeline View
          </button>
          <button
            onClick={() => {
              setVisualMode('clusters')
              setCommandPaletteOpen(false)
            }}
            className="w-full text-left p-2 hover:bg-background rounded"
          >
            Switch to Clusters View
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette