import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow"
import styles from "@/styles/Status.module.css"
import { ethers } from "ethers"
import { useState } from "react"

export default function Status({ provider }) {
  const [address, setAddress] = useState()
  const [beneficiary, setBeneficiary] = useState()
  const [arbiter, setArbiter] = useState()
  const [depositor, setDepositor] = useState()
  const [value, setValue] = useState()
  const [isSuccess, setSuccess] = useState(false)
  const [isError, setError] = useState(false)
  const [isCopy, setCopy] = useState(["copy", "copy", "copy"])
  const [isApproved, setApproved] = useState(false)

  async function approve() {
    try {
      const contract = new ethers.Contract(
        address,
        Escrow.abi,
        provider.getSigner()
      )
      const approveTxn = await contract.approve()
      await approveTxn.wait()
      setApproved(true)
    } catch (e) {
      setApproved(false)
    }
  }

  const getContractDetails = async () => {
    try {
      const contract = new ethers.Contract(
        address,
        Escrow.abi,
        provider.getSigner()
      )
      setApproved(await contract.isApproved())
      console.log(contract)
      setArbiter(await contract.arbiter())
      setBeneficiary(await contract.beneficiary())
      setDepositor(await contract.depositor())
      setValue(await provider.getBalance(address))
      setSuccess(true)
      setError(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <>
      {console.log(value?._hex)}
      {console.log(depositor)}
      {console.log(arbiter)}
      {console.log(beneficiary)}
      <div className={styles.contractAddressInput}>
        <form onSubmit={() => getBalance()}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Enter a contract address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={styles.btnGroup} onClick={() => getContractDetails()}>
            <svg
              width={29}
              height={29}
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.2021 28.2021C27.9493 28.4551 27.6491 28.6557 27.3188 28.7926C26.9884 28.9295 26.6343 29 26.2766 29C25.919 29 25.5649 28.9295 25.2345 28.7926C24.9041 28.6557 24.604 28.4551 24.3512 28.2021L19.5452 23.3962C17.568 24.6616 15.2313 25.4188 12.7094 25.4188C5.69017 25.4188 0 19.7286 0 12.7094C0 5.69017 5.69017 0 12.7094 0C19.7286 0 25.4188 5.69017 25.4188 12.7094C25.4188 15.2313 24.6616 17.568 23.3962 19.5452L28.2021 24.3512C28.4551 24.604 28.6557 24.9041 28.7926 25.2345C28.9295 25.5649 29 25.919 29 26.2766C29 26.6343 28.9295 26.9884 28.7926 27.3188C28.6557 27.6491 28.4551 27.9493 28.2021 28.2021ZM12.7094 3.63125C7.69644 3.63125 3.63125 7.69462 3.63125 12.7094C3.63125 17.7241 7.69644 21.7875 12.7094 21.7875C17.7241 21.7875 21.7875 17.7241 21.7875 12.7094C21.7875 7.69462 17.7241 3.63125 12.7094 3.63125Z"
                fill="white"
              />
            </svg>
          </div>
        </form>
      </div>
      <div className={styles.existingContract}>
        {isSuccess && !isError ? (
          <div className={styles.wrapper}>
            <div className={styles.contractDetail}>
              Arbiter:{" "}
              <a
                href={`https://ethereum-bootcamp.netlify.app/wallet/${arbiter}`}
              >
                {`${arbiter.slice(0, 10)}...${arbiter.slice(-10)}`}
              </a>{" "}
              <sup
                onClick={() => {
                  navigator.clipboard.writeText(arbiter.toString())
                  setCopy(["copied", "copy", "copy"])
                }}
              >
                {isCopy[0]}
              </sup>
            </div>
            <div className={styles.contractDetail}>
              Beneficiary:{" "}
              <a
                href={`https://ethereum-bootcamp.netlify.app/wallet/${beneficiary}`}
              >
                {`${beneficiary.slice(0, 10)}...${beneficiary.slice(-10)}`}
              </a>
              <sup
                onClick={() => {
                  navigator.clipboard.writeText(arbiter.toString())
                  setCopy(["copy", "copied", "copy"])
                }}
              >
                {isCopy[1]}
              </sup>
            </div>
            <div className={styles.contractDetail}>
              Depositor:{" "}
              <a
                href={`https://ethereum-bootcamp.netlify.app/wallet/${depositor}`}
              >
                {`${depositor.slice(0, 10)}...${depositor.slice(-10)}`}
              </a>
              <sup
                onClick={() => {
                  navigator.clipboard.writeText(arbiter.toString())
                  setCopy(["copy", "copy", "copied"])
                }}
              >
                {isCopy[2]}
              </sup>
            </div>
            <div className={styles.contractDetail}>
              Value: {value && ethers.utils.formatEther(value?._hex)}ETH{" "}
            </div>
            <div
              className={styles.subBtn}
              onClick={() => {
                !isApproved && approve()
              }}
            >
              <div>{isApproved ? "Approved ✓" : "Approve"}</div>
            </div>
          </div>
        ) : !isSuccess && isError ? (
          <div className={styles.error}>
            {
              "Whoops! Looks like something went wrong, contract probably doesn't exist."
            }
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
