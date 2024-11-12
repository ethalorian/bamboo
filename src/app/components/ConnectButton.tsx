'use client'

import { createContext, useContext, useState } from 'react'
import { web3Onboard } from '../config/web3'
import { LSPFactory } from '@lukso/lsp-factory.js'

interface Web3ContextType {
  account: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  universalProfile: any | null
  isConnecting: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [universalProfile, setUniversalProfile] = useState<any | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connect = async () => {
    try {
      setIsConnecting(true)
      const wallets = await web3Onboard.connectWallet()
      
      if (wallets[0]) {
        const connectedWallet = wallets[0]
        setAccount(connectedWallet.accounts[0].address)
        
        // Initialize Universal Profile
        const provider = await connectedWallet.provider
        const lspFactory = new LSPFactory(provider, {
          chainId: 42
        })
        
        const up = await lspFactory.UniversalProfile.get(connectedWallet.accounts[0].address)
        setUniversalProfile(up)
      }
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = async () => {
    const [primaryWallet] = web3Onboard.state.get().wallets
    if (primaryWallet) {
      await web3Onboard.disconnectWallet({ label: primaryWallet.label })
      setAccount(null)
      setUniversalProfile(null)
    }
  }

  return (
    <Web3Context.Provider value={{
      account,
      connect,
      disconnect,
      universalProfile,
      isConnecting
    }}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}