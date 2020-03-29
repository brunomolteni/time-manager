import {
  Drawer,
  ControlGroup,
  InputGroup,
  FormGroup,
  Button,
  NumericInput
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: date => date.toLocaleDateString(),
  parseDate: str => new Date(str),
  placeholder: "M/D/YYYY"
};

export default ({ isOpen, close }) => (
  <Drawer
    isOpen={isOpen}
    isCloseButtonShown
    size="250px"
    title="Add worked hours"
  >
    <ControlGroup className="padded" vertical>
      <FormGroup label="What did you work on?" labelFor="task">
        <InputGroup id="task" placeholder="killer app" autoFocus />
      </FormGroup>
      <FormGroup label="How many hours?" labelFor="hours">
        <NumericInput id="hours" fill placeholder="8" />
      </FormGroup>
      <FormGroup label="When?" labelFor="date">
        <DateInput id="date" {...jsDateFormatter} fill />
      </FormGroup>
      <Button large onClick={close}>
        Add
      </Button>
    </ControlGroup>
  </Drawer>
);
