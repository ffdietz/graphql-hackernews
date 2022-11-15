import { Container } from "@chakra-ui/react"
import LinkList from "./components/LinkList"
import CreateLink from "./components/CreateLink"

export const App = () => (
  <Container fontSize="xl" centerContent>
    <CreateLink />
    <LinkList />
  </Container>
);

export default App