"use client"

import { SessionProvider } from "next-auth/react"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'

// Import the styles for the wallet modal
import '@/app/walletButton.css'

export function Providers({ children }:{
    children : React.ReactNode
}){
    // You can use Mainnet, Testnet, or Devnet
    const network = WalletAdapterNetwork.Devnet;
    
    // You can also provide a custom RPC endpoint
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        [network]
    );

    return(
        <SessionProvider>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </SessionProvider>
    )
}