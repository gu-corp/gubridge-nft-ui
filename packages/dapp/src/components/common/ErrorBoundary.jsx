import { Flex, Text } from '@chakra-ui/react';
import { logError } from 'lib/helpers';
import React from 'react';
import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    if (error) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    logError({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { children, t } = this.props;
    if (hasError) {
      return (
        <Flex
          justify="center"
          align="center"
          direction="column"
          w="100%"
          minH="100vh"
        >
          <Text fontSize="lg"> {t('something_went_wrong')} </Text>
          <Text> {t('please_check_console_for_error_log')} </Text>
        </Flex>
      );
    }

    return children;
  }
}

// eslint-disable-next-line import/no-default-export
export default withTranslation()(ErrorBoundary);
