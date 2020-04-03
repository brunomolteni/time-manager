import {
  Drawer,
  ControlGroup,
  InputGroup,
  FormGroup,
  Button,
  NumericInput,
} from "@blueprintjs/core";

export default ({ isOpen, onClose, onSubmit }) => (
  <Drawer
    isOpen={isOpen}
    isCloseButtonShown
    size="250px"
    title="Add worked hours"
    onClose={onClose}
  >
    <form className="padded" onSubmit={onSubmit}>
      <ControlGroup vertical>
        <FormGroup label="Preferred working hours per day?" labelFor="task">
          <NumericInput fill placeholder="8" name="hours" />
        </FormGroup>
        <Button large type="submit">
          Save
        </Button>
      </ControlGroup>
    </form>
  </Drawer>
);
