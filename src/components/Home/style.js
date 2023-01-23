import styled from 'styled-components';

const Container = styled.div`
  background-color: #444;
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 0 auto;
  gap: 20px;
  padding: 0 20px 20px 20px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: auto;
`;

const Input = styled.input`
  width: 600px;
  height: 40px;
  text-align: center;
  border: none;
  border-radius: 5px;

  :focus {
    outline: none;
    border: 2px solid skyblue;

    ::placeholder {
      font-weight: 500;
      /* color: ; */
    }
  }
`;

const Cards = styled.div`
  /* background-color: gray; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  gap: 20px;
`;

export { Container, Section, Content, Input, Cards };
