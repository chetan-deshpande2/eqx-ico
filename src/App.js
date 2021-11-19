import "./assets/css/App.css";
import { Switch, Route } from "react-router-dom";
import { Home, BuyEQX, AboutEqx, AccessOrg, EnterpriceDex } from "./Pages";
import { Footer, Nav } from "./components/";
import { Router } from "react-router";
import history from "./routerHistory";

function App() {
  return (
    <Router history={history}>
      <Nav />
      <Switch>
        <Route exact path="/about-eqx">
          <AboutEqx />
        </Route>
        <Route exact path="/access-org">
          <AccessOrg />
        </Route>
        <Route exact path="/enterprice-dex">
          <EnterpriceDex />
        </Route>
        <Route exact path="/buy-eqx">
          <BuyEQX />
        </Route>
        <Route exact path="/" exact>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
