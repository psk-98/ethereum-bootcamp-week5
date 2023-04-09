import Layout from "@/components/layout/layout"
import "@/styles/globals.css"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function App({ Component, pageProps }) {
  const [provider, setProvider] = useState()

  useEffect(() => {
    try {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <Layout>
      {provider && <Component {...pageProps} provider={provider} />}
    </Layout>
  )
}
