import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

:root{
  --toastify-icon-color-success: white;
  --toastify-icon-color-error: white;
}

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  background: rgb(230, 230, 230);
  color: ${colors.primaryDarkColor};
}

html, body, #root {
  height: 100%;
}

button {
  cursor: pointer;
  background: ${colors.primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
}

a {
  text-decoration: none;
  color: ${colors.primaryColor};
}

ul {
  list-style: none;
}

body .Toastify .Toastify__toast-container .Toastify__toast--success {
  background: ${colors.successColor};
  color: white;
}

.Toastify__progress-bar--success {
  background: white;
}

body .Toastify .Toastify__toast-container .Toastify__toast--error {
  background: ${colors.errorColor};
  color: white;

}

.Toastify__progress-bar--error {
  background: white;
}
`;

export const Container = styled.section`
  width: 90%;
  height: 85vh;
  overflow: auto;
  margin: 1rem auto;
  background: white;
  padding:1rem;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
