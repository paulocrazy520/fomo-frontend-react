import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/home' render={(props) => <Home {...props} />} />
        <Redirect to='/home' />
        <Redirect from='/' to='/home' />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
