import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MeshProvider } from "@meshsdk/react";
import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from '@/app/components/ClientOnly';
import Modal from '@/app/components/modals/Modal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import Head from 'next/head';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Head>
        <title>Marketplace DTT</title>
        <meta name="description" content="Marketplace DTT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <ClientOnly>
        <ToasterProvider />
        <Navbar />
      </ClientOnly>
      <div className="pb-20 pt-28">
        <Component {...pageProps} />
      </div>
    </MeshProvider>
 )
}
