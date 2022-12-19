export const ETH_XDAI_BRIDGE = 'eth-xdai';
export const RINKEBY_XDAI_BRIDGE = 'rinkeby-xdai';
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol';
export const GUSANDBOX_ROPSTEN_BRIDGE = 'gusandbox-ropsten';
export const GUSANDBOX_RINKEBY_BRIDGE = 'gusandbox-rinkeby';
export const GUSANDBOX_GOERLI_BRIDGE = 'gusandbox-goerli';

const ETH_XDAI_BRIDGE_CONFIG = {
  label: 'eth⥊xdai',
  homeChainId: 100,
  foreignChainId: 1,
  foreignMediatorAddress:
    '0x6C8d0AFDDBD29a0954feEB73904923fC8f73C480'.toLowerCase(),
  homeMediatorAddress:
    '0x80199C8D04Af4c5cEB532adF4463b18BB4B59ffC'.toLowerCase(),
  foreignAmbAddress: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e'.toLowerCase(),
  homeAmbAddress: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59'.toLowerCase(),
  ambLiveMonitorPrefix: 'https://alm-xdai.herokuapp.com',
  foreignBridgeSubgraph: 'dan13ram/mainnet-xdai-omnibridge-nft',
  homeBridgeSubgraph: 'dan13ram/xdai-mainnet-omnibridge-nft',
  home721Subgraph: 'sunguru98/erc721-xdai-subgraph',
  foreign721Subgraph: 'wighawag/eip721-subgraph',
  home1155Subgraph: 'sunguru98/erc1155-xdai-subgraph',
  foreign1155Subgraph: 'alexvorobiov/eip1155subgraph',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const RINKEBY_XDAI_BRIDGE_CONFIG = {
  label: 'rinkeby⥊xdai',
  homeChainId: 100,
  foreignChainId: 4,
  foreignMediatorAddress:
    '0xEc05e3f4D845f0E39e33146395aCE5D35c01Fcc0'.toLowerCase(),
  homeMediatorAddress:
    '0x2c0bF58cC87763783e35a625ff6a3e50d9E05337'.toLowerCase(),
  foreignAmbAddress: '0xD4075FB57fCf038bFc702c915Ef9592534bED5c1'.toLowerCase(),
  homeAmbAddress: '0xc38D4991c951fE8BCE1a12bEef2046eF36b0FA4A'.toLowerCase(),
  ambLiveMonitorPrefix: 'https://alm-rinkeby.herokuapp.com',
  foreignBridgeSubgraph: 'dan13ram/rinkeby-xdai-omnibridge-nft',
  homeBridgeSubgraph: 'dan13ram/xdai-rinkeby-omnibridge-nft',
  home721Subgraph: 'sunguru98/erc721-xdai-subgraph',
  foreign721Subgraph: 'daisai3/eip721_rinkeby',
  home1155Subgraph: 'sunguru98/erc1155-xdai-subgraph',
  foreign1155Subgraph: 'sunguru98/erc1155-rinkeby-subgraph',
  claimDisabled: true,
  tokensClaimDisabled: [],
};

const KOVAN_SOKOL_BRIDGE_CONFIG = {
  label: 'kovan⥊sokol',
  homeChainId: 77,
  foreignChainId: 42,
  foreignMediatorAddress:
    '0x63be59CF177cA9bb317DE8C4aa965Ddda93CB9d7'.toLowerCase(),
  homeMediatorAddress:
    '0x3ecEe2667f80fc0858437119621b820efc6b0Ede'.toLowerCase(),
  foreignAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  homeAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  ambLiveMonitorPrefix: 'https://alm-test-amb.herokuapp.com',
  foreignBridgeSubgraph: 'dan13ram/kovan-sokol-omnibridge-nft',
  homeBridgeSubgraph: 'dan13ram/sokol-kovan-omnibridge-nft',
  home721Subgraph: 'dan13ram/erc721-sokol-subgraph',
  foreign721Subgraph: 'sunguru98/erc721-kovan-subgraph',
  home1155Subgraph: 'sunguru98/erc1155-sokol-subgraph',
  foreign1155Subgraph: 'sunguru98/erc1155-kovan-subgraph',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const GUSANDBOX_ROPSTEN_BRIDGE_CONFIG = {
  label: 'gusandbox⥊ropsten',
  homeChainId: 99999,
  foreignChainId: 3,
  foreignMediatorAddress:
    '0xeCfB0BBA39dB555E566119919795f80aCD3f735f'.toLowerCase(),
  homeMediatorAddress:
    '0x29AEF4bb7fA5d1DC680BF88bB44f5b7821380FB6'.toLowerCase(),
  foreignAmbAddress: '0xF1b5cc67c911F67cCC4021C22241AC7c21CB43C8'.toLowerCase(),
  homeAmbAddress: '0x55af7F974F6B294034000Bb46c6359C5c605B62A'.toLowerCase(),
  ambLiveMonitorPrefix:
    'https://alm-gusandbox-ropsten-dot-gu-bridge.an.r.appspot.com',
  foreignBridgeSubgraph: 'cuonghx-gutech/ropsten-token-bridge-nft',
  homeBridgeSubgraph: 'gulaps/gusandbox-to-ropsten-omnibridge-nft',
  home721Subgraph: 'gulaps/erc721-subgraph',
  foreign721Subgraph: 'cuonghx-gutech/erc721-ropsten',
  home1155Subgraph: 'gulabs/erc1155-subgraph',
  foreign1155Subgraph: 'cuonghx-gutech/erc1155-ropsten',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const GUSANDBOX_RINKEBY_BRIDGE_CONFIG = {
  label: 'gusandbox⥊rinkeby',
  homeChainId: 99999,
  foreignChainId: 4,
  foreignMediatorAddress:
    '0x1b00fE8CcEfEBad636E01Fd142F7c923F8C36e42'.toLowerCase(),
  homeMediatorAddress:
    '0x26159b2372E9cCFc454365f1BB3444d949e04a1a'.toLowerCase(),
  foreignAmbAddress: '0x0F806D8dd8bb02Ad9dd9bA0e8e351B4319cc45e4'.toLowerCase(),
  homeAmbAddress: '0xDf1949Fd97c3d484D39269cCd11082d0Ac1f9440'.toLowerCase(),
  ambLiveMonitorPrefix:
    ' https://alm-gusandbox-rinkeby-dot-gu-bridge.an.r.appspot.com',
  foreignBridgeSubgraph: 'cuonghx-gutech/rinkeby-token-bridge-nft',
  homeBridgeSubgraph: 'gulaps/gusandbox-to-rinkeby-omnibridge-nft',
  home721Subgraph: 'gulaps/erc721-subgraph',
  foreign721Subgraph: 'daisai3/eip721_rinkeby',
  home1155Subgraph: 'gulabs/erc1155-subgraph',
  foreign1155Subgraph: 'sunguru98/erc1155-rinkeby-subgraph',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const GUSANDBOX_GOERLI_BRIDGE_CONFIG = {
  label: 'G.U.Sandbox⥊Görli',
  homeChainId: 99999,
  foreignChainId: 5,
  foreignMediatorAddress:
    '0xA7191470eB4B00076cBFace306bC23523b48172A'.toLowerCase(),
  homeMediatorAddress:
    '0xab508f88242bB982F7Ab6cEc240ffa2aeA6a0412'.toLowerCase(),
  foreignAmbAddress: '0xED91CB7A4e839E40584377B1c5204A87D762ddD3'.toLowerCase(),
  homeAmbAddress: '0x19d7C1D1D8d0d8b3eCed309704Ab5c061a02A7a4'.toLowerCase(),
  ambLiveMonitorPrefix: 'https://alm.test.nft-bridge.gu.net',
  foreignBridgeSubgraph: 'cuonghx1108/goerli-sandbox-nft-test-env',
  homeBridgeSubgraph: 'cuonghx1108/sandbox-goerli-nft-test-env',
  home721Subgraph: 'cuonghx/gu-bridge-eip721-test',
  foreign721Subgraph: 'cuonghx1108/gu-bridge-eip721-test',
  home1155Subgraph: 'gulabs/erc1155-subgraph',
  foreign1155Subgraph: 'cuonghx1108/eip1155-goerli',
  claimDisabled: false,
  tokensClaimDisabled: [],
  tokenFactoryAddress: '0xe2aA208D0147199C0cCB274d18A3166F4963eC50',
};

const ENABLED_BRIDGES = process.env.REACT_APP_ENABLED_BRIDGES.split(' ').map(
  b => b.toLowerCase(),
);

const bridgeInfo = {
  [ETH_XDAI_BRIDGE]: ETH_XDAI_BRIDGE_CONFIG,
  [RINKEBY_XDAI_BRIDGE]: RINKEBY_XDAI_BRIDGE_CONFIG,
  [KOVAN_SOKOL_BRIDGE]: KOVAN_SOKOL_BRIDGE_CONFIG,
  [GUSANDBOX_ROPSTEN_BRIDGE]: GUSANDBOX_ROPSTEN_BRIDGE_CONFIG,
  [GUSANDBOX_RINKEBY_BRIDGE]: GUSANDBOX_RINKEBY_BRIDGE_CONFIG,
  [GUSANDBOX_GOERLI_BRIDGE]: GUSANDBOX_GOERLI_BRIDGE_CONFIG,
};

const getNetworkConfig = bridges => {
  if (bridges && bridges.length > 0 && bridgeInfo) {
    return bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {});
  }
  return bridgeInfo;
};

export const networks = getNetworkConfig(ENABLED_BRIDGES);
