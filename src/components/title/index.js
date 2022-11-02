import React, { useEffect, useState } from "react";
import { login, logout } from "../../utils";
import "./index.css";

export default function Title(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    if (window.walletConnection.isSignedIn()) {
      setUser(window.accountId);
    }
  }, []);

  return (
    <div className="header-wrap">
      <div className="logo">Near Tweet</div>
      {user ? (
        <>
          <div>
            <span className="user">Welcome</span>
            <span className="user">{user}</span>
          </div>
          <div className="btn-login" onClick={logout}>
            Logout
          </div>
        </>
      ) : (
        <div className="btn-login" onClick={login}>
          Login with NEAR
        </div>
      )}
    </div>
  );
}
