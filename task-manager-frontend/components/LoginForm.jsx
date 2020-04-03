import { ControlGroup, InputGroup, Callout } from "@blueprintjs/core";
import { ConnectedForm, ConnectedInput } from "./";

export default ({ onSubmit, error }) => (
  <>
    <ConnectedForm onSubmit={onSubmit}>
      <ControlGroup vertical={false} fill>
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
    {error && (
      <Callout title="There was an error" intent={Intent.DANGER}>
        {error}
      </Callout>
    )}
  </>
);
