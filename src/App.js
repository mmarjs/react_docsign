// App.js (or your main component)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Creator from './v2/Creater';
import Signer from './v2/Signer/';
import "./styles.css";
//import './mainAppImports'

function App() {


  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/creator">Creator</Link>
          </li>
          <li>
            <Link to="/signer">Signer</Link>
          </li>
        </ul>
        <hr />
      </div>
      <Routes>
        <Route path="/creator" element={<Creator />} />
        <Route path="/signer" element={<Signer />} />
      </Routes>
    </Router>
  );
}

export default App;
