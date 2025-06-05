import { useState, FocusEvent, forwardRef } from "react";
import "./Textarea.scss";

interface FloatingLabelTextAreaProps {
  label: string;
  id?: string;
  name?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextAreaProps
>(({ label, id, name, required = false, value, onChange, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) setIsFocused(false);
  };
  console.log(value, onChange);

  return (
    <div className={`textarea-wrapper ${isFocused ? "active" : ""}`}>
      <label htmlFor={id} className="textarea-label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className="textarea-field"
        ref={ref}
        {...rest}
      />
    </div>
  );
});
