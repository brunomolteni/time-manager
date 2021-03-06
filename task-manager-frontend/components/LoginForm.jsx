import {
  ControlGroup,
  InputGroup,
  Callout,
  Card,
  Elevation,
  Intent,
  AnchorButton,
  ButtonGroup,
} from "@blueprintjs/core";
import Link from "next/link";
import { ConnectedForm, ConnectedInput } from "./";

const validation = (values) => {
  const errors = {};
  if (!values.identifier) errors.identifier = "User is required";
  if (!values.password) errors.password = "Password is required";

  return errors;
};

export default ({ onSubmit, error }) => (
  <Card elevation={Elevation.TWO} className="login-form u-flex-col">
    {error && (
      <Callout title={error} intent={Intent.DANGER} className="u-mb-1">
        Incorrect user or password
      </Callout>
    )}
    <ConnectedForm
      onSubmit={onSubmit}
      submitLabel="Login"
      validate={validation}
    >
      <ControlGroup fill>
        <ConnectedInput
          component={InputGroup}
          name="identifier"
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
    <ButtonGroup minimal className="u-mt-1">
      <Link href="/register">
        <AnchorButton>Register</AnchorButton>
      </Link>
    </ButtonGroup>
  </Card>
);
