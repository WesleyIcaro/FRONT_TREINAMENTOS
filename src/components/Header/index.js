import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import {
  ButtonGroup, Dropdown, DropdownButton, Button, Offcanvas,
} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { toast } from 'react-toastify';
import * as actions from '../../store/modules/auth/actions';
import cieeImage from '../../images/logo.png';

import { Nav, Menu } from './styled';
import axios from '../../services/axios';

export default function Header() {
  const dispath = useDispatch();

  const nivel = useSelector((state) => state.auth.user.nivel);

  const [show, setShow] = useState(false);
  const [menu, setMenu] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  }, [history, dispatch]);

  const selecionarVideo = async (value) => {
    if (value) {
      history.push(`/cursos/${value}`);
      handleClose();
    } else {
      history.push('/');
      handleClose();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispath(actions.loginFailure());
    history.push('/');
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    history.push('/cadastrar_aula');
    handleClose();
  };

  const menuAgrupado = {};

  menu.forEach((item) => {
    if (!menuAgrupado[item.tema]) {
      menuAgrupado[item.tema] = {
        tema: item.tema,
        cursos: [],
      };
    }
    if (item.curso.length > 0) {
      menuAgrupado[item.tema].cursos.push({
        curso: item.curso, id: item.id,
      });
    }
  });

  const menuArray = (Object.values(menuAgrupado));

  return (
    <Menu>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Treinamentos</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="p-0"
          style={{
            display: 'flex', textAlign: '', flexDirection: 'column', justifyContent: 'space-between',
          }}
        >
          <ButtonGroup vertical className="w-100 p-n0">

            {menu.map((item) => (
              (item.curso.length === 0)
              && (
                <Button key={uuidv4()} size="sm" onClick={(e) => selecionarVideo(e.target.value)} value={item.id} variant="light">
                  {item.tema}
                </Button>
              )
            ))}

            {menuArray.map((item) => (
              (item.cursos.length > 0) && (
                <DropdownButton
                  key={uuidv4()}
                  size="sm"
                  variant="light"
                  as={ButtonGroup}
                  title={item.tema}
                  id="bg-vertical-dropdown-1"
                  className="w-100"
                  align="end"
                >
                  {
                    item.cursos.map((itm) => (
                      <Dropdown.Item
                        key={itm.id}
                        as={Button}
                        onClick={(e) => selecionarVideo(e.target.value)}
                        value={itm.id}
                      >
                        {itm.curso}
                      </Dropdown.Item>
                    ))
                  }
                </DropdownButton>
              )))}

          </ButtonGroup>
          {(nivel === '3') && (
            <ButtonGroup vertical className="w-100 p-n0">
              <Button size="sm" className="w-100 " onClick={handleCadastro} variant="light">Administração</Button>
              <Button size="sm" className="w-100 " onClick={handleLogout} variant="light">Sair</Button>
            </ButtonGroup>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      <Nav>

        <Button
          className="icon-color"
          onClick={handleShow}
        >
          <FaBars size={24} />
        </Button>

        <Link to="/" alt="Home">
          <img src={cieeImage} alt="Logo do CIEEMG" />
        </Link>

      </Nav>
    </Menu>
  );
}
