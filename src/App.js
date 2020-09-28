import React from 'react';
import './App.css';
import ListInterviews from './components/ListInterviews'
import EditInterview from './components/EditInterview'
import NewInterview from './components/NewInterview'
import ShowInterview from './components/ShowInterview'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/interviews/new" component={NewInterview} />
      <Route path="/interviews/:id/edit" component={EditInterview} />
      <Route path="/interviews/:id" component={ShowInterview} />
      <Route path="/interviews" component={ListInterviews} />
      <Route path="/" component={ListInterviews} />
      </Switch>
    </div>
  );
}

export default App;
