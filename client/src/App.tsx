import { Container } from "@chakra-ui/react"
import LinkList from "./components/LinkList"
import CreateLink from "./components/CreateLink"
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Search from "./components/Search";

export const App = () => (
  <Container fontSize="xl" centerContent>
    <Header />
    <Container marginTop="25vh">
      <Routes>
        <Route path="/" element={<LinkList/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/create" element={<CreateLink/>}/>
        <Route path="/search" element={<Search/>}/>
      </Routes>
    </Container>
  </Container>
);

export default App