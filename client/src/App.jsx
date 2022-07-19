//import { Navbar, Welcome, Service, Footer } from "../components"
import Welcome from "../components/Welcome";
import Service from "../components/Service";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Redirect, useHistory, Link } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <div >
        <Navbar />
        <Route
          exact
          path="/"
          render={() => <Redirect to="/market" />}
        ></Route>
        <Route exact path="/market" component={Welcome} />
        <Route exact path="/sell" component={Service} />
        <Route exact path="/mine" component={Footer} />
        <Route exact path="/myListed" component={Footer} />
      </div>
    </Router>
  )
}

export default App
