import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import packageJson from '../../package.json';

export const About = () => {
  const { t } = useTranslation();

  return (
    <Box px={5}>
      <Text fontSize="4xl" fontWeight="bold" marginTop="10">
        {t('about')}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" marginTop="10">
        {t('version')}: {packageJson.version}
      </Text>
    </Box>
  );
};
