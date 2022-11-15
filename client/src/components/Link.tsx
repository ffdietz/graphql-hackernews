
import { Box, Container } from '@chakra-ui/react';
import React from 'react'

interface LinkProps {
  link:{
    description: string;
    url: string;
  }
}

function Link(props: LinkProps) {
  const { link } = props;
  return (
    <Container>
      <Box>
        {link.description} ({link.url})
      </Box>
    </Container>
  );
}

export default Link