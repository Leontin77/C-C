import { useState, FocusEvent } from "react";
import "./Input.scss";

interface FloatingLabelInputProps {
  label: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  required?: boolean;
}

export const Input = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  name,
  required = false,
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) setIsFocused(false);
  };

  return (
    <div className={`input-wrapper ${isFocused || value ? "active" : ""}`}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className="input-field"
      />
    </div>
  );
};
