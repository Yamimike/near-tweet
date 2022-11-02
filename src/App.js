import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import "./global.css";
import Title from "./components/title";
import HomePage from "./HomePage";
import AddPost from "./components/add-post";





export default function App() {
  
  const [user, setUser ] = useState("");

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      setUser(window.accountId);
    }

    
  }, []);

  
  

  return (
    <>
      <Title /> 
      <HomePage />
    </>
  );
}
