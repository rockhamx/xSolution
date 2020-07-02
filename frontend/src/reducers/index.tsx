import { Filter, Form, Action } from "../types";
import billFilter from "./billFilter";
import billForm from "./billForm";

interface State {
  filter: Filter;
  form: Form;
}

export default function reducer(state: State, action: Action) {
  return {
    filter: billFilter(state.filter, action),
    form: billForm(state.form, action),
  };
}
