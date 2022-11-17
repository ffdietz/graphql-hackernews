import { Container } from "@chakra-ui/react";
import Link from "./Link";
import { useQuery, gql, QueryResult } from "@apollo/client";
import LinkT from "../types/types";

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

export interface Feed {
  id: string;
  links: LinkT[];
}

export interface FeedQuery {
  feed: Feed;
}

function LinkList() {
  const { data, loading } = useQuery<FeedQuery>(FEED_QUERY);

  const linksToRender: LinkT[] | undefined = data?.feed.links;

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
