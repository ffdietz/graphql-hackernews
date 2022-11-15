import { Container } from "@chakra-ui/react"
import LinkList from "./components/LinkList"
import CreateLink from "./components/CreateLink"
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

export const App = () => (
  <Container fontSize="xl" centerContent>
    <Header />
    <Container marginTop="20vh">
      <Routes>
        <Route path="/" element={<LinkList />} />
        <Route path="/create" element={<CreateLink />} />
      </Routes>
    </Container>
  </Container>
);

export default App