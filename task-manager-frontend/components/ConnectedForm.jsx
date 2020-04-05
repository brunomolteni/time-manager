import { Formik } from "formik";
import { Button, Intent } from "@blueprintjs/core";

export default ({
  children,
  onSubmit,
  initialValues,
  submitLabel = "Submit",
  submitFill = true,
  className,
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
          onSubmit={handleSubmit}
          onChange={handleChange}
          className={className}
        >
          {children}
          <Button
            large
            type="submit"
            intent={Intent.SUCCESS}
            fill={submitFill}
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
