import {Route, Switch} from 'react-router-dom'

import StartTest from './components/StartTest'

import Home from './components/Home'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/start-test" component={StartTest} />
  </Switch>
)

export default App
