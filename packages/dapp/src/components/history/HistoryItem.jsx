import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Grid,
  Image,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import RightArrowImage from 'assets/right-arrow.svg';
import { DisplayTokens } from 'components/common/DisplayTokens';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { useClaim } from 'hooks/useClaim';
import { isRevertedError, TOKENS_CLAIMED } from 'lib/amb';
import { getExplorerUrl, handleWalletError, logError } from 'lib/helpers';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const shortenHash = hash =>
  `${hash.slice(0, 6)}...${hash.slice(hash.length - 4, hash.length)}`;

const Tag = ({ bg, txt }) => (
  <Flex
    justify="center"
    align="center"
    bg={bg}
    borderRadius="6px"
    px="0.75rem"
    height="1.5rem"
    fontSize="xs"
    color="white"
    fontWeight="600"
    w="auto"
  >
    <Text>{txt}</Text>
  </Flex>
);

const networkTags = {
  100: <Tag bg="#4DA9A6" txt="xDai" />,
  1: <Tag bg="#5A74DA" txt="Ethereum" />,
  4: <Tag bg="#5A74DA" txt="Rinkeby" />,
  42: <Tag bg="#5A74DA" txt="Kovan" />,
  77: <Tag bg="#4DA9A6" txt="POA Sokol" />,
  56: <Tag bg="#5A74DA" txt="BSC" />,
  99999: <Tag bg="#4DA9A6" txt="G.U.Sandbox" />,
  3: <Tag bg="#5A74DA" txt="Ropsten" />,
  5: <Tag bg="#5A74DA" txt="Görli" />,
};

const getNetworkTag = chainId => networkTags[chainId];

export const HistoryItem = ({
  data: {
    tokens,
    timestamp,
    sendingTx,
    receivingTx: inputReceivingTx,
    message,
    status,
  },
  handleClaimError,
}) => {
  const { t } = useTranslation();
  const { chainId } = tokens;

  const { getBridgeChainId, getMonitorUrl } = useBridgeDirection();
  const bridgeChainId = getBridgeChainId(chainId);

  const timestampString = new Date(
    parseInt(timestamp, 10) * 1000,
  ).toLocaleTimeString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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

  const { claim, executing, executionTx } = useClaim();
  const [claiming, setClaiming] = useState(false);
  const receivingTx = executionTx || inputReceivingTx;
  const failed = !!inputReceivingTx && status === false;

  const claimTokens = useCallback(async () => {
    try {
      setClaiming(true);
      await claim(sendingTx, message);
    } catch (claimError) {
      logError({ claimError });
      if (
        claimError.message === TOKENS_CLAIMED ||
        isRevertedError(claimError)
      ) {
        handleClaimError();
      } else {
        handleWalletError(claimError, showError);
      }
    } finally {
      setClaiming(false);
    }
  }, [claim, sendingTx, message, showError, handleClaimError]);

  return (
    <Flex
      w="100%"
      background="white"
      boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      borderRadius="1rem"
      fontSize="sm"
      p={4}
      mb={4}
      direction="column"
    >
      <Grid
        templateColumns={{
          base: '1fr',
          md: '0.5fr 1.75fr 1fr 1fr 1.75fr',
          lg: '1fr 1.25fr 1fr 1fr 1.75fr',
        }}
        w="100%"
      >
        <Flex align="center" justify="space-between" mb={{ base: 1, md: 0 }}>
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            {t('date')}
          </Text>
          <Text my="auto">{timestampString}</Text>
        </Flex>
        <Flex align="center" justify="space-between" mb={{ base: 1, md: 0 }}>
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            {t('direction')}
          </Text>
          <Flex align="center">
            {getNetworkTag(chainId)}
            <Image src={RightArrowImage} mx="0.5rem" />
            {getNetworkTag(bridgeChainId)}
          </Flex>
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            {t('sending_tx')}
          </Text>
          <Link
            color="blue.500"
            href={getMonitorUrl(chainId, sendingTx)}
            rel="noreferrer noopener"
            target="_blank"
            my="auto"
            textAlign="center"
          >
            {shortenHash(sendingTx)}
          </Link>
        </Flex>
        <Flex
          align="center"
          justify={{ base: 'space-between', md: 'center' }}
          mb={{ base: 1, md: 0 }}
        >
          <Text display={{ base: 'inline-block', md: 'none' }} color="greyText">
            {t('receiving_tx')}
          </Text>
          {receivingTx ? (
            <Link
              color="blue.500"
              href={`${getExplorerUrl(bridgeChainId)}/tx/${receivingTx}`}
              rel="noreferrer noopener"
              target="_blank"
              my="auto"
              textAlign="center"
            >
              {shortenHash(receivingTx)}
            </Link>
          ) : (
            <Text />
          )}
        </Flex>
        {receivingTx ? (
          <Flex
            align="center"
            justify={{ base: 'center', md: 'flex-end' }}
            w="100%"
          >
            {failed ? (
              <CloseIcon color="red.500" boxSize="0.75rem" pb="0.1rem" />
            ) : (
              <CheckIcon color="blue.500" boxSize="0.75rem" />
            )}
            <Text ml="0.25rem" color={failed ? 'red.500' : 'blue.500'}>
              {failed ? t('failed') : t('claimed')}
            </Text>
          </Flex>
        ) : (
          <Flex align="center" justify={{ base: 'center', md: 'flex-end' }}>
            <Button
              w="auto"
              size="sm"
              colorScheme="blue"
              onClick={claimTokens}
              isLoading={claiming || executing}
            >
              {t('claim')}
            </Button>
          </Flex>
        )}
      </Grid>
      <Flex mt="4" bg="#EEf4FD" borderRadius="1rem" p="4" direction="column">
        <Text> {t('items')} </Text>
        <Flex
          w="100%"
          direction="column"
          maxH="12.75rem"
          overflowY="auto"
          overflowX="hidden"
        >
          <DisplayTokens tokens={{ ...tokens, bridgeChainId }} />
        </Flex>
      </Flex>
    </Flex>
  );
};
