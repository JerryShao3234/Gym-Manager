import { Controller } from "react-hook-form";
import React from "react";

interface GymInputProps {
  label: string;
  control: any;
  formFieldName: string;
  rules: { required: boolean };
  className?: string;
  inputError: any;
}
export function GymInput({
  control,
  formFieldName,
  rules,
  label,
  className,
  inputError,
}: GymInputProps) {
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
          ></input>
        )}
        rules={rules}
      />
      {inputError && <p className="error">{`${label} is required.`}</p>}
    </span>
  );
}
