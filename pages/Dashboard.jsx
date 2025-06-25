import React, { useState } from 'react';



import MainContent from '../src/components/MainContent';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (credentials) => {
    // Authentication logic here
    console.log('Login with:', credentials);
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {!isAuthenticated ? (
        <div className="flex items-center justify-center h-full">
          {/* <LoginForm  onLogin={handleLogin}/> */}
        </div>
      ) : (
        <MainContent/>
      )}
    </div>
  );
};

export default Dashboard;