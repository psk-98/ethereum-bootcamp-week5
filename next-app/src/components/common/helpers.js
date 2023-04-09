import Escrow from "@/artifacts/contracts/Escrow.sol/Escrow"
import { ethers } from "ethers"

export default async function deploy(signer, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  )
  return factory.deploy(arbiter, beneficiary, { value })
}

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve()
  await approveTxn.wait()
}

provider = new ethers.providers.AlchemyProvider(
  "goerli",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
)
