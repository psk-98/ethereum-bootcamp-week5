import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow"
import styles from "@/styles/Home.module.css"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import deploy from "../common/helpers"

export default function ContractForm({ provider }) {
  const [beneficiary, setBeneficiary] = useState()
  const [arbiter, setArbiter] = useState()
  const [value, setValue] = useState()
  const [address, setAddress] = useState("")
  const [isCopy, setCopy] = useState("copy")
  const [test, setTest] = useState()

  async function getAddress() {
    const contract = new ethers.Contract(
      address,
      Escrow.abi,
      provider.getSigner()
    )
    setTest(await contract.beneficiary())
  }

  async function newContract() {
    const escrowContract = await deploy(
      provider.getSigner(),
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" || arbiter,
      "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC" || beneficiary,
      value
      //ethers.BigNumber.from("1000000000000000000")
    )
    console.log(escrowContract.address)
    setAddress(escrowContract.address.toString())
    console.log(await escrowContract.beneficiary())
    getAddress()
    // const escrow = {
    //   address: escrowContract.address,
    //   arbiter,
    //   beneficiary,
    //   value: value.toString(),
    //   handleApprove: async () => {
    //     escrowContract.on("Approved", () => {
    //       document.getElementById(escrowContract.address).className = "complete"
    //       document.getElementById(escrowContract.address).innerText =
    //         "✓ It's been approved!"
    //     })

    //     await approve(escrowContract, signer)
    //   },
    // }

    // setEscrows([...escrows, escrow])
  }

  useEffect(() => {
    // getAddress()
  })

  return (
    <>
      <div className={styles.contractForm}>
        <h1> New Contract </h1>
        {address}
        {console.log(test)}
        {console.log(Escrow.abi)}
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
            type="text"
            placeholder="Deposit Amount (in Eth)"
            onChange={(e) =>
              setValue(ethers?.utils?.parseEther(e.target.value))
            }
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
                navigator.clipboard.write(address)
                setCopy("copied")
              }}
            >
              {isCopy}
            </sup>
          </div>
        </>
      )}
    </>
  )
}
