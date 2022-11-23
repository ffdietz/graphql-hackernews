import { Navigate, Route, Routes } from "react-router-dom";
import { Container } from "@chakra-ui/react"

import Header from "./components/Header";
import LinkList from "./components/LinkList"
import CreateLink from "./components/CreateLink"
import Login from "./components/Login";
import Search from "./components/Search";

export const App = () => (
  <Container fontSize="xl" centerContent>
    <Header />
    <Container marginTop="25vh">
      <Routes>
        <Route path="/" element={<Navigate replace to="/new/1" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateLink />} />
        <Route path="/search" element={<Search />} />
        <Route path="/top" element={<LinkList />} />
        <Route path="/new/:page" element={<LinkList />} />
      </Routes>
    </Container>
  </Container>
);

export default App