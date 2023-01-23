import React from 'react';
import { Container, Section, Content, Input, Cards } from './style';
import Sidebar from './../Sidebar/index';
import Navbar from './../Navbar/index';
import ProductCard from './../ProductCard/index';
import { data } from './../../mock/data';

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Section>
        <Sidebar />
        <Content>
          <Input placeholder="Search in category" />
          <Cards>
            {data.map(({ id, title }) => (
              <ProductCard title={title} />
            ))}
          </Cards>
        </Content>
      </Section>
    </Container>
  );
};

export default Home;
