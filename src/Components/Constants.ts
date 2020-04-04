import React from 'react';

const userContext = React.createContext({user: {}}); // Create a context object

export {
  userContext
};

export const baseUrl ="https://localhost:44334/api";