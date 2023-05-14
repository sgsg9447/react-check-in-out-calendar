import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";

interface MyTheme extends DefaultTheme {
  mainColor: string;
  subMainColor: string;
}

const GlobalStyle = createGlobalStyle<{ theme: MyTheme }>`
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
  background: transparent;
  &:active {
    transform: scale(1.2);
  }
}

:root {
    --color-white: #fff;
    --color-black: #0f0f0f;
    --color-light-gray: #D3D3D3;
    --color-main: ${(props) => props.theme.mainColor || "#ff375c"};
    --color-sub-main: ${(props) => props.theme.subMainColor || "#FEC0CA"};
  }
`;

export default GlobalStyle;
