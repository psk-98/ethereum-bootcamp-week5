import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow"
import styles from "@/styles/Home.module.css"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function ContractStatus({ provider }) {
  const [address, setAddress] = useState()
  const [beneficiary, setBeneficiary] = useState()
  const [arbiter, setArbiter] = useState()
  const [depositor, setDepositor] = useState()
  const [value, setValue] = useState()

  const getContractDetails = async () => {
    const contract = new ethers.Contract(
      address,
      Escrow.abi,
      provider.getSigner()
    )
    setArbiter(await contract.arbiter())
    setBeneficiary(await contract.beneficiary())
    setDepositor(await contract.depositor())
    setValue(await provider.getBalance(address))
  }

  useEffect(() => {}, [])

  return (
    <>
      {console.log(value?._hex)}
      {console.log(depositor)}
      {console.log(arbiter)}
      {console.log(beneficiary)}
      <div className={styles.contractAddressInput}>
        <input
          type="text"
          onChange={(e) => {
            setAddress(e.target.value)
          }}
        />
      </div>
      <div className={styles.existingContract}>
        <div className={styles.contractDetail}>
          <div>Arbiter: {arbiter}</div>
        </div>
        <div className={styles.contractDetail}>
          <div> Beneficiary: {beneficiary} </div>
        </div>
        <div className={styles.contractDetail}>
          <div> Depositor: {depositor} </div>
        </div>
        <div className={styles.contractDetail}>
          <div>Value: {value && ethers.utils.formatEther(value?._hex)}ETH </div>
        </div>
        <div
          className={styles.subBtn}
          onClick={() => {
            // handleApprove()
            getContractDetails(value)
          }}
        >
          Approve
        </div>
      </div>
    </>
  )
}
