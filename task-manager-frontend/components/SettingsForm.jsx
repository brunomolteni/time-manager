import { Drawer, NumericInput, Switch } from "@blueprintjs/core";

import { ConnectedForm, ConnectedInput } from "./";

export default ({ isOpen, onClose, onSubmit, user }) => {
  const validation = ({ hoursPerDay }) => {
    const errors = {};
    if (hoursPerDay > 12)
      errors.Pre1ferredWorkingHourPerDay =
        "Really !? When do you plan to sleep ?";
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
      className={user.darkMode ? "bp3-dark" : null}
    >
      <ConnectedForm
        className="u-padded"
        onSubmit={onSubmit}
        validate={validation}
        initialValues={{
          hoursPerDay: user.hoursPerDay,
          darkMode: user.darkMode,
        }}
      >
        <ConnectedInput
          component={NumericInput}
          label="Preferred working hours per day"
          placeholder="8"
          name="hoursPerDay"
          min="0"
          max="24"
        />
        <ConnectedInput
          component={Switch}
          label="Dark Mode"
          name="darkMode"
          checkbox
        />
      </ConnectedForm>
    </Drawer>
  );
};
