import { Flex, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <Flex
      position="fixed"
      bg="orange.500"
      w="full"
      p="1rem"
      alignItems="center"
    >
      <Link to="/">
        <Text borderRight="2px" p="0 20px" fontWeight="extrabold" fontSize="4xl">Hacker News</Text>
      </Link>
      <Flex justifyContent="space-between" w="10vw" marginLeft="3rem">
        <Link to="/" >new</Link>
        <Link to="/create">submit</Link>
      </Flex>
    </Flex>
  );
}

export default Header