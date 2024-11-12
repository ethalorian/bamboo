import injectedModule from '@web3-onboard/injected-wallets'
import { init } from '@web3-onboard/react'

const LUKSO_RPC_URL = 'https://rpc.lukso.gateway.fm'

const injected = injectedModule()

export const web3Onboard = init({
  wallets: [injected],
  chains: [
    {
      id: '42',
      token: 'LYX',
      label: 'LUKSO Mainnet',
      rpcUrl: LUKSO_RPC_URL
    }
  ],
  appMetadata: {
    name: 'Your App Name',
    icon: '<your-icon-url>',
    description: 'Your app description'
  }
})