import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Switch
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import NavBar from './components/views/NavBar/NavBar';
import RegisterPage from './components/views/ResgisterPage/RegisterPage';
import Auth from './hoc/auth'
function App() {
  return (
    <Router>
      <div>


        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={<Auth SpecificComponent={LandingPage} option={null} />}/>

          <Route exact path="/login" element={<Auth SpecificComponent={LoginPage} option={false} />}>
          </Route>
          <Route exact path="/register" element={<Auth SpecificComponent={RegisterPage} option={false} />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
