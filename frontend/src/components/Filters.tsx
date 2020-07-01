import React from "react";
import DatePicker from "./DatePicker";
import {
  changeFilterTime,
  changeFilterCategory,
  changeFilterType,
} from "../actions";
import Select, { SelectOption } from "./Select";
import { Filter } from "../utils/types";

interface Props {
  filter: Filter;
  dispatch: Function;
  billCategoryOptions: SelectOption[];
  billTypeOptions: SelectOption[];
}

export default function Filters(props: Props) {
  const { filter, dispatch, billCategoryOptions, billTypeOptions } = props;

  return (
    <div className="filters">
      <DatePicker
        placeholder="选择时间"
        value={filter.time}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(filter.time);
          dispatch(changeFilterTime(e.target.value));
        }}
      />

      <Select
        defaultValue="所有类型"
        options={billCategoryOptions}
        value={filter.category || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(changeFilterCategory(e.target.value));
        }}
      />

      <Select
        defaultValue="收支"
        options={billTypeOptions}
        value={filter.type || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(changeFilterType(e.target.value));
        }}
      />

      <div>
        <span>金额</span>
      </div>
    </div>
  );
}
