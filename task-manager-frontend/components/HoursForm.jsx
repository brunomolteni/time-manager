import {
  Drawer,
  ControlGroup,
  InputGroup,
  FormGroup,
  Button,
  NumericInput,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { ConnectedInput, ConnectedForm } from ".";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str),
  placeholder: "D/M/YYYY",
  showActionsBar: true,
};

export default ({ isOpen, onClose, onSubmit, initialValues }) => (
  <Drawer
    isOpen={isOpen}
    isCloseButtonShown
    size="250px"
    title="Add worked hours"
    icon="add"
    onClose={onClose}
  >
    <ConnectedForm onSubmit={onSubmit} initialValues={initialValues}>
      <ConnectedInput
        component={InputGroup}
        placeholder="Killer app"
        autoFocus
        name="Task"
        label="What did you work on?"
      />
      <ConnectedInput
        component={NumericInput}
        placeholder="8"
        name="Duration"
        label="How many hours?"
      />
      <ConnectedInput
        component={DateInput}
        name="Date"
        label="When?"
        {...jsDateFormatter}
        highlightCurrentDay
      />
    </ConnectedForm>
  </Drawer>
);
