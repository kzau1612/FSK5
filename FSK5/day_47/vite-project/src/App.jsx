import "./App.css";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/Logout";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <Profile user={user} />
          <LogoutButton />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
