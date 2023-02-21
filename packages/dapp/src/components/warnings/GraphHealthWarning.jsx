import { Alert, AlertIcon, Flex, Text } from '@chakra-ui/react';
import { useGraphHealth } from 'hooks/useGraphHealth';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const GraphHealthWarning = () => {
  const { t } = useTranslation();
  const { foreignHealthy, homeHealthy } = useGraphHealth(
    t(
      'cannot_access_history_data_wait_for_a_few_minutes_and_reload_the_application',
    ),
    {
      disableAlerts: true,
    },
  );
  if (foreignHealthy && homeHealthy) return null;

  return (
    <Flex align="center" direction="column" w="100%" mb="4">
      <Alert
        status="warning"
        borderRadius={5}
        boxShadow="0px 1rem 2rem rgba(204, 218, 238, 0.8)"
      >
        <AlertIcon minWidth="20px" />
        <Text fontSize="small">{t('subgraph_warning')}</Text>
      </Alert>
    </Flex>
  );
};
