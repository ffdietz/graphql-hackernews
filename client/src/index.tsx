import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { App } from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./api/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);

// install Vite to create react apps

// npm uninstall ls eslint
// npm i eslint@latest -D eslint-config-react-app
// npm install --save-dev eslint-config-react-app eslint@^8.0.0
