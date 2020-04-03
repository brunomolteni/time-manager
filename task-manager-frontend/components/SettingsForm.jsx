import { Drawer, NumericInput, Switch } from "@blueprintjs/core";

import { ConnectedForm, ConnectedInput } from "./";

export default ({ isOpen, onClose, onSubmit, user }) => {
  const validation = ({ hours }) => {
    const errors = {};
    if (hours > 12) errors.hours = "Are you sure ? When do you plan to sleep ?";
    return errors;
  };

  return (
    <Drawer
      isOpen={isOpen}
      isCloseButtonShown
      size="250px"
      title="Your Settings"
      icon="cog"
      onClose={onClose}
    >
      <ConnectedForm
        onSubmit={onSubmit}
        validate={validation}
        initialValues={user}
      >
        <ConnectedInput
          component={NumericInput}
          label="Preferred working hours per day"
          placeholder="8"
          name="PreferredWorkingHourPerDay"
          min="0"
          max="24"
        />
        <ConnectedInput component={Switch} label="Dark Mode" name="DarkMode" />
      </ConnectedForm>
    </Drawer>
  );
};
