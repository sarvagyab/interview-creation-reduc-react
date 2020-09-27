import React from 'react';
import './App.css';
import ListInterviews from './components/ListInterviews'
import ShowInterview from './components/ShowInterview'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route path="/interviews/:id/edit" component={ListInterviews} />
      <Route path="/interviews/:id" component={ShowInterview} />
      <Route path="/interviews/new" component={ListInterviews} />
      <Route path="/interviews" component={ListInterviews} />
      <Route path="/" component={ListInterviews} />
      </Switch>
    </div>
  );
}

export default App;
