import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from '@/components/page-container';

import './index.less';

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
