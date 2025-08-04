import styled from 'styled-components';

import login from '../../images/login.png';

export const Container = styled.div`
  width: 40%;
  height: 30rem;
  margin: 5% auto;
  background: #ffffff;
  padding: 0rem 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  .image {
      width: 20rem;
      margin-bottom: -5rem;

      @media (max-height: 1050px) {
      width: 10rem;
      margin-bottom: 0rem;
      }
   }

  @media (max-height: 1050px) {
     height: 20rem;
     gap: 0rem;
   }
`;

export const PlanoDeFundo = styled.div`
  background-image: url(${login});
  background-size: auto;
  background-repeat: repeat;
  background-attachment: fixed;
  height: 100%;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
`;
