import { Container } from '@chakra-ui/react';
import Link from './Link';
import { useQuery, gql, QueryResult } from '@apollo/client'

interface LinkProps {

}

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

function LinkList() {
  const { data, loading } = useQuery(FEED_QUERY);
  const linksToRender = data?.feed.links;

  return (
    <Container>
      {!loading && 
      linksToRender.map((link: any, index: number) => (
        <Link key={link.id} link={link} index={index}/>
      ))}
    </Container>
  )
}

export default LinkList


// Add types to useQuery? <QueryResult> fields requested?