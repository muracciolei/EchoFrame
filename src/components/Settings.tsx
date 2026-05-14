import React from 'react'
import { useAppStore } from '../store'
import { useTranslation } from 'react-i18next'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const { setSettingsOpen, settings, updateSettings, setLanguage, exportData, importData, clearAllData } = useAppStore()

  if (!settings) return null

  const handleExport = async () => {
    try {
      const data = await exportData()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `echoframe-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        await importData(data)
        window.location.reload() // Reload to refresh the data
      } catch (error) {
        console.error('Import failed:', error)
      }
    }
    reader.readAsText(file)
  }

  const handleClearData = async () => {
    if (confirm(t('messages.confirmDelete'))) {
      await clearAllData()
      window.location.reload()
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black/20 backdrop-blur-md border border-white/20 p-6 rounded-lg max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-cyan-300">{t('settings.title')}</h2>
          <button
            onClick={() => setSettingsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">{t('settings.language')}</label>
            <select
              value={settings.language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-white/20 rounded bg-black/20 text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="animations"
              checked={settings.animationsEnabled}
              onChange={(e) => updateSettings({ animationsEnabled: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="animations" className="text-sm text-gray-300">{t('settings.animations')}</label>
          </div>

          <div className="border-t border-white/20 pt-4 space-y-2">
            <button
              onClick={handleExport}
              className="w-full text-left p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded border border-cyan-400/30 text-cyan-300"
            >
              {t('settings.exportData')}
            </button>
            <label className="w-full text-left p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded border border-purple-400/30 text-purple-300 cursor-pointer block">
              {t('settings.importData')}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleClearData}
              className="w-full text-left p-2 bg-red-500/20 hover:bg-red-500/30 rounded border border-red-400/30 text-red-300"
            >
              {t('settings.clearData')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings