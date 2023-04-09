import { Inter } from "next/font/google"
import Head from "next/head"
import { useEffect, useState } from "react"
import Footer from "./footer"
import Nav from "./nav"

const inter = Inter({
  subsets: ["latin"],
})

const Layout = ({ children }) => {
  const [isWallet, setWallet] = useState(false)

  useEffect(() => {
    window.ethereum && setWallet(true)
  }, [])
  return (
    <>
      <Head>
        <title>Escrow Dapp</title>
        <meta name="description" content="Escrow dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={inter.className}>
        <Nav />
        <div className="container">
          {isWallet ? (
            children
          ) : (
            <div className="error">
              You need to install a browser wallet to use the escrow dapp
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  )
}
export default Layout
