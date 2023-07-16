import { useState, useEffect, useCallback } from "react";
import { useContractKit } from "@celo-tools/use-contractkit";

export const useBalance = () => {

  // Get the connected wallet address and Celo kit instance from useContractKit hook
  const { address, kit } = useContractKit();
  
  // Initialize balance state with a default value of 0
  const [balance, setBalance] = useState(0);

  // Define the getBalance function using useCallback to memoize the function
  const getBalance = useCallback(async () => {
    // Fetch the total token balance of the connected wallet
    const value = await kit.getTotalBalance(address);
    setBalance(value);
  }, [address, kit]);
  
  // Call the getBalance function whenever the address or getBalance function changes
  useEffect(() => {
    if (address) getBalance();
  }, [address, getBalance]);

  // Return an object with the current balance and the getBalance function
  return {
    balance,
    getBalance,
  };
};
