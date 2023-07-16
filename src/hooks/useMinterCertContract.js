import { useContract } from './useContract'
import MyCertificatesAbi from '../contracts/MyNFT.json'
import MyCertificatesContractAddress from '../contracts/MyNFT-address.json';

export const useMinterCertContract = () => useContract(MyCertificatesAbi.abi, MyCertificatesContractAddress.MyNFT)
