import { useState, FocusEvent } from "react";
import "./TextArea.scss";

interface FloatingLabelTextAreaProps {
  label: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  required?: boolean;
}

export const Textarea = ({
  label,
  id,
  value,
  onChange,
  name,
  required = false,
}: FloatingLabelTextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!e.target.value) setIsFocused(false);
  };

  return (
    <div className={`textarea-wrapper ${isFocused || value ? "active" : ""}`}>
      <label htmlFor={id} className="textarea-label">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        className="textarea-field"
      />
    </div>
  );
};
