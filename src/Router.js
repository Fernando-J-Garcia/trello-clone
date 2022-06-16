import React from "react";
import Account from "./Pages/Account/Account";
import Workspace from "./Pages/Workspace/Workspace";
import { useAuth } from "./contexts/AuthContext";

function UserDoesNotExist(user) {
  return user === "" || user === undefined || user === null;
}

export default function Router() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  if (UserDoesNotExist(currentUser)) return <Account />;
  else return <Workspace />;
}
