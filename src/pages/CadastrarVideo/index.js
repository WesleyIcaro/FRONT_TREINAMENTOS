import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import * as actions from '../../store/modules/auth/actions';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

export default function CadastrarVideo() {
  const [url, setUrl] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tema, setTema] = useState('');
  const [curso, setCurso] = useState('');
  const [menu, setMenu] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('/treinamento');
        setMenu(response.data);
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
        }
      }
    };
    getData();
  }, [dispatch, history]);

  const handleSelect = (value) => {
    setShow(true);
    if (value !== 'ad') {
      setId(value);
      axios.get(`/treinamento/${value}`).then((response) => {
        setCurso(response.data.curso);
        setDescricao(response.data.descricao);
        setUrl(response.data.url);
        setTema(response.data.tema);
      }).catch((err) => {
        toast.error('Não foi possível carregar a aula');

        const errors = get(err, 'response.data.error', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          dispatch(actions.loginFailure());
          history.push('/login');
        }

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }
      });
    } else {
      setId('');
      setCurso('');
      setDescricao('');
      setUrl('');
      setTema('');
    }
  };

  const handleSelectMenu = (value) => {
    setShowAddMenu(true);
    if (value !== 'ad') {
      setTema(value);
    } else {
      setTema('');
    }
  };

  const selectMenuForm = {};

  menu.forEach((item) => {
    if (!selectMenuForm[item.tema]) {
      selectMenuForm[item.tema] = {
        tema: item.tema,
        id: item.id,
      };
    }
  });

  const selectArray = (Object.values(selectMenuForm));

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (url.length < 3 || url.length > 100) {
      toast.error('URL precisa ter entre 3 e 100 caracteres');
      formErrors = true;
    }

    if (descricao.length < 3 || descricao.length > 510) {
      toast.error('Descrição precisa ter entre 3 e 510 caracteres');
      formErrors = true;
    }

    if (tema.length < 3 || tema.length > 100) {
      toast.error('Menu precisa ter entre 3 e 100 caracteres');
      formErrors = true;
    }

    if (curso) {
      if (curso.length < 3 || curso.length > 100) {
        toast.error('Curso precisa ter entre 3 e 100 caracteres');
        formErrors = true;
      }
    }

    if (formErrors) return;

    if (!id) {
      axios.post('/treinamento', {
        url,
        descricao,
        tema,
        curso,
      }).then(() => (
        toast.success('Vídeo cadastrado com sucesso')
      )).then(() => (
        history.push('/')
      )).catch((err) => {
        const errors = get(err, 'response.data.error', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          dispatch(actions.loginFailure());
          history.push('/login');
        }

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }
        return null;
      });
    } else {
      axios.put(`/treinamento/${id}`, {
        url,
        descricao,
        tema,
        curso,
      }).then(() => (
        toast.success('Vídeo editado com sucesso')
      )).then(() => (
        history.push('/')
      )).catch((err) => {
        const errors = get(err, 'response.data.error', []);
        const status = get(err, 'response.status', 0);

        if (status === 401) {
          toast.error('Você precisa fazer login novamente.');
          dispatch(actions.loginFailure());
          history.push('/login');
        }

        if (errors.length > 0) {
          errors.map((error) => toast.error(error));
        }
        return null;
      });
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="d-flex justify-content-center">Edição de Menu</h1>

        <Form.Group className="my-3">
          <Form.Label htmlFor="menus">Adicionar Menu ou Editar Submenu</Form.Label>
          <Form.Select
            onChange={(e) => handleSelect(e.target.value)}
            defaultValue="DEFAULT"
            id="menus"
            aria-label="Adicionar menu"
          >
            <option value="DEFAULT" disabled>Adicionar Menu ou Editar Submenu</option>

            <option value="ad">Adicionar Menu</option>

            {menu.map((item) => (
              <option key={item.id} value={item.id}>
                {item.curso.length === 0 ? item.tema : item.curso}
              </option>
            ))}

          </Form.Select>
        </Form.Group>
        {show && (
          <Form onSubmit={handleSubmit}>
            <h1 className="d-flex justify-content-center">{id ? 'Editar Aula' : 'Cadastrar Aula'}</h1>
            <Form.Group controlId="formGroupURL" className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control value={url} type="text" placeholder="URL" onChange={(e) => setUrl(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formGroupDescricao" className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mb-3" type="text" placeholder="Descrição" />
            </Form.Group>
            {!id && (
              <Form.Group className="my-3">
                <Form.Label htmlFor="handle-select-menu">Adicionar ou Selecionar Menu</Form.Label>
                <Form.Select
                  onChange={(e) => handleSelectMenu(e.target.value)}
                  defaultValue="DEFAULT"
                  id="handle-select-menu"
                  aria-label="Adicionar menu"
                >
                  <option value="DEFAULT" disabled>Adicionar ou Selecionar Menu</option>

                  <option value="ad">Adicionar Menu</option>

                  {selectArray.map((item) => (
                    <option
                      key={item.id}
                      value={item.tema}
                    >
                      {item.tema}
                    </option>
                  ))}

                </Form.Select>
              </Form.Group>
            )}
            {(showAddMenu || id) && (
              <Form.Group controlId="formGroupTema" className="mb-3">
                <Form.Label>Menu</Form.Label>
                <Form.Control value={tema} onChange={(e) => setTema(e.target.value)} className="mb-3" type="text" placeholder="Menu" />
              </Form.Group>
            )}
            <Form.Group controlId="formGroupCurso" className="mb-3">
              <Form.Label>SubMenu</Form.Label>
              <Form.Control
                onChange={(e) => setCurso(e.target.value)}
                value={curso}
                type="text"
                placeholder="SubMenu"
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit">
                {id ? 'Editar Aula' : 'Cadastrar Aula'}
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
}
