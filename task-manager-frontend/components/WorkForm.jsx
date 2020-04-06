import {
  Drawer,
  InputGroup,
  NumericInput,
  Button,
  Intent,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { ConnectedInput, ConnectedForm } from ".";
import { useActions } from "../hooks";
import { uiActions, workActions } from "../redux";

const jsDateFormatter = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: (date) => date.toLocaleDateString(),
  parseDate: (str) => new Date(str).toLocaleDateString(),
  placeholder: "D/M/YYYY",
  showActionsBar: true,
};

const workValidation = Yup.object().shape({
  task: Yup.string().required("Required"),
  duration: Yup.number()
    .min(1, "So you didn't actually worked on anything then.")
    .max(24, "Oh Really? Well a day only has 24 hours, you know?")
    .required("Required"),
  date: Yup.date().required("Required"),
});

export default ({ refresh }) => {
  const user = useSelector((state) => state.user);
  const { form } = useSelector((state) => state.ui);

  const actions = useActions({ ...uiActions, ...workActions });

  const formValues = form.editing
    ? { ...form.editing, date: new Date(form.editing.date) }
    : { user: `${user.id}`, date: new Date() };

  const close = form.editing ? actions.finishEditing : actions.toggleForm;

  const addWork = (item) => actions.createWork(item).then(refresh);
  const editWork = (item) => actions.editWork(item).then(refresh);
  const deleteWork = (item) => actions.deleteWork(item).then(refresh);

  return (
    <Drawer
      isOpen={form.open}
      size="250px"
      title={form.editing ? "Edit" : "Log worked hours"}
      icon={form.editing ? "settings" : "add"}
      onClose={() => close()}
      className={user.darkMode ? "bp3-dark" : null}
    >
      <div className="u-padded">
        <ConnectedForm
          onSubmit={form.editing ? editWork : addWork}
          initialValues={formValues}
          validationSchema={workValidation}
          submitLabel="Save"
        >
          <ConnectedInput
            component={InputGroup}
            placeholder="Killer app"
            autoFocus
            name="task"
            label="What did you work on?"
          />
          <ConnectedInput
            component={NumericInput}
            placeholder="8"
            name="duration"
            label="How many hours?"
            min="1"
            max="24"
          />
          <ConnectedInput
            component={DateInput}
            name="date"
            label="When?"
            {...jsDateFormatter}
            highlightCurrentDay
            initialMonth={new Date()}
            maxDate={new Date()}
          />
        </ConnectedForm>
        {form.editing && (
          <Button
            intent={Intent.DANGER}
            fill
            large
            className="u-mt-1"
            onClick={() => deleteWork(form.editing.id)}
            loading={form.deleting}
          >
            Delete
          </Button>
        )}
      </div>
    </Drawer>
  );
};
