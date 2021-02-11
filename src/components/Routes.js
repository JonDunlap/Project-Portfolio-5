import { Route, Switch } from 'react-router-dom';

import Search from '../pages/Search';
import Main from '../pages/Main';
import Day from '../pages/Day';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Search} />
      <Route path='/Search' component={Search} />
      <Route path='/Main' component={Main} />
      <Route path='/Day' component={Day} />
    </Switch>
  );
};

export default Routes;
