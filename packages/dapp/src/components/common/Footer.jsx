import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import Logo from 'assets/gubridge-nft-logo.svg';
import GUNetLogo from 'assets/gunet-logo.svg';
import { GithubIcon } from 'icons/GithubIcon';
import { TwitterIcon } from 'icons/TwitterIcon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useTranslation();
  const smallScreen = useBreakpointValue({ base: true, sm: false });
  return (
    <Flex
      position="relative"
      justify={{ base: 'center', sm: 'space-between' }}
      align="center"
      h={20}
      maxW="75rem"
      px={8}
      w="100%"
      color="grey"
    >
      {!smallScreen && (
        <Link to="/" display={{ base: 'none', sm: 'block' }}>
          <Flex
            justify="space-around"
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <Image
              minW="6rem"
              w="6rem"
              src={Logo}
              mr={{ base: 4, md: 2, lg: 4 }}
            />
          </Flex>
        </Link>
      )}
      <HStack spacing={4}>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://twitter.com/G_U_net"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TwitterIcon />
          </a>
        </Box>
        <Box _hover={{ color: 'blue.500' }} transition="0.25s">
          <a
            href="https://github.com/gulabs"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GithubIcon />
          </a>
        </Box>
        <Box w="1px" h={5} background="grey" />
        <a href="https://www.gu.net/" rel="noreferrer noopener" target="_blank">
          <Flex
            align="center"
            _hover={{ color: 'blue.500' }}
            transition="0.25s"
          >
            <Text style={{ marginRight: 5 }}>{t('built_by')}</Text>
            <Image
              minW="6rem"
              w="6rem"
              src={GUNetLogo}
              mr={{ base: 4, md: 2, lg: 4 }}
            />
          </Flex>
        </a>
      </HStack>
    </Flex>
  );
};
