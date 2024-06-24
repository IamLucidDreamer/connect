import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          {routes.map((route) => {
            const { path, component: Component, isProtected } = route;
            return (
              <Route
                key={path}
                path={path}
                element={
                  isProtected ? (
                    <PrivateRoute>
                      <Component />
                    </PrivateRoute>
                  ) : (
                    <Component />
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

