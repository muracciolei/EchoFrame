import { useEffect } from 'react'
import { useAppStore } from './store'
import Header from './components/Header'
import Canvas from './components/Canvas'
import Timeline from './components/Timeline'
import Clusters from './components/Clusters'
import NodeDetail from './components/NodeDetail'
import CommandPalette from './components/CommandPalette'
import Settings from './components/Settings'
import Onboarding from './components/Onboarding'
import FloatingParticles from './components/FloatingParticles'
import Sidebar from './components/Sidebar'

function App() {
  const { 
    initialize, 
    isLoading, 
    settings, 
    visualMode, 
    selectedNodeId,
    isCommandPaletteOpen,
    isSettingsOpen,
    isOnboardingOpen,
    setCommandPaletteOpen,
  } = useAppStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setCommandPaletteOpen])

  if (isLoading || !settings) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-text-secondary font-body">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex flex-col relative overflow-hidden bg-background">
      <FloatingParticles />
      
      <Header />
      
      <main className="flex-1 relative">
        {visualMode === 'canvas' && <Canvas />}
        {visualMode === 'timeline' && <Timeline />}
        {visualMode === 'clusters' && <Clusters />}
      </main>

      <Sidebar />

      {selectedNodeId && <NodeDetail />}

      {isCommandPaletteOpen && <CommandPalette />}
      
      {isSettingsOpen && <Settings />}
      
      {isOnboardingOpen && !settings.onboardingCompleted && <Onboarding />}
    </div>
  )
}

export default App