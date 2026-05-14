import React from 'react'
import { useAppStore } from '../store'

const Onboarding: React.FC = () => {
  const { setOnboardingOpen, updateSettings } = useAppStore()

  const handleComplete = () => {
    updateSettings({ onboardingCompleted: true })
    setOnboardingOpen(false)
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg max-w-lg w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to EchoFrame!</h2>
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">What is EchoFrame?</h3>
            <p className="text-text-secondary">
              EchoFrame is your personal knowledge management system. Create nodes of information,
              connect them, and organize them into clusters.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Getting Started</h3>
            <ul className="list-disc list-inside text-text-secondary space-y-1">
              <li>Use the Canvas view to see all your nodes</li>
              <li>Switch to Timeline to see chronological order</li>
              <li>Clusters help organize related information</li>
              <li>Use Cmd/Ctrl+K to open the command palette</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleComplete}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding