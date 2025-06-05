import React, { useState, useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import "./CustomSelect.scss";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  control: any;
  options: Option[];
  placeholder?: string;
  label?: string;
  rules?: any;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  options,
  placeholder = "Select...",
  label,
  rules
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-select-wrapper" ref={wrapperRef}>
      {label && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <div className="custom-select">
            <div
              className="custom-select-input"
              onClick={() => setIsOpen(!isOpen)}
            >
              {options.find((opt) => opt.value === field.value)?.label ||
                placeholder}
            </div>

            {isOpen && (
              <ul className="custom-select-dropdown">
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    className="custom-select-option"
                    onClick={() => {
                      field.onChange(opt.value);
                      setIsOpen(false);
                    }}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      />
    </div>
  );
};
