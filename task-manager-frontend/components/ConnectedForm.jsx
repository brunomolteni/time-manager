import { Formik } from "formik";
import { Button, Intent } from "@blueprintjs/core";

export default ({
  children,
  onSubmit,
  initialValues,
  submitLabel = "Submit",
  ...formProps
}) => (
  <Formik
    onSubmit={onSubmit || (() => false)}
    initialValues={initialValues || {}}
    {...formProps}
  >
    {({ handleChange, handleSubmit, isSubmitting, isValidating, isValid }) => {
      return (
        <form
          className="u-padded"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          {children}
          <Button
            large
            type="submit"
            intent={Intent.SUCCESS}
            fill="true"
            disabled={isSubmitting || !isValid}
            loading={isSubmitting || isValidating}
          >
            {submitLabel}
          </Button>
        </form>
      );
    }}
  </Formik>
);
