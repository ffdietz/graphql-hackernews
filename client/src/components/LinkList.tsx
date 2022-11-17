import { Container } from "@chakra-ui/react";
import Link from "./Link";
import { useQuery, gql, QueryResult } from "@apollo/client";
import LinkT from "../types/types";

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
  {
    feed {
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
    }
  }
`;


export interface FeedQuery {
  feed:{
    __typename: string;
    id: string
    links: LinkT[]
  }
}

function LinkList() {
  const { data, loading, error, subscribeToMore } = useQuery<FeedQuery>(FEED_QUERY);

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

  const linksToRender = data?.feed.links;


  return (
    <Container>
      {!loading &&
        linksToRender?.map((link: LinkT, index: number) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </Container>
  );
}

export default LinkList;
