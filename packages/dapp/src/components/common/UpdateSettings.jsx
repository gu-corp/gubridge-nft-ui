import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import SettingsImage from 'assets/settings.svg';
import { useSettings } from 'contexts/SettingsContext';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { SettingsIcon } from 'icons/SettingsIcon';
import { getNetworkLabel } from 'lib/helpers';
import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const UpdateSettings = ({ close }) => {
  const initialRef = useRef();
  const { t } = useTranslation();

  const {
    // infiniteUnlock,
    // setInfiniteUnlock,
    homeRPC,
    setHomeRPC,
    foreignRPC,
    setForeignRPC,
    neverShowClaims,
    setNeverShowClaims,
    needsSaving,
    save,
  } = useSettings();
  const { homeChainId, foreignChainId } = useBridgeDirection();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSave = useCallback(() => {
    save();
    onClose();
  }, [save, onClose]);

  const openSettings = useCallback(() => {
    close();
    onOpen();
  }, [close, onOpen]);

  return (
    <>
      <Button
        variant="ghost"
        color="grey"
        _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
        onClick={openSettings}
        leftIcon={<SettingsIcon />}
        px={2}
        fontSize="sm"
      >
        <Text color="black">{t('settings')}</Text>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
        initialFocusRef={initialRef}
      >
        <ModalOverlay background="modalBG">
          <ModalContent
            boxShadow="0px 1rem 2rem #617492"
            borderRadius="1rem"
            maxW="30rem"
            mx={{ base: 12, lg: 0 }}
          >
            <ModalHeader p={6}>
              <Text>{t('settings')}</Text>
              <Image src={SettingsImage} w="100%" mt={4} />
            </ModalHeader>
            <ModalCloseButton
              size="lg"
              top={-10}
              right={-10}
              color="white"
              p={2}
            />
            <ModalBody px={6} py={0}>
              <Flex direction="column">
                <Text mb={2}>
                  {t('custom')} {getNetworkLabel(foreignChainId)} RPC URL
                </Text>
                <InputGroup mb={4} borderColor="#DAE3F0">
                  <Input
                    id="symbol"
                    size="sm"
                    onChange={e => setForeignRPC(e.target.value)}
                    _placeholder={{ color: 'grey' }}
                    value={foreignRPC}
                  />
                </InputGroup>
                <Text mb={2}>
                  {t('custom')} {getNetworkLabel(homeChainId)} RPC URL
                </Text>
                <InputGroup mb={4} borderColor="#DAE3F0">
                  <Input
                    id="decimals"
                    size="sm"
                    onChange={e => setHomeRPC(e.target.value)}
                    _placeholder={{ color: 'grey' }}
                    value={homeRPC}
                  />
                </InputGroup>
                <Text mb={2}>{t('turn_off_claim_notifications')}</Text>
                <Switch
                  mb={4}
                  colorScheme="blue"
                  isChecked={neverShowClaims}
                  onChange={e => setNeverShowClaims(e.target.checked)}
                />
              </Flex>
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
                  onClick={onSave}
                  colorScheme="blue"
                  mt={{ base: 2, md: 0 }}
                  ref={initialRef}
                  disabled={!needsSaving}
                  w="100%"
                >
                  {t('save')}
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};
