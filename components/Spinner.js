/*
 * Spinner derived from https://tobiasahlin.com/spinkit/.
 */

import React from 'react';
import styled from '@emotion/styled';

const Bars = styled.div`
  margin: 100px auto;
  width: 60px;
  height: 60px;
  text-align: center;
  font-size: 10px;

  & > div {
    margin: 0 3px 0 0;
    background-color: #333;
    height: 100%;
    width: 7px;
    display: inline-block;
    
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    @-webkit-keyframes sk-stretchdelay {
      0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
      20% { -webkit-transform: scaleY(1.0) }
    }

    @keyframes sk-stretchdelay {
      0%, 40%, 100% { 
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
      }  20% { 
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
      }
    }
  }
`

const Rect2 = styled.div`
  &&& {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
`

const Rect3 = styled.div`
  &&& {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
`

const Rect4 = styled.div`
  &&& {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
`

const Rect5 = styled.div`
  &&& {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
`

function Spinner() {
  return (
    <Bars>
      <div></div>
      <Rect2 />
      <Rect3 />
      <Rect4 />
      <Rect5 />
    </Bars>
  )
}

export default Spinner;
