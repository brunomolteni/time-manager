import { Drawer, InputGroup, NumericInput } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { uiActions } from "../redux";
import { ConnectedInput, ConnectedForm } from ".";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str).toLocaleDateString(),
  placeholder: "D/M/YYYY",
  showActionsBar: true,
};

// const modifiers = {
//   isEnough: (date) => date.getDay() === 0,
//   isNotEnough: (date) => date.getDay() === 3,
// };

export default ({ onSubmit }) => {
  const user = useSelector((state) => state.user);
  const { form } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  const actions = bindActionCreators(uiActions, dispatch);
  const close = form.editing ? actions.finishEditing : actions.toggleForm;

  const formValues = form.editing ? form.editing : { user: `${user.id}` };

  return (
    <Drawer
      isOpen={form.open}
      size="250px"
      title={form.editing ? "Edit" : "Log worked hours"}
      icon={form.editing ? "edit" : "add"}
      onClose={() => close()}
      className={user.DarkMode ? "bp3-dark" : null}
    >
      <ConnectedForm
        className="u-padded"
        onSubmit={onSubmit}
        initialValues={formValues}
      >
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
};
