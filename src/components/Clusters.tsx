import React from 'react'
import { useAppStore } from '../store'

const Clusters: React.FC = () => {
  const { clusters, nodes } = useAppStore()

  return (
    <div className="w-full h-full bg-background p-4">
      <h2 className="text-xl font-bold mb-4">Clusters View</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clusters.map((cluster) => {
          const clusterNodes = nodes.filter(node => cluster.nodeIds.includes(node.id))
          return (
            <div key={cluster.id} className="bg-card p-4 rounded-lg border">
              <h3 className="font-semibold">{cluster.name}</h3>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Nodes ({clusterNodes.length}):</h4>
                <div className="mt-2 space-y-1">
                  {clusterNodes.slice(0, 3).map((node) => (
                    <div key={node.id} className="text-xs text-text-secondary">
                      • {node.title}
                    </div>
                  ))}
                  {clusterNodes.length > 3 && (
                    <div className="text-xs text-text-secondary">
                      • ... and {clusterNodes.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Clusters