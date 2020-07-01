import React, { ReactEventHandler, useState, useRef } from "react";
import { getDays } from "../utils";
import { WEEK, MONTHS } from "../utils/CONSTANT";
import { useEventListener } from "../hooks/useEventListener";
import { CloseButton } from "../Experimental/CloseButton";

interface Props {
  label?: string;
  placeholder?: string;
  required?: boolean;
  spliter?: string;
  value: string | number | undefined;
  onChange: ReactEventHandler;
  pickerDate?: string | Date;
}

enum PICKERBODY {
  SELECT_YEAR,
  SELECT_MONTH,
  SELECT_DAY,
}

export default function DatePicker(props: Props) {
  const {
    label,
    placeholder,
    required,
    spliter,
    pickerDate,
    value,
    onChange,
  } = props;
  // date picker states
  const initialD = useRef(pickerDate ? new Date(pickerDate) : new Date())
    .current;
  const [year, setYear] = useState(initialD.getFullYear());
  const [month, setMonth] = useState(initialD.getMonth() + 1);
  const [day, setDay] = useState(initialD.getDate());
  const [pickerBody, setPickerBody] = useState(PICKERBODY.SELECT_DAY);

  const datePickerInput = useRef<HTMLInputElement>(null);
  const datePickerPanel = useRef<HTMLInputElement>(null);

  // 注册全局点击关闭日期选择器事件
  useEventListener(
    document,
    "click",
    ((ev: MouseEvent) => {
      const target = ev.target;

      if (target && target !== datePickerInput.current) {
        if (target instanceof Element && !target.closest(".date-picker-panel"))
          datePickerPanel.current?.classList.remove("show");
      }
    }) as EventListener,
    true
  );

  const ToggleDatePickerPanel = () => {
    const panel = datePickerPanel.current;
    if (panel) {
      panel.classList.toggle("show");
    }
  };

  const changeDatePickerInput = (y = year, m = month, d = day) => {
    const input = datePickerInput.current;
    if (input) {
      input.value = [y, m, d].filter((num) => num > 0).join(spliter || "/");
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };

  const onUpdateYear = (event: React.MouseEvent) => {
    const target = event.target as HTMLSpanElement;
    const newYear = parseInt(target.innerHTML);
    if (isNaN(newYear)) return;
    setYear(newYear);
    // Change the value of input element
    changeDatePickerInput(newYear, 0, 0);
    // switch current panel body to select month
    setPickerBody(PICKERBODY.SELECT_MONTH);
  };

  const onUpdateMonth = (event: React.MouseEvent) => {
    const target = event.target as HTMLSpanElement;
    const newMonth = parseInt(target.innerHTML);
    if (isNaN(newMonth)) return;
    setMonth(newMonth);
    changeDatePickerInput(year, newMonth, 0);
    setPickerBody(PICKERBODY.SELECT_DAY);
  };

  const onUpdateDay = (event: React.MouseEvent) => {
    const target = event.target as HTMLSpanElement;
    const newDay = parseInt(target.innerHTML);
    if (isNaN(newDay)) return;
    setDay(newDay);
    changeDatePickerInput(year, month, newDay);
    // hide the date picker panel
    if (datePickerPanel.current) ToggleDatePickerPanel();
  };

  const today = useRef(new Date()).current;
  const years = [...Array(12)].map((_, index) => {
    const y = today.getFullYear() - (11 - index);
    const className = `date-picker-year${
      today.getFullYear() === y ? " date-picker-this-year" : ""
    }${year === y ? " date-picker-year-selected" : ""}`;

    return (
      <span key={y} className={className}>
        {y + "年"}
      </span>
    );
  });

  const months = MONTHS.map((m, index) => {
    const className = `date-picker-month${
      today.getMonth() === index ? " date-picker-this-month" : ""
    }${month === index + 1 ? " date-picker-month-selected" : ""}`;

    return (
      <span key={index} className={className}>
        {m}
      </span>
    );
  });

  const days = [...Array(getDays(year, month))].map((_, index) => {
    const className = `date-picker-day${
      today.getDate() === ++index ? " date-picker-today" : ""
    }${day === index ? " date-picker-day-selected" : ""}`;

    return (
      <span key={index} className={className}>
        {index}
      </span>
    );
  });

  return (
    <div className="date-picker">
      <label>{label}</label>

      <input
        type="button"
        className="btn-xs btn-primary"
        value="重置"
        onClick={() => {
          if (datePickerInput.current) {
            changeDatePickerInput(0, 0, 0);
            datePickerPanel.current?.classList.remove("show");
            setPickerBody(PICKERBODY.SELECT_DAY);
            setYear(today.getFullYear());
            setMonth(today.getMonth() + 1);
            setDay(today.getDate());
          }
        }}
      />

      <input
        type="text"
        className="date-picker-input"
        placeholder={placeholder}
        ref={datePickerInput}
        value={value || ""}
        onClick={ToggleDatePickerPanel}
        onInput={onChange}
        readOnly
      />

      <div className="date-picker-panel" ref={datePickerPanel}>
        <div className="date-picker-header">
          <input
            // className="btn-xs btn-primary"
            type="button"
            value="<<"
            onClick={() => {
              setYear(year - 1);
              changeDatePickerInput(year - 1, 0, 0);
            }}
          />
          <input
            // className="btn-xs btn-primary"
            type="button"
            value="<"
            onClick={() => {
              const newMonth = month - 1 || 12;
              setMonth(newMonth);
              changeDatePickerInput(year, newMonth, 0);
            }}
          />
          <div className="flex-g1">
            <span
              className="date-picker-year-button"
              onClick={() => {
                setPickerBody(PICKERBODY.SELECT_YEAR);
              }}
            >{`${year}年 `}</span>
            <span
              className="date-picker-month-button"
              onClick={() => {
                setPickerBody(PICKERBODY.SELECT_MONTH);
              }}
            >{`${month}月`}</span>
          </div>
          <input
            // className="btn-xs btn-primary"
            type="button"
            value=">"
            onClick={() => {
              const newMonth = (month % 12) + 1;
              setMonth(newMonth);
              changeDatePickerInput(year, newMonth, 0);
            }}
          />
          <input
            // className="btn-xs btn-primary"
            type="button"
            value=">>"
            onClick={() => {
              setYear(year + 1);
              changeDatePickerInput(year + 1, 0, 0);
            }}
          />
        </div>

        <div className="date-picker-body" onClick={() => {}}>
          {pickerBody === PICKERBODY.SELECT_YEAR && (
            <div className="date-picker-body-pick-year" onClick={onUpdateYear}>
              {years}
            </div>
          )}

          {pickerBody === PICKERBODY.SELECT_MONTH && (
            <div
              className="date-picker-body-pick-month"
              onClick={onUpdateMonth}
            >
              {months}
            </div>
          )}

          {pickerBody === PICKERBODY.SELECT_DAY && (
            <div className="date-picker-body-pick-day" onClick={onUpdateDay}>
              {WEEK.map((w) => (
                <span key={w.name}>{w.display}</span>
              ))}
              {days}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
