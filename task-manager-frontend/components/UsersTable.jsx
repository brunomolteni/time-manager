import { HTMLTable, Spinner } from "@blueprintjs/core";

import { useActions } from "../hooks";
import { uiActions } from "../redux";

const UsersTable = ({ users }) => {
  const { startEditing } = useActions(uiActions);

  if (typeof users === "undefined" || !users.length) {
    //  ----------------------- Spinner ------------------------
    return <Spinner />;
  } else {
    //  ----------------------- Table ------------------------
    return (
      <HTMLTable condensed interactive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.id} onClick={() => startEditing(user)}>
              <td>{user.id}</td>
              <td>{user.username} </td>
              <td>{user.email}</td>
              <td>{user.role.name}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    );
  }
};

UsersTable.displayName = "UsersTable";

export default UsersTable;
