import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 0 5px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
`;

Logo.Icon = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
`;
Logo.Text = styled.div`
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
`;

export { Container, Logo };
