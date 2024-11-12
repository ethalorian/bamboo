'use client'

import { Web3Provider } from './contexts/Web3Context'
import { useWeb3 } from './contexts/Web3Context'
import StoryCreator from './components/StoryCreator'

function ConnectButton() {
  const { account, connect, disconnect, isConnecting } = useWeb3()

  return (
    <button 
      onClick={account ? disconnect : connect}
      disabled={isConnecting}
      className="bg-primary text-primary-foreground hover:bg-primary/90 
        px-4 py-2 rounded-md text-sm font-medium 
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isConnecting 
        ? 'Connecting...' 
        : account 
          ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` 
          : 'Connect Universal Profile'
      }
    </button>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-card rounded-lg shadow-sm border">
          <Web3Provider>
            <StoryCreator />
          </Web3Provider>
        </div>
      </div>
    </main>
  )
}