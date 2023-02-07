import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import ClaimTokenImage from 'assets/claim.svg';
import { LoadingModal } from 'components/modals/LoadingModal';
import { AuspiciousGasWarning } from 'components/warnings/AuspiciousGasWarning';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useClaim } from 'hooks/useClaim';
import { isRevertedError, TOKENS_CLAIMED } from 'lib/amb';
import {
  getGasPrice,
  getLowestHistoricalEthGasPrice,
  getMedianHistoricalEthGasPrice,
} from 'lib/gasPrice';
import { getNetworkName, handleWalletError, logError } from 'lib/helpers';
import { messageCallStatus } from 'lib/message';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ClaimTransferModal = ({ message, setMessage }) => {
  const { t } = useTranslation();
  const { ethersProvider } = useWeb3Context();
  const { homeChainId, foreignChainId, foreignAmbAddress } =
    useBridgeDirection();
  const { txHash, setTxHash } = useBridgeContext();
  const [isOpen, setOpen] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [executed, setExecuted] = useState(false);

  const onClose = useCallback(() => {
    setTxHash();
    setMessage();
    setOpen(false);
  }, [setTxHash, setMessage]);

  const toast = useToast();
  const showError = useCallback(
    errorMsg => {
      if (errorMsg) {
        toast({
          title: 'Error',
          description: errorMsg,
          status: 'error',
          isClosable: 'true',
        });
      }
    },
    [toast],
  );

  useEffect(() => {
    if (message && message.messageId) {
      const { messageId } = message;
      messageCallStatus(foreignAmbAddress, ethersProvider, messageId).then(
        status => {
          if (status) {
            setExecuted(true);
          }
        },
      );
    }
  }, [message, foreignAmbAddress, ethersProvider]);

  const { claim, executing, executionTx } = useClaim();

  const claimTokens = useCallback(async () => {
    try {
      setClaiming(true);
      await claim(txHash, message);
    } catch (claimError) {
      logError({ claimError });
      if (
        claimError.message === TOKENS_CLAIMED ||
        isRevertedError(claimError)
      ) {
        setExecuted(true);
      } else {
        handleWalletError(claimError, showError);
      }
    } finally {
      setClaiming(false);
    }
  }, [claim, txHash, showError, message]);

  useEffect(() => {
    if (!executing && !claiming && executionTx) {
      onClose();
    }
  }, [executing, claiming, executionTx, onClose]);

  if (claiming || executing)
    return (
      <LoadingModal
        loadingText="Waiting for Executiong"
        chainId={homeChainId}
        txHash={txHash}
      />
    );

  const currentGasPrice = getGasPrice();
  const medianGasPrice = getMedianHistoricalEthGasPrice();
  const lowestGasPrice = getLowestHistoricalEthGasPrice();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          maxW="33.75rem"
          mx={{ base: 12, lg: 0 }}
        >
          <ModalHeader p={6}>
            <Text>{t('claim_your_tokens')}</Text>
            <Image src={ClaimTokenImage} w="100%" mt={4} />
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody px={6} py={0}>
            <VStack align="center" direction="column" spacing="4">
              {foreignChainId === 1 && medianGasPrice.gt(currentGasPrice) && (
                <AuspiciousGasWarning
                  currentPrice={currentGasPrice}
                  medianPrice={medianGasPrice}
                  lowestPrice={lowestGasPrice}
                  noShadow
                  noMargin
                />
              )}
              <Flex align="center" direction="column" w="100%">
                <Alert status="info" borderRadius={5}>
                  <AlertIcon minWidth="20px" />
                  <Text fontSize="small">
                    {t('claim_notification_description', {
                      foreignNetworkName: getNetworkName(foreignChainId),
                    })}
                  </Text>
                </Alert>
              </Flex>
              {executed && (
                <Flex align="center" direction="column" w="100%">
                  <Alert status="error" borderRadius={5}>
                    <AlertIcon minWidth="20px" />
                    <Text fontSize="small">
                      The tokens were already claimed. Check for your token in{' '}
                      <strong>{getNetworkName(foreignChainId)}</strong>.
                    </Text>
                  </Alert>
                </Flex>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter p={6}>
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
                onClick={claimTokens}
                colorScheme="blue"
                mt={{ base: 2, md: 0 }}
                isLoading={claiming || executing}
                isDisabled={executed}
              >
                {t('claim')}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
