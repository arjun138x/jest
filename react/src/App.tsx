import React from "react";
import LoginComponent from "./LoginComponent";
import LoginService from "./services/LoginService";

function App() {
  const loginService = new LoginService();

  const setToken = (token: string) => {
    console.log(`received the token ${token}`);
  };
  return (
    <div>
      <LoginComponent loginService={loginService} setToken={setToken} />
    </div>
  );
}

export default App;
