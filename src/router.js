import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const Products = dynamic({
    app,
    models: () => [
      import('./models/products')
    ],
    component: () => import('./routes/Products'),
  });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" exact component={Products} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
