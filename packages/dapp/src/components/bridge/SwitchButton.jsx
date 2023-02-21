import { IconButton, Tooltip } from '@chakra-ui/react';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useSwitchChain } from 'hooks/useSwitchChain';
import { SwitchIcon } from 'icons/SwitchIcon';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const SwitchButton = () => {
  const { t } = useTranslation();
  const { providerChainId, isMetamask } = useWeb3Context();
  const { getBridgeChainId } = useBridgeDirection();
  const bridgeChainId = useMemo(
    () => getBridgeChainId(providerChainId),
    [providerChainId, getBridgeChainId],
  );
  const switchChain = useSwitchChain();

  const isDefaultChain = [1, 3, 4, 5, 42].includes(bridgeChainId);
  const isMobileBrowser = navigator?.userAgent?.includes('Mobile') || false;
  const switchOnClick = useCallback(
    () => switchChain(bridgeChainId),
    [switchChain, bridgeChainId],
  );

  const displayButton =
    isMetamask && (isMobileBrowser ? !isDefaultChain : true);

  return displayButton ? (
    <Tooltip label={t('switch_direction_of_bridge')} closeOnClick={false}>
      <IconButton
        icon={<SwitchIcon boxSize="2rem" />}
        p="0.5rem"
        variant="ghost"
        position="absolute"
        top={{ base: '50%', md: '0' }}
        left={{ base: '0', md: '50%' }}
        transform={{
          base: 'translateY(-50%) rotate(90deg)',
          md: 'translateX(-50%) translateY(calc(-100% - 1rem))',
        }}
        borderRadius="0.5rem"
        color="blue.500"
        _hover={{ bg: 'blackAlpha.100' }}
        onClick={switchOnClick}
      />
    </Tooltip>
  ) : null;
};
