import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './routers/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode></React.StrictMode> 이걸로 감싸면 잠재적 이슈를 발견해준다나 뭐라나
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
