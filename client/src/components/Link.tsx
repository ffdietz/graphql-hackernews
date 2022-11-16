
import React from 'react'
import { Flex, Container, Box, Text } from '@chakra-ui/react';
import { AUTH_TOKEN } from '../helpers/constants';
import { timeDifferenceForDate } from '../utils/timeDifferenceForDate';

interface LinkT {
  description: string;
  url: string;
  votes: number[];
  postedBy: {
    name: string;
  };
  createAt: Date;
}

interface LinkProps {
  link: LinkT;
  index: number;
}

function Link(props: LinkProps) {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <Container m="1rem" centerContent>
      <Flex w="90vw" p="1rem" borderRadius="2px" bg="green.900" justifyContent="space-between" alignContent="center">
        <Flex mr="0.5rem">
          <Text as="span" mr="0.5rem">
            {props.index + 1}.
          </Text>
          {authToken && (
            <Box color="grey" onClick={() => console.log("voted")}>
              ▲
            </Box>
          )}
        </Flex>
        <Text as="span" marginRight="0.7rem">
          {link.description}
        </Text>
        <Text as="span" color="grey">
          ({link.url})
        </Text>
        <Flex>
          {
            <Flex >
              {link.votes?.length} votes | by{" "}
              {link.postedBy ? link.postedBy.name : "Unknown"} <br />
              {timeDifferenceForDate(link.createAt)}
            </Flex>
          }
        </Flex>
      </Flex>
    </Container>
  );
}

export default Link