import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
// components
import App from './App';
import Error from 'components/Error';
import Form from 'components/Form';
import Home from 'components/Home';
import List from 'components/List';
// Styles
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="home" element={<Home />} />
          <Route path="list" element={<List />} >
            <Route path="add" element={<Form />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

