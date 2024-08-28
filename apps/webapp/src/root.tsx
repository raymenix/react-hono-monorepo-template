import { RouterProvider } from 'react-router-dom';

import 'virtual:uno.css';
import './styles/index.css';

import { Router } from './router/router';

function Root() {
  return (
    <>
      <RouterProvider router={Router} />
    </>
  );
}

export default Root;
