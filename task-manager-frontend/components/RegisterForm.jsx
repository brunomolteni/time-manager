import {
  ControlGroup,
  InputGroup,
  Callout,
  Card,
  Elevation,
  Intent,
  AnchorButton,
} from "@blueprintjs/core";
import Link from "next/link";

import { ConnectedForm, ConnectedInput } from ".";

const validation = (values) => {
  const errors = {};
  if (!values.email) errors.identifier = "Email is required";
  if (!values.username) errors.username = "User is required";
  if (!values.password) errors.password = "Password is required";

  return errors;
};

export default ({ onSubmit, error, done }) => (
  <Card elevation={Elevation.TWO} className="login-form u-flex-col">
    {error && (
      <Callout title={error} intent={Intent.DANGER} className="u-mb-1">
        Incorrect user or password
      </Callout>
    )}
    {done && (
      <Callout
        title="You registered correctly"
        intent={Intent.SUCCESS}
        className="u-mb-1"
      >
        <Link href="/login">
          <AnchorButton>Login Now</AnchorButton>
        </Link>
      </Callout>
    )}
    <ConnectedForm
      onSubmit={onSubmit}
      submitLabel="Register"
      validate={validation}
    >
      <ControlGroup fill vertical>
        <ConnectedInput
          component={InputGroup}
          name="email"
          type="email"
          label="Email"
          leftIcon="envelope"
          large
          required
        />
        <ConnectedInput
          component={InputGroup}
          name="username"
          type="text"
          label="User"
          leftIcon="user"
          large
          required
        />
        <ConnectedInput
          component={InputGroup}
          name="password"
          type="password"
          label="Password"
          leftIcon="key"
          large
          required
        />
      </ControlGroup>
    </ConnectedForm>
  </Card>
);
