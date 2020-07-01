import React, { useReducer, useRef } from "react";
import { Bill, BillType, Category } from "../utils/types";
import DatePicker from "./DatePicker";
import Select from "./Select";
import Filters from "./Filters";
import { useBills } from "../hooks/useBills";
import { useFilteredBill } from "../hooks/useFilteredBills";
import { useSummary } from "../hooks/useSummary";
import reducer from "../reducers";
import {
  toggleFormVisibility,
  changeNewBillTime,
  changeNewBillCategory,
  changeNewBillAmount,
  changeNewBillType,
} from "../actions";
import { postBill } from "../utils/server";
import CanvasChart from "./CanvasChart";
import { ChartType } from "chart.js";

const initialState = {
  filter: {},
  form: {
    show: false,
  },
};

const billTypeOptions = [
  { name: "支出", value: BillType.Cost },
  { name: "收入", value: BillType.Earn },
];

export default function BillSheet() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bills, setBills, categories, billID } = useBills();
  const filteredBills = useFilteredBill({
    bills,
    categories,
    filter: state.filter,
  });
  const summary = useSummary({ bills: filteredBills });

  let billCategoryOptions = Array.from(categories.keys()).map((id) => {
    const name = categories.get(id)!.name;
    return { name, value: id };
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { form } = state;
    const time = form.time ? new Date(form.time) : new Date();
    const id = ++billID.current;
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
    dispatch(changeNewBillAmount(""));
  };

  const onToggleFormVisibility = (e: React.MouseEvent<HTMLInputElement>) => {
    dispatch(toggleFormVisibility());

    // 给表单的某些属性添加初始值
    if (!state.form.time)
      dispatch(changeNewBillTime(new Date().toLocaleDateString()));

    if (!state.form.category)
      dispatch(changeNewBillCategory(billCategoryOptions[0].value));
  };

  const labels = Array.from(summary.byCategories.keys());
  const data = Array.from(summary.byCategories.values());

  return (
    <div className="bill-sheet">
      <CanvasChart
        id="summary-chart"
        title={`账单分类统计 - 总收入：￥${summary.income}，总支出：￥${summary.expenditure}`}
        type={"pie"}
        labels={labels}
        data={data}
      />

      <div className="options">
        <input
          type="button"
          className="btn btn-primary"
          value="添加账单"
          onClick={onToggleFormVisibility}
        />
      </div>

      <Filters
        filter={state.filter}
        dispatch={dispatch}
        billCategoryOptions={billCategoryOptions}
        billTypeOptions={billTypeOptions}
      />

      {/* TODO: 想出抽象这个表单组件的解决方案 */}
      {state.form.show && (
        <form className="form" onSubmit={onSubmit}>
          <DatePicker
            value={state.form.time}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(changeNewBillTime(e.target.value));
            }}
          />

          <Select
            options={billCategoryOptions}
            value={state.form.category!}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(changeNewBillCategory(e.target.value));
              const type = categories.get(e.target.value)?.type;
              type && dispatch(changeNewBillType(type));
            }}
          />

          <div></div>
          <div>
            <input
              required
              type="number"
              value={state.form.amount || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(changeNewBillAmount(e.target.value));
              }}
            />
            <input className="btn-xs btn-primary" type="submit" value="添加" />
            <input
              className="btn-xs btn-primary"
              type="button"
              value="取消"
              onClick={onToggleFormVisibility}
            />
          </div>
        </form>
      )}

      {filteredBills.map((bill) => (
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
