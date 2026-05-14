import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store'
import { motion } from 'framer-motion'

export default function Header() {
  const { t } = useTranslation()
  const { visualMode, setVisualMode, setSettingsOpen, setCommandPaletteOpen, createNode } = useAppStore()

  const handleNewMemory = () => {
    const title = prompt(t('node.title'))
    if (title) {
      const content = prompt(t('node.content'))
      if (content) {
        createNode(title, content)
      }
    }
  }

  const modes = [
    { id: 'canvas', icon: '◉', label: t('nav.canvas') },
    { id: 'timeline', icon: '─', label: t('nav.timeline') },
    { id: 'clusters', icon: '◈', label: t('nav.clusters') },
  ] as const

  return (
    <motion.header 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full h-16 flex items-center justify-between px-6 glass shrink-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="text-lg font-heading font-bold text-background">E</span>
        </div>
        <div>
          <h1 className="text-lg font-heading font-medium text-text-primary">{t('app.title')}</h1>
          <p className="text-xs text-text-muted">{t('app.subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
        {modes.map(mode => (
          <button
            key={mode.id}
            onClick={() => setVisualMode(mode.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-body transition-all duration-200 ${
              visualMode === mode.id
                ? 'bg-primary/20 text-primary neon-text'
                : 'text-text-secondary hover:text-text-primary hover:bg-glass'
            }`}
          >
            <span className="mr-1.5">{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleNewMemory}
          className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-primary text-sm font-body hover:bg-primary/30 transition-colors neon-text"
        >
          <span className="mr-2">+</span>
          {t('actions.newNode')}
        </button>
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-surface border border-glass-border text-text-secondary text-sm font-body hover:border-primary/30 transition-colors"
        >
          <span className="mr-2">⌘K</span>
          {t('actions.search')}
        </button>
        
        <button
          onClick={() => setSettingsOpen(true)}
          className="w-8 h-8 rounded-lg bg-surface border border-glass-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-primary/30 transition-colors"
        >
          ⚙
        </button>
      </div>
    </motion.header>
  )
}