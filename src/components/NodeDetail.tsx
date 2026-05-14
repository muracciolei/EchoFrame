import React from 'react'
import { useAppStore } from '../store'

const NodeDetail: React.FC = () => {
  const { selectedNodeId, nodes, selectNode } = useAppStore()
  const node = nodes.find(n => n.id === selectedNodeId)

  if (!node) return null

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{node.title}</h2>
          <button
            onClick={() => selectNode(null)}
            className="text-text-secondary hover:text-text-primary"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-text-secondary">Content</label>
            <p className="mt-1">{node.content}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Tags</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {node.tags.map((tag) => (
                <span key={tag} className="bg-primary bg-opacity-20 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text-secondary">Created</label>
            <p className="mt-1">{new Date(node.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NodeDetail