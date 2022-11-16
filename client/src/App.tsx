import { Container } from "@chakra-ui/react"
import LinkList from "./components/LinkList"
import CreateLink from "./components/CreateLink"
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

export const App = () => (
  <Container fontSize="xl" centerContent>
    <Header />
    <Container marginTop="20vh">
      <Routes>
        <Route path="/" element={<LinkList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateLink />} />
      </Routes>
    </Container>
  </Container>
);

export default App