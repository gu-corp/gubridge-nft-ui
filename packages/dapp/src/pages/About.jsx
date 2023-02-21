import { Text } from '@chakra-ui/react';
import React from 'react';

export const About = () => (
  <Text fontSize="4xl" fontWeight="bold" marginTop="10">
    Version: {process.env.REACT_APP_VERSION}
  </Text>
);
