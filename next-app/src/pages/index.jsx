import deploy from "@/components/common/helpers"
import styles from "@/styles/Home.module.css"
import { ethers } from "ethers"
import { useState } from "react"

export default function Home({ provider }) {
  const [beneficiary, setBeneficiary] = useState()
  const [arbiter, setArbiter] = useState()
  const [value, setValue] = useState()
  const [address, setAddress] = useState("")
  const [isCopy, setCopy] = useState("copy")
  const [isError, setError] = useState()

  async function newContract() {
    try {
      const escrowContract = await deploy(
        provider.getSigner(),
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" || arbiter,
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" || beneficiary,
        value
      )
      console.log(escrowContract.address)
      setAddress(escrowContract.address.toString())
      console.log(await escrowContract.beneficiary())
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }

  return (
    <>
      <div className={styles.contractForm}>
        <h1> New Contract </h1>
        {address}
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Arbiter Address"
            onChange={(e) => setArbiter(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Beneficiary Address"
            onChange={(e) => setBeneficiary(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="Deposit Amount (in Eth)"
            onChange={(e) => {
              try {
                setValue(ethers.utils.parseEther(e.target.value))
              } catch (e) {
                console.error
              }
            }}
          />
        </div>

        {
          <div
            className={styles.subBtn}
            id="deploy"
            onClick={(e) => {
              e.preventDefault()

              newContract()
            }}
          >
            {address.length > 0 ? "Deployed ✓" : "Deploy"}
          </div>
        }
      </div>
      {address.length > 0 && (
        <>
          <div className={styles.header}>Contract address</div>
          <div className={styles.address}>
            {address}
            <sup
              onClick={() => {
                navigator.clipboard.writeText(address.toString())
                setCopy("copied")
              }}
            >
              {isCopy}
            </sup>
          </div>
        </>
      )}
      {isError && (
        <div className={styles.error}>
          Whoops! Looks like something went wrong, did you connect your wallet?
        </div>
      )}
    </>
  )
}
