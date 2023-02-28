import { Image } from '@chakra-ui/react';
import BSCLogo from 'assets/bsc-logo.png';
import EthLogo from 'assets/eth-logo.png';
import EthLogoOrange from 'assets/eth-logo-orage.svg';
import GUSandboxLogo from 'assets/gusandbox-logo.svg';
import jocLogo from 'assets/joc-logo.svg';
import xDAILogo from 'assets/xdai-logo.png';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import React from 'react';

const logos = {
  1: EthLogo,
  4: EthLogo,
  42: EthLogo,
  77: xDAILogo,
  100: xDAILogo,
  56: BSCLogo,
  5: EthLogoOrange,
  99999: GUSandboxLogo,
  81: jocLogo,
};

export const Logo = React.memo(({ reverseFallback = false, ...props }) => {
  const { providerChainId } = useWeb3Context();
  const { getBridgeChainId } = useBridgeDirection();
  const chainId = reverseFallback
    ? getBridgeChainId(providerChainId)
    : providerChainId;
  const fallbackLogo = logos[chainId];
  return <Image src={fallbackLogo} {...props} />;
});
