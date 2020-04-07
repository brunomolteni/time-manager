import {
  Drawer,
  InputGroup,
  NumericInput,
  HTMLSelect,
  Button,
  Intent,
  Callout,
} from "@blueprintjs/core";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import { ConnectedInput, ConnectedForm } from ".";
import { useActions } from "../hooks";
import { uiActions, userActions } from "../redux";

const userValidation = Yup.object().shape({
  username: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  hoursPerDay: Yup.number()
    .min(1, "Between 1 and 24")
    .max(24, "Between 1 and 24")
    .required("Required"),
});

export default ({ refresh }) => {
  const user = useSelector((state) => state.user);
  const { form } = useSelector((state) => state.ui);

  const actions = useActions({ ...uiActions, ...userActions });

  const editUser = (item) => actions.editUser(item).then(refresh);
  const deleteUser = () => actions.deleteUser(form.editing.id).then(refresh);

  const parsedValues = {
    ...form.editing,
    role: form.editing && form.editing.role.id,
  };

  return (
    <Drawer
      isOpen={form.open}
      size="250px"
      title={"Edit"}
      icon={"settings"}
      onClose={() => actions.finishEditing()}
      className={user.darkMode ? "bp3-dark" : null}
    >
      <div className="u-padded">
        <ConnectedForm
          onSubmit={editUser}
          initialValues={parsedValues}
          validationSchema={userValidation}
          submitLabel="Save"
        >
          <ConnectedInput
            component={InputGroup}
            autoFocus
            name="username"
            label="Username"
          />
          <ConnectedInput
            component={InputGroup}
            autoFocus
            name="email"
            label="Email"
          />
          <ConnectedInput
            component={HTMLSelect}
            autoFocus
            name="role"
            label="Role"
            children={
              <>
                <option value="1">User</option>
                <option value="3">Manager</option>
              </>
            }
          />
          <ConnectedInput
            component={NumericInput}
            name="hoursPerDay"
            label="Work hours per day"
            min="1"
            max="24"
          />
        </ConnectedForm>
        <Button
          intent={Intent.DANGER}
          fill
          large
          className="u-mt-1"
          onClick={() => deleteUser()}
          loading={form.deleting}
        >
          Delete
        </Button>
        {form.error && (
          <Callout
            title="There was an error"
            intent={Intent.DANGER}
            className="u-mt-1"
          >
            Try again
          </Callout>
        )}
      </div>
    </Drawer>
  );
};
