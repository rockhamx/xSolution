import React, { useContext } from "react";
import { Bill, BillType, Category, Filter, Form } from "../types";
import Filters from "./Filters";
import {
  toggleFormVisibility,
  changeFormTime,
  changeFormCategory,
} from "../actions";
import { DispatchContext } from "./App";
import BillForm from "./BillForm";

interface Props {
  bills: Bill[];
  categories: Map<string, Category>;
  filter: Filter;
  form: Form;
  setBills: React.Dispatch<React.SetStateAction<Bill[]>>;
  counter: React.MutableRefObject<number>;
}

export default function BillSheet(props: Props) {
  const { bills, categories, filter, form, setBills, counter } = props;
  const dispatch = useContext(DispatchContext);

  let billCategoryOptions = Array.from(categories.entries()).map(
    ([id, cat]) => {
      return { name: cat.name, value: id };
    }
  );
  /**
   * 切换表单显示状态
   */
  const onToggleFormVisibility = () => {
    dispatch(toggleFormVisibility());

    // 给表单添加默认值
    if (!form.time) dispatch(changeFormTime(new Date().toLocaleDateString()));

    if (!form.category)
      dispatch(changeFormCategory(billCategoryOptions[0].value));
  };

  return (
    <div className="bill-sheet">
      <div className="options">
        <input
          type="button"
          className="btn btn-primary"
          value="添加账单"
          onClick={onToggleFormVisibility}
        />
      </div>
      {/* 过滤器 */}
      <Filters filter={filter} billCategoryOptions={billCategoryOptions} />
      {/* 表单 */}
      <BillForm
        form={form}
        billCategoryOptions={billCategoryOptions}
        categories={categories}
        bills={bills}
        setBills={setBills}
        idCounter={counter}
        onCancel={onToggleFormVisibility}
      />
      {/* 表单数据 */}
      {bills.map((bill) => (
        <BillRow key={bill.id} bill={bill} />
      ))}
    </div>
  );
}

interface BillRowProps {
  bill: Bill;
}
export function BillRow(props: BillRowProps) {
  const { time, category, type, amount } = props.bill;
  const isIncome = type === BillType.Earn;

  return (
    <div className="row">
      <div>{time.toLocaleDateString()}</div>
      <div>{category}</div>
      <div>{isIncome ? "收入" : "支出"}</div>
      <div>{(isIncome ? "+" : "-") + Math.abs(amount)}</div>
    </div>
  );
}
