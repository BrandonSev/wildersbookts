import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);
