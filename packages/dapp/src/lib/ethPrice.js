import { logDebug, logError } from 'lib/helpers';

import i18n from '../i18n';

const ethPriceFromApi = async fetchFn => {
  try {
    const response = await fetchFn();
    const json = await response.json();
    const oracleEthPrice = json.ethereum.usd;

    if (!oracleEthPrice) {
      logError(i18n.t('response_from_oracle_did_not_include_eth_price'));
      return null;
    }

    logDebug(i18n.t('updated_eth_price'), { oracleEthPrice });

    return oracleEthPrice;
  } catch (e) {
    logError(`${i18n.t('eth_price_api_is_not_available')} ${e.message}`);
  }
  return null;
};

const { REACT_APP_ETH_PRICE_API_URL, REACT_APP_ETH_PRICE_UPDATE_INTERVAL } =
  process.env;

const DEFAULT_ETH_PRICE_API_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD';
const DEFAULT_ETH_PRICE_UPDATE_INTERVAL = 60000;

class EthPriceStore {
  ethPrice = null;

  ethPriceApiUrl = null;

  updateInterval = null;

  constructor() {
    this.ethPriceApiUrl =
      REACT_APP_ETH_PRICE_API_URL || DEFAULT_ETH_PRICE_API_URL;
    this.updateInterval =
      REACT_APP_ETH_PRICE_UPDATE_INTERVAL || DEFAULT_ETH_PRICE_UPDATE_INTERVAL;
    this.updateGasPrice();
  }

  async updateGasPrice() {
    const fetchFn = () => fetch(this.ethPriceApiUrl);
    this.ethPrice = await ethPriceFromApi(fetchFn);
    setTimeout(() => this.updateGasPrice(), this.updateInterval);
  }

  ethPriceInUSD() {
    return this.ethPrice;
  }
}

const ethPriceStore = new EthPriceStore();

export const getEthereumPrice = () => ethPriceStore.ethPriceInUSD();
