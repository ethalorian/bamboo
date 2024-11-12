'use client'

import { Button } from '@/components/ui/button'
import { useWeb3 } from '../contexts/Web3Context'

interface ConnectButtonProps {
  className?: string
}

export default function ConnectButton({ className }: ConnectButtonProps) {
  const { account, connect, disconnect, isConnecting } = useWeb3()

  return (
    <Button
      onClick={account ? disconnect : connect}
      className={className}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : account ? 'Disconnect' : 'Connect Wallet'}
    </Button>
  )
}