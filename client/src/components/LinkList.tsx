import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Link from "./Link";
import { useQuery, gql, QueryResult } from "@apollo/client";
import LinkT from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { LINKS_PER_PAGE } from "../helpers/constants";
import { stringify } from "querystring";

export interface FeedQuery {
  feed: {
    __typename: string;
    id: string;
    links: LinkT[];
    count: number;
  };
}

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
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

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export const FEED_QUERY = gql`
  query FeedQuery($take: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      count
    }
  }
`;

const getLinksToRender = (isNewPage: boolean, data: FeedQuery) => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};

const getQueryVariables = (isNewPage: boolean, page: number) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: "desc" };
  return { take, skip, orderBy };
};

function LinkList() {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewPage = location.pathname.includes("new");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const { data, loading, error, subscribeToMore } = useQuery<FeedQuery>(FEED_QUERY,{
    variables: getQueryVariables(isNewPage, page),
  });

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData}: any) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
  });

  const linksToRender = data?.feed.links;

  return (
    <Container>
      {loading && <Text>Loading...</Text>}
      {error && <pre>Something is wrong...</pre>}
      {data &&(
        <>
        { getLinksToRender(isNewPage, data).map(
          (link: LinkT, index: number) => (
            <Link key={link.id} link={link} index={index + pageIndex} 
          />
        ))}
        { isNewPage && (
          <Flex>
            <Box
              mr="1rem"
              cursor="pointer"
              onClick={() => {
                if(page > 1) 
                  navigate(`/new/${page - 1}`)
              }}
            >
              Previous
            </Box>
            <Box
              cursor="pointer"
              onClick={() => {
                if(page <= data.feed.count / LINKS_PER_PAGE) 
                  navigate(`/new/${page + 1}`)
              }}
            >
              Next
            </Box>

          </Flex>
        )}
        </>
      )}
    </Container>
  );
}

export default LinkList;


