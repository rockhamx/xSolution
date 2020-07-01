import React from "react";
import { Filter } from "../utils/types";

interface Props {
  value: Filter;
}
export default function BillForm(props: Props) {
  const { value } = props;

  return <form className="bill-form"></form>;
}
