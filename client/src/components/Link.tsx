
import React from 'react'
import { Flex, Container, Box, Text, VStack, Wrap, WrapItem, Spacer, HStack } from '@chakra-ui/react';
import { AUTH_TOKEN } from '../helpers/constants';
import { timeDifferenceForDate } from '../utils/timeDifferenceForDate';
import { gql, useMutation } from '@apollo/client';

interface LinkT {
  id: string;
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

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

function Link(props: LinkProps) {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
  });

  return (
    <Container m="1rem" w="80vw" bg="cadetblue" p="1rem 5rem" centerContent>
      <Flex w="60vw">
        <HStack mr="1rem">
          <Text as="span">
            {props.index + 1}.
          </Text>
          {authToken && (
            <Box
              color="greenyellow"
              mr="1rem"
              onClick={() => vote()}
            >
              ▲
            </Box>
          )}
        </HStack>
        <Wrap>
          <WrapItem>
            <Text as="span" mr="0.7rem">
              {link.description}
            </Text>
            <Text as="span" color="dimgrey">
              ({link.url})
            </Text>
          </WrapItem>
          <WrapItem>
            <Text as="span" lineHeight="0.9rem" fontSize="small">
              {link.votes?.length} votes | by{" "}
              {link.postedBy ? link.postedBy.name : "Unknown"}
              {timeDifferenceForDate(link.createAt)}
            </Text>
          </WrapItem>
        </Wrap>
      </Flex>
    </Container>
  );
}

export default Link