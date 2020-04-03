import { useField } from "formik";
import { FormGroup, Intent } from "@blueprintjs/core";

export default ({
  component: Input,
  name,
  label,
  checkbox,
  radio,
  multiple,
  ...rest
}) => {
  const type = (radio && "radio") || (checkbox && "checkbox") || undefined;
  const [field, meta, helpers] = useField({ name, type, multiple });

  console.log(name, field.value);

  // avoid getting errors about changing an uncontrolled input to be controlled
  field.value = field.value || "";

  // fix Blueprint's inputs that use non-standard props
  switch (Input.displayName) {
    case "Blueprint3.NumericInput":
      field.onValueChange = (value) =>
        field.onChange({ target: { value, name, type: "number" } });
      break;
    case "Blueprint3.DateInput":
      const onChange = field.onChange;
      const date = new Date();
      field.onChange = (value) => onChange({ target: { value, name } });
      field.value = field.value || null;
      break;
    default:
      break;
  }

  return (
    <FormGroup
      label={label}
      labelFor={field.name}
      helperText={meta.error || null}
      intent={meta.error && Intent.DANGER}
    >
      <Input
        fill="true"
        {...field}
        {...rest}
        intent={meta.error && Intent.DANGER}
      />
    </FormGroup>
  );
};
