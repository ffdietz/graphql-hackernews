import { Flex, Container, Box, Text, Wrap, WrapItem, HStack, VStack } from '@chakra-ui/react';
import { AUTH_TOKEN } from '../helpers/constants';
import { timeDifferenceForDate } from '../utils/timeDifferenceForDate';
import { gql, useMutation } from '@apollo/client';
import { FEED_QUERY } from "./LinkList";
import LinkT  from '../types/types'

interface LinkProps {
  link: LinkT;
  index: number;
}

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link{ id votes{ id user{ id }}}
      user{ id }
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
    update: (cache, { data: { vote } }) => {
      const { feed }: any = cache.readQuery({
        query: FEED_QUERY,
      });

      const updatedLinks = feed.links.map((feedLink: LinkT) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <Container fontSize="large" centerContent>
      <Flex w="65vw" m="0.5rem" bg="cadetblue" p="0.5rem 2rem">
        <HStack mr="1rem">
          <Text as="span">{props.index + 1}.</Text>
          {authToken && (
            <Box
              cursor="pointer"
              color="greenyellow"
              mr="1rem"
              onClick={() => vote()}
            >
              ▲
            </Box>
          )}
        </HStack>
        <VStack>
          <Container>
            <Text as="span" mr="1rem" fontSize="large">
              {link.description}
            </Text>
            <Text as="span" color="black" fontSize="small" p={0} m={0}>
              ({link.url})
            </Text>
          </Container>
          <Container>
            <Text as="span" fontSize="small" p={0} m={0}>
              {link.votes.length} votes | by{" "}
              {link.postedBy ? link.postedBy.name : "Unknown"}
              {timeDifferenceForDate(link.createAt)}
            </Text>
          </Container>
        </VStack>
      </Flex>
    </Container>
  );
}

export default Link