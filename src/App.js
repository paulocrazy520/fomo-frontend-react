import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/home";

import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <Home {...props} />} />
        <Redirect to="/home" />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
