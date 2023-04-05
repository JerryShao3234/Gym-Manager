import { Controller } from "react-hook-form";
import React, { useMemo } from "react";

interface GymInputProps {
  label: string;
  control: any;
  formFieldName: string;
  rules: { required: boolean };
  className?: string;
  inputError: any;
  inputType?: string;
}
export function GymInput({
  control,
  formFieldName,
  rules,
  label,
  className,
  inputError,
  inputType,
}: GymInputProps) {
  const validationPattern = useMemo(() => {
    // Patterns are from https://www.w3schools.com/tags/att_input_pattern.asp
    switch (inputType) {
      case "email":
        return "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$";
      case "time":
        return undefined;
      case "numerical":
        return "[.0-9]+";
      default:
        return "[a-zA-Z0-9\\s]+";
    }
  }, [inputType]);

  const validationErrMsg = useMemo(() => {
    switch (inputType) {
      case "email":
        return undefined;
      case "time":
        return "Please input a valid time.";
      case "numerical":
        return "Please enter a valid number.";
      default:
        return "Only alphanumeric characters and spaces are allowed.";
    }
  }, [inputType]);

  return (
    <span className="input-group">
      <label>{`${label}${rules.required ? "(*)" : ""} : `}</label>
      <Controller
        name={formFieldName}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <input
            className={`${className} ${inputError ? "error" : ""}`}
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
            }}
            onBlur={onBlur}
            pattern={validationPattern}
            title={validationErrMsg}
            type={inputType}
          ></input>
        )}
        rules={rules}
      />
      {inputError && <p className="error">{`${label} is required.`}</p>}
    </span>
  );
}
