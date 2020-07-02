import React, { useContext } from "react";
import { Form, Category, Bill } from "../types";
import DatePicker from "./DatePicker";
import Select, { SelectOption } from "./Select";
import {
  changeFormTime,
  changeFormCategory,
  changeFormType,
  changeFormAmount,
} from "../actions";
import { DispatchContext } from "./App";
import { postBill } from "../utils/transaction";

interface Props {
  form: Form;
  billCategoryOptions: SelectOption<string>[];
  categories: Map<string, Category>;
  bills: Bill[];
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  idCounter: React.MutableRefObject<number>;
  onCancel: () => any;
}

export default function BillForm(props: Props) {
  const {
    form,
    categories,
    billCategoryOptions,
    bills,
    setBills,
    idCounter,
    onCancel,
  } = props;
  const dispatch = useContext(DispatchContext);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const time = form.time ? new Date(form.time) : new Date();
    const id = ++idCounter.current;
    const category = categories.get(
      form.category || billCategoryOptions[0].value
    ) as Category;
    const type = parseInt(form.type || category.type);
    const amount = form.amount || 0;

    postBill({
      time: time.getTime(),
      category: form.category,
      type,
      amount,
    });
    const bill: Bill = { id, time, category: category.name, type, amount };
    setBills([bill, ...bills]);

    // 清空某些输入框
    dispatch(changeFormAmount(""));
  };

  return (
    <div className={`form-wrapper${form.show ? " show" : ""}`}>
      <form className="billform" onSubmit={onSubmit}>
        <DatePicker
          value={form.time}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeFormTime(e.target.value));
          }}
        />

        <Select
          options={billCategoryOptions}
          value={form.category!}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(changeFormCategory(e.target.value));
            const type = categories.get(e.target.value)?.type;
            type && dispatch(changeFormType(type));
          }}
        />

        <div></div>
        <div>
          <input
            required
            type="number"
            placeholder="输入金额"
            value={form.amount || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(changeFormAmount(e.target.value));
            }}
          />
          <input className="btn-xs btn-primary" type="submit" value="添加" />
          <input
            className="btn-xs btn-primary"
            type="button"
            value="取消"
            onClick={onCancel}
          />
        </div>
      </form>
    </div>
  );
}
