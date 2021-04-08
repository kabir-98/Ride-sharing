import './App.css';
import Home from './component/Home/Home';
import Header from './component/Header/Header';
import Login from './component/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Search from './component/Search/Search';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
    <Router>
      <Header></Header>
      <Switch>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/home">
          <Home></Home>
        </Route>

        <PrivateRoute  path="/search/:key">
          <Search></Search>
        </PrivateRoute>

        <PrivateRoute  path="/search">
          <Search></Search>
        </PrivateRoute>

        <Route path="/login">
          <Login></Login>
        </Route>

      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
