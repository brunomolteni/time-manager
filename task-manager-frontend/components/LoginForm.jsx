import { ControlGroup, InputGroup, Button, Card } from "@blueprintjs/core";

export default () => (
  <ControlGroup vertical={false}>
    <InputGroup placeholder="User" large />
    <InputGroup placeholder="Password" large />
    <Button large>Login</Button>
  </ControlGroup>
);
