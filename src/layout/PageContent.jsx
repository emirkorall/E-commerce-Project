import React from 'react';

const PageContent = ({ children }) => {
  return (
    <main className="flex-grow w-full">
      {children}
    </main>
  );
};

export default PageContent; 