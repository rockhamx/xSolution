import React, { ReactEventHandler } from "react";

export interface SelectOption<V = string | number> {
  name?: string | number;
  value: V;
}

interface Props {
  label?: string;
  allOption?: boolean;
  defaultValue?: string | number;
  value: string | number;
  onChange: ReactEventHandler;
  options: SelectOption[];
}

export default function Select(props: Props) {
  const {
    label,
    allOption,
    defaultValue,
    value,
    onChange,
    options,
    ...attr
  } = props;

  return (
    <div>
      {label && <span>{label}</span>}

      <select className="select" value={value} onChange={onChange} {...attr}>
        {(allOption || defaultValue) && (
          <option value="">{defaultValue || "所有"}</option>
        )}

        {options.map((o, index) => (
          <option key={index} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
}
