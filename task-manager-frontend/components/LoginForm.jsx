import { ControlGroup, InputGroup, Button, Card } from "@blueprintjs/core";

export default ({ onSubmit, submitting }) => {
  return (
    <form onSubmit={onSubmit} method="POST" target="/login">
      <ControlGroup vertical={false} fill>
        <InputGroup
          large
          type="text"
          placeholder="User"
          name="user"
          leftIcon="user"
        />
        <InputGroup
          large
          type="password"
          placeholder="Password"
          name="password"
          leftIcon="key"
        />
        <Button type="submit" large loading={submitting} disabled={submitting}>
          Login
        </Button>
      </ControlGroup>
    </form>
  );
};
