import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { AUTH_TOKEN } from "../helpers/constants";

function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <Flex
      position="fixed"
      bg="orange.500"
      w="full"
      p="1rem"
      alignItems="center"
      fontSize="x-large"
    >
      <Link to="/">
        <Heading borderRight="2px" p="0 20px" fontWeight="extrabold">
          Hacker News
        </Heading>
      </Link>
      <Flex
        justifyContent="space-between"
        w={authToken ? "45vw" : "15vw"}
        marginLeft="3rem"
      >
        <Link to="/">new</Link>
        <>|</>
        <Link to="/top">top</Link>
        <>|</>
        <Link to="/search">search</Link>
        <>|</>
        {authToken && <Link to="/create">submit</Link>}
      </Flex>

      <Flex w="full" justifyContent="flex-end" paddingRight="4vw">
        {authToken ? (
          <Box
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate("/");
            }}
          >
            logout
          </Box>
        ) : (
          <Link to="login">login</Link>
        )}
      </Flex>
    </Flex>
  );
}

export default Header