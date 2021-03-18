import '../styles/globals.css'
import styled from '@emotion/styled';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Content = styled.div`
  margin-top: 50px;
  max-height: calc(100% - 100px);
  min-height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: papayawhip;
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Content>
        <Component {...pageProps} />
      </Content>
      <Footer />
    </>
  );
}

export default MyApp;
