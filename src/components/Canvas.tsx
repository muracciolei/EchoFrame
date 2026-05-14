import React, { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Handle,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { useAppStore } from '../store'
import { MemoryNode } from '../db'
import { useTranslation } from 'react-i18next'

// Custom node component
const MemoryNodeComponent = ({ data }: { data: MemoryNode }) => {
  const { t } = useTranslation()

  const getMoodColor = (mood: string) => {
    const colors: Record<string, string> = {
      positive: 'border-green-400 bg-green-500/10',
      negative: 'border-red-400 bg-red-500/10',
      neutral: 'border-gray-400 bg-gray-500/10',
      energetic: 'border-yellow-400 bg-yellow-500/10',
      calm: 'border-blue-400 bg-blue-500/10',
      reflective: 'border-purple-400 bg-purple-500/10',
      inspired: 'border-pink-400 bg-pink-500/10',
      anxious: 'border-orange-400 bg-orange-500/10',
    }
    return colors[mood] || 'border-cyan-400 bg-cyan-500/10'
  }

  return (
    <div className={`backdrop-blur-md border-2 rounded-lg p-4 min-w-[200px] max-w-[300px] shadow-lg ${getMoodColor(data.mood || 'neutral')}`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-cyan-400" />
      <div className="text-cyan-300 font-semibold text-sm mb-2">{data.title}</div>
      <div className="text-gray-300 text-xs line-clamp-3 mb-2">{data.content}</div>
      <div className="flex flex-wrap gap-1 mb-2">
        {data.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-400/30">
            {tag}
          </span>
        ))}
      </div>
      {data.mood && (
        <div className="text-xs text-cyan-400 border-t border-cyan-400/30 pt-2">
          {t('moods.' + data.mood)}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-cyan-400" />
    </div>
  )
}

const nodeTypes = {
  memoryNode: MemoryNodeComponent,
}

const Canvas: React.FC = () => {
  const { nodes: memoryNodes, connections, selectNode } = useAppStore()

  // Convert memory nodes to React Flow nodes
  const initialNodes: Node[] = useMemo(() =>
    memoryNodes.map((node) => ({
      id: node.id,
      type: 'memoryNode',
      position: { x: node.x || Math.random() * 800, y: node.y || Math.random() * 600 },
      data: node,
      draggable: true,
    })), [memoryNodes]
  )

  // Convert connections to React Flow edges
  const initialEdges: Edge[] = useMemo(() =>
    connections.map((conn) => ({
      id: conn.id,
      source: conn.sourceId,
      target: conn.targetId,
      type: 'smoothstep',
      style: {
        stroke: `rgba(0, 255, 255, ${conn.strength})`,
        strokeWidth: Math.max(1, conn.strength * 3),
      },
      animated: true,
    })), [connections]
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    selectNode(node.id)
  }, [selectNode])

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className="bg-transparent"
      >
        <Controls className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden" />
        <MiniMap
          className="bg-black/20 backdrop-blur-md border border-white/20 rounded-lg"
          nodeColor="#00ffff"
          maskColor="rgba(0, 0, 0, 0.2)"
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#ffffff20"
        />
      </ReactFlow>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-pink-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-green-400/60 rounded-full animate-ping delay-500"></div>
      </div>
    </div>
  )
}

export default Canvas