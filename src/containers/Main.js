import React from "react";
import "../index.css";

function Main({ children }) {
  return (
    <main className='h-full overflow-y-auto background'>
      <div className='container grid px-6 mx-auto'>{children}</div>
    </main>
  );
}

export default Main;
