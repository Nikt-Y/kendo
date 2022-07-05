import { Grid } from '@progress/kendo-react-grid';
import React from 'react';

import './App.scss';
import TestGrid from './TestGrid';
import MyGrid from './components/MyGrid';
import EditForm from './editForm';

function App() {

  return (
    <div className="App">
      <div className="header">
        <h1>Табличка</h1>
      </div>

      <div className="table">
        <TestGrid/>
      </div>
    </div>
  );
}

export default App;
