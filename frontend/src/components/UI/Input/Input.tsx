import { useState, FocusEvent, forwardRef } from "react";
import "./Input.scss";

interface FloatingLabelInputProps {
  label: string;
  id?: string;
  type?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string
}

export const Input = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, id, type = "text", name, required = false, value, onChange, className, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    console.log(value, onChange);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) setIsFocused(false);
    };

    return (
      <div className={`input-wrapper ${isFocused ? "active" : ""}`}>
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`input-field ${className}`}
          ref={ref}
          {...rest} 
        />
      </div>
    );
  }
);
