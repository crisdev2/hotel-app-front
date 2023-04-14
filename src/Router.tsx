import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './components/pages/Home';

const routes = createBrowserRouter([
  {
    path: "/*",
    element: <App><Home /></App>,
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />
}

export default Router