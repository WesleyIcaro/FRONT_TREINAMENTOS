import React, { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';

import { Container } from '../../styles/GlobalStyles';
import Header from '../../components/Header';
import axios from '../../services/axios';

export default function Cursos({ match }) {
  const [urlYoutube, setUrlYoutube] = useState('');
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  useEffect(() => {
    const selectVideo = async () => {
      try {
        const response = await axios.get(`/treinamento/${id}`);

        setUrlYoutube(response.data.url);
        setTitle(response.data.curso);
        setText(response.data.descricao);
      } catch (err) {
        const errors = get(err, 'response.data.error', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          dispatch(actions.loginFailure());
          history.push('/login');
        }

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        } else {
          toast.error('Erro desconhecido');
        }
      }
    };
    selectVideo();
  }, [id, dispatch, history]);

  return (
    <>
      <Header />
      <Container>
        <Card className="w-100 h-100">
          <Iframe width="100%" height="60%" src={urlYoutube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen />
          <Card.Body style={{
            display: 'flex', flexDirection: 'column', textAlign: 'center', height: '40%',
          }}
          >
            <Card.Title>
              {title}
            </Card.Title>
            <Card.Text>
              {text}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

Cursos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
