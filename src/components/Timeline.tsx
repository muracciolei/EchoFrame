import React from 'react'
import { useAppStore } from '../store'

const Timeline: React.FC = () => {
  const { nodes } = useAppStore()

  const sortedNodes = [...nodes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="w-full h-full bg-background p-4">
      <h2 className="text-xl font-bold mb-4">Timeline View</h2>
      <div className="space-y-4">
        {sortedNodes.map((node) => (
          <div key={node.id} className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{node.title}</h3>
              <span className="text-sm text-text-secondary">
                {new Date(node.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-text-secondary mt-2">{node.content.substring(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline