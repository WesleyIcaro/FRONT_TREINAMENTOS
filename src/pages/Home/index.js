import React from 'react';

import { Container } from '../../styles/GlobalStyles';
import { Title, Paragrafo } from './styled';
import Header from '../../components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Title>Plataforma de Treinamentos CIEE/MG</Title>
        <Paragrafo>
          Bem-vindo!
        </Paragrafo>
        <Paragrafo>
          É com grande satisfação que recebemos você em
          nossa equipe CIEE/MG. Estamos muito animados
          em tê-lo(a) conosco e esperamos que sua
          jornada aqui seja repleta de crescimento
          pessoal e profissional.
        </Paragrafo>
        <Paragrafo>
          No CIEE/MG, valorizamos a diversidade de experiências,
          habilidades e perspectivas. Acreditamos que cada
          membro da nossa equipe contribui de forma única
          para o nosso sucesso coletivo. Por isso, queremos
          que você se sinta parte integrante desta
          família desde o primeiro dia.
        </Paragrafo>
        <Paragrafo>
          Este é um lugar onde a colaboração é incentivada, onde
          as ideias são valorizadas e onde o trabalho em equipe
          é fundamental. Estamos comprometidos em proporcionar
          um ambiente de trabalho inclusivo, onde todos
          sintam-se respeitados e motivados a alcançar
          seu máximo potencial.
        </Paragrafo>
        <Paragrafo>
          Durante seu tempo aqui, você terá a oportunidade de aprender
          , crescer e se desenvolver. Estamos empenhados
          em oferecer suporte e recursos para ajudá-lo(a) a alcançar seus
          objetivos profissionais, seja através de treinamentos,
          mentorias ou programas de desenvolvimento.
        </Paragrafo>
        <Paragrafo>
          Além disso, queremos que você se sinta parte da comunidade CIEE/MG.
          Estamos sempre abertos a feedbacks e sugestões,
          pois acreditamos que é através do diálogo aberto que podemos crescer
          e melhorar continuamente.
        </Paragrafo>
        <Paragrafo>
          Desejamos a você um ótimo treinamento.
        </Paragrafo>

      </Container>
    </>
  );
}
