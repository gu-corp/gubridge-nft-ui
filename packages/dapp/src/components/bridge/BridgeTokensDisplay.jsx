import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { TokenDisplay } from 'components/common/TokenDisplay';
import { useBridgeContext } from 'contexts/BridgeContext';
import { useUserTokens } from 'hooks/useUserTokens';
import React from 'react';

export const BridgeTokensDisplay = () => {
  const { searchText } = useBridgeContext();
  const { eip721Tokens, eip1155Tokens } = useUserTokens(searchText);

  return (
    <Accordion allowToggle allowMultiple w="100%" defaultIndex={[0, 1]}>
      <AccordionItem border="0">
        <AccordionButton
          borderRadius="0.5rem"
          justifyContent="space-between"
          color="grey"
          _hover={{ color: 'blue.500', bg: 'blackAlpha.50' }}
        >
          <Text fontWeight="bold" fontSize="xl" color="black">
            ERC-721 Tokens
          </Text>
          <AccordionIcon boxSize="1.5rem" />
        </AccordionButton>
        <AccordionPanel p="4">
          <Wrap spacing="6">
            {eip721Tokens.map((token, index) => (
              <WrapItem key={index.toString()}>
                <TokenDisplay token={token} />
              </WrapItem>
            ))}
          </Wrap>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem border="0">
        <AccordionButton
          borderRadius="0.5rem"
          justifyContent="space-between"
          color="grey"
          _hover={{ color: 'blue.500', bg: 'blackAlpha.50' }}
        >
          <Text fontWeight="bold" fontSize="xl" color="black">
            ERC-1155 Tokens
          </Text>
          <AccordionIcon boxSize="1.5rem" />
        </AccordionButton>
        <AccordionPanel p="4">
          <Wrap spacing="6">
            {eip1155Tokens.map((token, index) => (
              <WrapItem key={index.toString()}>
                <TokenDisplay token={token} />
              </WrapItem>
            ))}
          </Wrap>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
