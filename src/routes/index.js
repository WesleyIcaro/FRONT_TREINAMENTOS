import React from 'react';
import { Switch } from 'react-router-dom';

import { useSelector } from 'react-redux';
import MyRoute from './myRoute';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Cursos from '../pages/Cursos';
import Page404 from '../pages/Page404';
import CadastrarVideo from '../pages/CadastrarVideo';

export default function Routes() {
  const nivel = useSelector((state) => state.auth.user.nivel);

  return (
    <Switch>
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute exact path="/" component={Home} isClosed />
      <MyRoute exact path="/cursos/:id" component={Cursos} isClosed />
      {(nivel === '3') && <MyRoute exact path="/cadastrar_aula" component={CadastrarVideo} isClosed />}
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
