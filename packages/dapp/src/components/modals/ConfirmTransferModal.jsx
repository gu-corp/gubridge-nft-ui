import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  // useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { DisplayTokens } from 'components/common/DisplayTokens';
import { Logo } from 'components/common/Logo';
import { GnosisSafeWarning } from 'components/warnings/GnosisSafeWarning';
import { MedianGasWarning } from 'components/warnings/MedianGasWarning';
import { NeedsTransactionsWarning } from 'components/warnings/NeedsTransactionsWarning';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { getGasPrice, getMedianHistoricalEthGasPrice } from 'lib/gasPrice';
import { getNetworkName, handleWalletError } from 'lib/helpers';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ConfirmTransferModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const { isGnosisSafe, account } = useWeb3Context();

  const { foreignChainId, getBridgeChainId } = useBridgeDirection();
  const { receiver, tokens, transfer, needsClaiming } = useBridgeContext();

  const toast = useToast();
  const showError = useCallback(
    msg => {
      if (msg) {
        toast({
          title: 'Error',
          description: msg,
          status: 'error',
          isClosable: 'true',
        });
      }
    },
    [toast],
  );

  const [isGnosisSafeWarningChecked, setGnosisSafeWarningChecked] =
    useState(false);

  if (!tokens) return null;

  const { chainId } = tokens;

  const currentGasPrice = getGasPrice();
  const medianGasPrice = getMedianHistoricalEthGasPrice();

  const onClick = () => {
    transfer().catch(error => handleWalletError(error, showError));
    onClose();
  };

  const isSameAddress =
    account && receiver && account.toLowerCase() === receiver.toLowerCase();

  const isDisabled =
    isGnosisSafe && isSameAddress && !isGnosisSafeWarningChecked;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          maxW="36rem"
          mx={{ base: 12, lg: 0 }}
        >
          <ModalHeader p={6}>
            <Text>{t('confirm_transfer')}</Text>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody px={6} py={0}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              width="100%"
              justify="space-between"
              position="relative"
              align="stretch"
              mb="4"
            >
              <HStack spacing="0.5rem">
                <Logo w="3rem" h="3rem" />
                <Flex
                  align="flex-start"
                  direction="column"
                  w="9rem"
                  minW="9rem"
                  maxW="9rem"
                >
                  <Text color="greyText" fontSize="sm">
                    {t('from')}
                  </Text>
                  <Text fontWeight="500" fontSize="lg">
                    {getNetworkName(chainId)}
                  </Text>
                </Flex>
              </HStack>
              <HStack
                spacing="0.5rem"
                justify={{ base: 'flex-end', md: 'flex-start' }}
              >
                <Flex
                  align="flex-end"
                  direction="column"
                  w="9rem"
                  minW="9rem"
                  maxW="9rem"
                >
                  <Text color="greyText" fontSize="sm">
                    {t('to')}
                  </Text>
                  <Text fontWeight="500" fontSize="lg" textAlign="right">
                    {getNetworkName(getBridgeChainId(chainId))}
                  </Text>
                </Flex>
                <Logo w="3rem" h="3rem" reverseFallback />
              </HStack>
            </Flex>
            <Flex mt="4" bg="#EEf4FD" borderRadius="1rem" p="4">
              <Flex
                w="100%"
                direction="column"
                align="center"
                maxH="12.75rem"
                overflowY="auto"
                overflowX="hidden"
              >
                <DisplayTokens tokens={tokens} />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter p={6} flexDirection="column">
            {needsClaiming && <NeedsTransactionsWarning noShadow />}
            {foreignChainId === 1 && medianGasPrice.lt(currentGasPrice) && (
              <MedianGasWarning
                medianPrice={medianGasPrice}
                currentPrice={currentGasPrice}
                noShadow
              />
            )}
            {isGnosisSafe && (
              <GnosisSafeWarning
                isChecked={isGnosisSafeWarningChecked}
                setChecked={setGnosisSafeWarningChecked}
                noShadow
              />
            )}
            <Flex
              w="100%"
              justify="space-between"
              align={{ base: 'stretch', md: 'center' }}
              direction={{ base: 'column', md: 'row' }}
            >
              <Button
                px={12}
                onClick={onClose}
                background="background"
                _hover={{ background: '#bfd3f2' }}
                color="#687D9D"
              >
                {t('cancel')}
              </Button>
              <Button
                px={12}
                onClick={onClick}
                isDisabled={isDisabled}
                colorScheme="blue"
                mt={{ base: 2, md: 0 }}
              >
                {t('continue')}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
