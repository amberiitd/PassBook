import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar'
import AuthGuardRoute from './config/AuthGuardRoute';
import Home from './pages/Home'

function App() {
 
  return (
    <div>
      <Navbar />
    
      <Router className="App">
        <Switch>
          <Route path="/login">
              <Login />
          </Route>

          <AuthGuardRoute path="/home" component = {<Home/>}/>

          <Route path="/**">
            <Redirect to= "/login"/>
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
