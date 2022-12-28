import {
  chainUrls,
  LOCAL_STORAGE_KEYS,
  nativeCurrencies,
  networkCurrencies,
  networkLabels,
  networkNames,
  XDAI_CHAIN_IDS,
} from 'lib/constants';

export const getWalletProviderName = provider =>
  provider?.connection?.url || null;

export const getNativeCurrency = chainId => nativeCurrencies[chainId || 99999];

export const getNetworkName = chainId =>
  networkNames[chainId] || 'Unknown Network';

export const getNetworkLabel = chainId => networkLabels[chainId] || 'Unknown';

export const getNetworkCurrency = chainId =>
  networkCurrencies[chainId] || { name: 'Unknown', symbol: 'Unknown' };

export const getRPCUrl = (chainId, returnAsArray = false) =>
  returnAsArray
    ? chainUrls[chainId || 99999].rpc
    : chainUrls[chainId || 99999].rpc[0];

export const getExplorerUrl = chainId =>
  (chainUrls[chainId] || chainUrls[99999]).explorer;

export const fetchQueryParams = search => {
  if (!search || !search.trim().length) return null;
  return search
    .replace('?', '')
    .split(/&/g)
    .reduce((acc, keyValuePair) => {
      const [key, value] = keyValuePair.split('=');
      acc[key] = value;
      return acc;
    }, {});
};

export const logError = (...args) => {
  // eslint-disable-next-line no-console
  console.error(...args);
};

export const logDebug = (...args) => {
  if (process.env.REACT_APP_DEBUG_LOGS === 'true') {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

const { XDAI_RPC_URL, MAINNET_RPC_URL } = LOCAL_STORAGE_KEYS;

export const getRPCKeys = bridgeDirection => {
  switch (bridgeDirection) {
    default:
      return {
        homeRPCKey: XDAI_RPC_URL,
        foreignRPCKey: MAINNET_RPC_URL,
      };
  }
};

const IMPOSSIBLE_ERROR =
  'Unable to perform the operation. Reload the application and try again.';

const TRANSACTION_REPLACED_ERROR =
  'Transaction was replaced by another. Reload the application and find the transaction in the history page.';

export const handleWalletError = (error, showError) => {
  if (error?.message && error?.message.length <= 120) {
    showError(error.message);
  } else if (
    error?.message &&
    error?.message.toLowerCase().includes('transaction was replaced')
  ) {
    showError(TRANSACTION_REPLACED_ERROR);
  } else {
    showError(IMPOSSIBLE_ERROR);
  }
};

export const getTokenUrl = (chainId, address, tokenId) =>
  XDAI_CHAIN_IDS.includes(chainId)
    ? `${getExplorerUrl(
        chainId,
      )}/tokens/${address}/instance/${tokenId}/token-transfers`
    : `${getExplorerUrl(chainId)}/token/${address}?a=${tokenId}`;
