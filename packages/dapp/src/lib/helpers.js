import {
  chainUrls,
  LOCAL_STORAGE_KEYS,
  nativeCurrencies,
  networkCurrencies,
  networkLabels,
  networkNames,
  XDAI_CHAIN_IDS,
} from 'lib/constants';

import i18n from '../i18n';

export const getWalletProviderName = provider =>
  provider?.connection?.url || null;

export const getNativeCurrency = chainId => nativeCurrencies[chainId || 99999];

export const getNetworkName = chainId =>
  networkNames[chainId] || i18n.t('unknown_network');

export const getNetworkLabel = chainId =>
  networkLabels[chainId] || i18n.t('unknown');

export const getNetworkCurrency = chainId =>
  networkCurrencies[chainId] || {
    name: i18n.t('unknown'),
    symbol: i18n.t('unknown'),
  };

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

const IMPOSSIBLE_ERROR = i18n.t(
  'unable_to_perform_the_operation_reload_the_application_and_try_again',
);

const TRANSACTION_REPLACED_ERROR = i18n.t(
  'transaction_was_replaced_by_another_reload_the_application_and_find_the_transaction_in_the_history_page',
);

export const handleWalletError = (error, showError) => {
  if (error?.message && error?.message.length <= 120) {
    showError(error.message);
  } else if (
    error?.message &&
    error?.message.toLowerCase().includes(i18n.t('transaction_was_replaced'))
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
