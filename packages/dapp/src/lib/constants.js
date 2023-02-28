import { BigNumber } from 'ethers';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO =
  'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880';
export const BNB_CURRENCY_LOGO =
  'https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const DEFAULT_BRIDGE_DIRECTION =
  process.env.REACT_APP_DEFAULT_BRIDGE_DIRECTION;

export const DEFAULT_IMAGE_TIMEOUT = process.env.REACT_IMAGE_TIMEOUT || 20000;

export const NON_ETH_CHAIN_IDS = [56, 77, 100];

export const XDAI_CHAIN_IDS = [77, 100];

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
  },
  4: {
    chainId: 4,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Rinkeby Ether',
    symbol: 'RETH',
    mode: 'NATIVE',
  },
  42: {
    chainId: 42,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Kovan Ether',
    symbol: 'KETH',
    mode: 'NATIVE',
  },
  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'BNB',
    mode: 'NATIVE',
  },
  81: {
    chainId: 81,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    name: 'Japan Open Coin',
    address: ADDRESS_ZERO,
    symbol: 'JTH',
    mode: 'NATIVE',
  },
};

export const networkNames = {
  1: 'ETH Mainnet',
  4: 'Rinkeby Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  77: 'Sokol Testnet',
  100: 'xDai Chain',
  99999: 'G.U.Sandbox',
  3: 'Ropsten',
  5: 'Görli',
  81: 'Japan Open Chain',
};

export const networkLabels = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Görli',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  100: 'xDai',
  99999: 'G.U.Sandbox',
  81: 'JOC',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  4: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  42: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  77: {
    name: 'Sokol POA',
    symbol: 'SPOA',
  },
  100: {
    name: 'xDai',
    symbol: 'xDai',
  },
};

const {
  REACT_APP_GUSANBOX_RPC_URL,
  REACT_APP_GOERLI_RPC_URL,
  REACT_APP_JOC_RPC_URL,
  REACT_APP_ETHEREUM_RPC_URL,
} = process.env;

export const chainUrls = {
  99999: {
    rpc: REACT_APP_GUSANBOX_RPC_URL?.split(' '),
    explorer: 'https://sandbox1.japanopenchain.org',
    chainId: 99999,
    name: networkNames[99999],
  },
  5: {
    rpc: REACT_APP_GOERLI_RPC_URL?.split(' '),
    explorer: 'https://goerli.etherscan.io',
    chainId: 5,
    name: networkNames[5],
  },
  81: {
    rpc: REACT_APP_JOC_RPC_URL?.split(' '),
    explorer: 'https://mainnet.japanopenchain.org',
    chainId: 81,
    name: networkNames[81],
  },
  1: {
    rpc: REACT_APP_ETHEREUM_RPC_URL?.split(' '),
    explorer: 'https://etherscan.io',
    chainId: 1,
    name: networkNames[1],
  },
};

export const GRAPH_HEALTH_ENDPOINT =
  'https://api.thegraph.com/index-node/graphql';

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  MAINNET_RPC_URL: 'mainnet-rpc-url',
  RINKEBY_RPC_URL: 'rinkeby-rpc-url',
  XDAI_RPC_URL: 'xdai-rpc-url',
  KOVAN_RPC_URL: 'kovan-rpc-url',
  SOKOL_RPC_URL: 'sokol-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  BRIDGE_DIRECTION: 'bridge-direction',
};
