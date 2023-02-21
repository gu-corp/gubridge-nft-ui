import { Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { t } = useTranslation();

  return (
    <Text fontSize={32} fontWeight="bold">
      {t('version')}: {process.env.REACT_APP_VERSION}
    </Text>
  );
};
