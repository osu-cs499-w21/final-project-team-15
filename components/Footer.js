import React, {useContext} from 'react';
import styled from '@emotion/styled';


const FooterWrapper = styled.div`
  height: 50px;
  margin-top: auto;
  display: flex;
  align-items: center;
  background-color: lightgray;
  color: #373737;
  
  a {
    margin: 15px;
  }
`

function Footer() {
  return (
    <FooterWrapper>
      <a href="https://icons8.com/icon/43246/rewind">Rewind icon by Icons8</a>
    </FooterWrapper>
  );
}

export default Footer;
