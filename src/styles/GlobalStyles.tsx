import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

*,
  :after,
  :before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

html {
  font-family: 'Noto Sans KR', sans-serif;
  word-break: keep-all;

  * {
      -ms-overflow-style: none; 
      scrollbar-width: none; 
      ::-webkit-scrollbar {
        display: none; 
      }
    }
}

body, html, #root {
  width: 100%;
  height: 100%;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
}

:root {
    --color-white: #fff;
    --color-black: #000;
    --color-border: #cdcdcd;
    --color-hover: #e8e8e8;
    --color-subTitle: #9fa1a7;
    --color-catchphrase: #11482d;
    --color-main: #ff375c;
    --color-loading: #f1f1f1;
    --color-mobileBackground: #eeeeee;
  }

`;

export default GlobalStyle;
