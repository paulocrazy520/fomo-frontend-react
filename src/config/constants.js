import { PublicKey } from "@solana/web3.js";

/** GLOBAL CONSTANT */

export const Networks = {
  MAINNET: 101,
  DEVNET: 102,
};
export const DEFAULT_NETWORK = Networks.MAINNET;
// export const DEFAULT_NETWORK = Networks.DEVNET;
export const IS_MAINNET = DEFAULT_NETWORK == Networks.MAINNET;
export const NETWORK = IS_MAINNET ? "mainnet-beta" : "devnet";
// export const MAINNET_RPC = "https://api.metaplex.solana.com";
// rpc: "https://api.metaplex.solana.com", "https://api.mainnet-beta.solana.com", "https://solana-api.projectserum.com"
export const MAINNET_RPC = "https://api.metaplex.solana.com";

export const SECONDS_PER_DAY = 24 * 60 * 60;
