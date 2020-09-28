import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import ListInterviews from './components/ListInterviews';
import EditInterview from './components/EditInterview';
import NewInterview from './components/NewInterview';
import ShowInterview from './components/ShowInterview';
import NewUser from './components/NewUser';
import EditUser from './components/EditUser';
import ListUsers from './components/ListUsers';
import ShowUser from './components/ShowUser';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route path="/interviews/new" component={NewInterview} />
      <Route path="/interviews/:id/edit" component={EditInterview} />
      <Route path="/interviews/:id" component={ShowInterview} />
      <Route path="/interviews" component={ListInterviews} />

      <Route path="/users/new" component={NewUser} />
      <Route path="/users/:id/edit" component={EditUser} />
      <Route path="/users/:id" component={ShowUser} />
      <Route path="/users" component={ListUsers} />
      <Route path="/" component={NewUser} />
      </Switch>
    </div>
  );
}

export default App;
