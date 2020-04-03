import { useState } from "react";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import nookies from "nookies";

import { user as userActions } from "../actions";
import { SettingsForm } from "../components";

import { config } from "../util";

export default ({ children, user }) => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const toggleSettings = () => setSettingsOpen(!isSettingsOpen);

  // Save settings then update the cookies
  const editUser = (values) =>
    userActions.edit(user.id, { ...user, ...values }).then((newUser) => {
      nookies.set(null, "user", JSON.stringify(newUser), config.COOKIES);
    });

  return (
    <>
      <Navbar fixedToTop>
        <Navbar.Group>
          <Navbar.Heading className="u-flex-row">
            <img src="/logo.svg" className="u-mr-1" />
            Work-o-tron 3000
          </Navbar.Heading>
          <Navbar.Divider />
          {children}
        </Navbar.Group>
        {user && (
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Button icon="cog" onClick={toggleSettings}>
              Settings
            </Button>
            <Button minimal icon="log-out" onClick={userActions.logout}>
              Logout
            </Button>
          </Navbar.Group>
        )}
      </Navbar>
      <SettingsForm
        isOpen={isSettingsOpen}
        onClose={toggleSettings}
        onSubmit={editUser}
      />
    </>
  );
};
