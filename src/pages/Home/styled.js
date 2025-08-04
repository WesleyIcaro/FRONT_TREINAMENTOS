import styled from 'styled-components';

export const Title = styled.h1`
display: flex;
text-align: center;
flex-direction: column;
`;

export const Paragrafo = styled.p`
font-size: 1.2rem;
margin: 2rem 1rem 0rem 1rem;
text-align: center;

@media (max-width: 580px) {
  margin: 0.5rem 1rem 0rem 1rem;
}
`;
