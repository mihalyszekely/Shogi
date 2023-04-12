import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Shogi from './components/shogi';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilState,
} from 'recoil';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Shogi />
  </RecoilRoot>
);
// hali