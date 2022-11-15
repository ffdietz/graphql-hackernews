import { Container } from '@chakra-ui/react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client'

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
  const  { data, loading }  = useQuery(FEED_QUERY);
  const linksToRender = data?.feed.links;

  return (
    <Container>
      {!loading && 
      linksToRender.map((link: any) => (
        <Link key={link.id} link={link}/>
      ))}
    </Container>
  )
}

export default LinkList


// Add types to useQuery?