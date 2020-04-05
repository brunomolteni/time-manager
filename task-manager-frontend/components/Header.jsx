import { Button, Navbar, Alignment, Classes } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

import { SettingsForm } from "../components";
import { uiActions, userActions } from "../redux";

export default ({ children }) => {
  const user = useSelector((state) => state.user);
  const { settings } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  const toggleSettings = () => dispatch(uiActions.toggleSettings());
  const logOut = () => dispatch(userActions.logout());
  const editUser = (values) => dispatch(userActions.edit(values));

  return (
    <>
      <Navbar fixedToTop>
        <Navbar.Group>
          <Navbar.Heading className="u-flex-row">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              className="u-mr-1"
              default
            >
              <path d="M13 4.055c4.5.497 8 4.312 8 8.945v9H3v-9c0-4.633 3.5-8.448 8-8.945V1h2v3.055zM12 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            </svg>
            <h1>Work-o-tron 3000</h1>
          </Navbar.Heading>
          <Navbar.Divider />
          {children}
        </Navbar.Group>
        {user.id && (
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Button icon="cog" onClick={toggleSettings}>
              Settings
            </Button>
            <Button
              minimal
              icon="log-out"
              onClick={logOut}
              loading={user.loggingOut}
            >
              Logout
            </Button>
          </Navbar.Group>
        )}
      </Navbar>
      {user.id && (
        <SettingsForm
          isOpen={settings.open}
          onClose={toggleSettings}
          onSubmit={editUser}
          user={user}
        />
      )}
    </>
  );
};
