import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { logout } from "../actions";

export default ({ children, isLoggedIn }) => {
  return (
    <Navbar fixedToTop>
      <Navbar.Group>
        <Navbar.Heading className="u-flex-row">
          <img src="/logo.svg" />
          Task-Bot 3000
        </Navbar.Heading>
        <Navbar.Divider />
        {children}
      </Navbar.Group>
      {isLoggedIn && (
        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />
          <Button outlined="true" icon="log-out" onClick={logout}>
            Logout
          </Button>
        </Navbar.Group>
      )}
    </Navbar>
  );
};
