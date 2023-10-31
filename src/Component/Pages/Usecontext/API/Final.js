import React from "react";
import { UserProvider } from "./UserContext";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

function Final() {
  return (
    <UserProvider>
      <div>
        <UserForm />
        <UserTable />
      </div>
    </UserProvider>
  );
}

export default Final;
