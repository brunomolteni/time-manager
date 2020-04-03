import { ControlGroup, InputGroup, Button, Callout } from "@blueprintjs/core";

export default ({ onSubmit, submitting, error }) => {
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
        <Button
          type="submit"
          icon="log-in"
          large
          loading={submitting}
          disabled={submitting}
        >
          Login
        </Button>
      </ControlGroup>
      {error && (
        <Callout title="There was an error" intent={Intent.DANGER}>
          {error}
        </Callout>
      )}
    </form>
  );
};
