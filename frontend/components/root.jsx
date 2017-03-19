import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { fetchLists } from '../actions/list_actions';
import App from './app';
import Welcome from './welcome';
import Home from './home/home_container';
import ListShow from './lists/list_show_container';

const Root = ({ store }) => {

  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/welcome');
    }
  };

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} onEnter={_ensureLoggedIn}/>
          <Route path="/list/:listid" component={ListShow} />
        </Route>
        <Route path="/welcome" component={Welcome} />
      </Router>
    </Provider>
  );
};

export default Root;
