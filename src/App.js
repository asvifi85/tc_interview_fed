import logo from './logo.svg';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client"

import {Home} from './Components/Home/Home';
import {Genere} from './Components/Genere/Genere';
import './App.css';
// Initialize Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://tcinterview-acrl5.ondigitalocean.app/graphql" // your graphql server link
  }),
  credentials: "same-origin",
})
function AppRouter() {
  return (
    <div id="wrapper">
 <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
    </Router>  
     
    </div>
  );
}
function App() {
  return (
    <ApolloProvider client = {client}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
