import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";
import React, { useMemo } from "react";

interface GymDropdownProps {
  items: string[];
  control: any;
  label: string;
  formFieldName: string;
  rules: { required: boolean };
  inputError: any;
}
export function GymDropdown({
  items,
  control,
  formFieldName,
  rules,
  label,
  inputError,
}: GymDropdownProps) {
  const dropdownItems = useMemo(() => {
    return items.map((item) => {
      return <option key={item}>{item}</option>;
    });
  }, [items]);

  return (
    <span className="input-group">
      <label>{label + " : "}</label>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Form.Select
            onChange={(event) => {
              onChange(event.target.value);
            }}
            onBlur={onBlur}
            value={value}
          >
            {dropdownItems}
          </Form.Select>
        )}
        rules={rules}
      />
      {inputError && <p className="error">{`${label} is required.`}</p>}
    </span>
  );
}
