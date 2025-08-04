import React, { useState } from 'react';
import {
  Form, Button, Image, FloatingLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import ReactInputMask from 'react-input-mask';
import logo from '../../images/Logo_colorida.png';
import {
  Container,
  PlanoDeFundo,
} from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispath = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (cpf.length !== 14) {
      formErrors = true;
      toast.error('CPF inválido');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida');
    }

    if (formErrors) return;

    dispath(actions.loginRequest({ cpf, password, prevPath }));
  };

  return (
    <PlanoDeFundo>
      <Container>
        <Loading isLoading={isLoading} />
        <Image className="mx-auto image" src={logo} rounded />
        <Form
          style={{
            display: 'flex', flexDirection: 'column', width: '90%',
          }}
          onSubmit={(e) => (handleSubmit(e))}
        >
          <FloatingLabel
            controlId="floatingInput"
            label="CPF"
            className="mb-3"
          >
            <Form.Control as={ReactInputMask} autoComplete="false" type="text" placeholder="CPF" onChange={(e) => setCpf(e.target.value)} mask="999.999.999-99" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Senha">
            <Form.Control type="password" autoComplete="current-password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
          </FloatingLabel>
          <Button className="mt-3" type="submit">Entrar</Button>
        </Form>
      </Container>
    </PlanoDeFundo>
  );
}
