import {
  Drawer,
  ControlGroup,
  InputGroup,
  FormGroup,
  Button,
  NumericInput,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: (date) => date.toISOString(),
  parseDate: (str) => new Date(str),
  placeholder: "M/D/YYYY",
};

export default ({ isOpen, onClose, onSubmit }) => (
  <Drawer
    isOpen={isOpen}
    isCloseButtonShown
    size="250px"
    title="Add worked hours"
    onClose={onClose}
  >
    <form className="u-padded" onSubmit={onSubmit}>
      <ControlGroup vertical>
        <FormGroup label="What did you work on?" labelFor="task">
          <InputGroup placeholder="killer app" autoFocus name="task" />
        </FormGroup>
        <FormGroup label="How many hours?" labelFor="hours">
          <NumericInput fill placeholder="8" name="duration" />
        </FormGroup>
        <FormGroup label="When?" labelFor="date">
          <DateInput
            {...jsDateFormatter}
            fill
            highlightCurrentDay
            className="add-work-date"
          />
        </FormGroup>
        <Button large type="submit">
          Add
        </Button>
      </ControlGroup>
    </form>
  </Drawer>
);
