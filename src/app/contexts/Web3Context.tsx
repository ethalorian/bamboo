'use client'

import { createContext, useContext, useState } from 'react'
import { web3Onboard } from '../config/web3'
import { ethers } from 'ethers'
import { LSP0ERC725Account, ERC725 } from '@lukso/lsp-smart-contracts'

interface Web3ContextType {
  account: string | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  universalProfile: LSP0ERC725Account | null
  isConnecting: boolean
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [universalProfile, setUniversalProfile] = useState<any | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const initializeUniversalProfile = async (address: string, provider: any): Promise<LSP0ERC725Account | null> => {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(provider)
      const signer = ethersProvider.getSigner()
      
      // Initialize UniversalProfile contract instance
      const upContract = new LSP0ERC725Account(
        address,
        signer as any
      )

      return upContract
    } catch (error) {
      console.error('UP initialization error:', error)
      return null
    }
  }

  const connect = async () => {
    try {
      setIsConnecting(true)
      const wallets = await web3Onboard.connectWallet()
      
      if (wallets[0]) {
        const connectedWallet = wallets[0]
        const address = connectedWallet.accounts[0].address
        setAccount(address)
        
        // Initialize Universal Profile without IPFS dependency
        const up = await initializeUniversalProfile(address, connectedWallet.provider)
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