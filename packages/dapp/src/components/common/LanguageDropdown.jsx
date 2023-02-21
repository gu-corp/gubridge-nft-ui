import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { DownArrowIcon } from 'icons/DownArrowIcon';
import { NetworkIcon } from 'icons/NetworkIcon';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageDropdown = ({ close }) => {
  const { i18n } = useTranslation();
  const placement = useBreakpointValue({ base: 'bottom', md: 'bottom-end' });

  const setItem = useCallback(
    e => {
      i18n.changeLanguage(e.target.value);
      close();
    },
    [close, i18n],
  );

  const languages = useMemo(
    () =>
      (i18n.languages || []).map(lang => {
        if (lang === 'en')
          return {
            label: 'English',
            value: 'en',
          };
        if (lang === 'ja')
          return {
            label: '日本',
            value: 'ja',
          };
        return {
          label: 'English',
          value: 'en',
        };
      }),
    [i18n.languages],
  );

  return (
    <Menu placement={placement}>
      <MenuButton
        as={Button}
        leftIcon={<NetworkIcon />}
        rightIcon={<DownArrowIcon boxSize="0.5rem" color="black" />}
        color="grey"
        bg="none"
        _hover={{ color: 'blue.500', bgColor: 'blackAlpha.100' }}
        p={2}
      >
        <Text color="black" textTransform="uppercase" fontSize="sm">
          {languages.find(lang => i18n.language === lang.value)?.label}
        </Text>
      </MenuButton>
      <MenuList border="none" boxShadow="0 0.5rem 1rem #CADAEF" zIndex="3">
        {languages.map(({ label, value }, key) => (
          <MenuItem
            value={value}
            onClick={setItem}
            key={key}
            textTransform="uppercase"
            fontWeight="700"
            fontSize="sm"
            justifyContent="center"
          >
            {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
