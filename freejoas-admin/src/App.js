import React from 'react';
import Router from './components/router';
import { UserProvider } from './service/UserContext';

function App() {
  return (
    <div className='max-container'>
      <UserProvider>
        <Router />
      </UserProvider>
    </div>
  );
}

export default App;
