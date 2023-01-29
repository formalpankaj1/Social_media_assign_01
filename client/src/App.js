import React, { useEffect } from "react";
import { Container } from '@material-ui/core';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth.js";
import { gapi } from 'gapi-script';
import PostDetails from './PostDetails/PostDetails.jsx';
import Profile from "./components/Profile/Profile";


function App() {

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: "118212268368-jqcgh9kkphtk9lsbahvt7djtnmssk04j.apps.googleusercontent.com",
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log('user: ',user);
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/auth" exact component={() => (user==null ? <Auth /> : <Redirect to="/posts/" />)} />
          <Route path="/profile/:user" exact component={Profile} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
