import 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  /* @import url('https://fonts.googleapis.com/css?family=Noto+Sans'); */

  * {
    box-sizing: border-box;
  }

  html {
    overflow: hidden;
    height: 100%;
  }

  body {
    height: 100%;
    overflow: auto;

    font-family: 'Arial', sans-serif;
    font-size: 15px;
    letter-spacing: 0;

    color: #333;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
