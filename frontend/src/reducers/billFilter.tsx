import { Filter, Action } from "../types";
import { ChangeFilter } from "../actions";

export default function billFilter(state: Filter, action: Action): Filter {
  switch (action.type) {
    case ChangeFilter.TIME:
      // const time = new Date(action.value);
      const time = action.value;
      return { ...state, time };
    case ChangeFilter.CATEGORY:
      const category = action.value;
      return { ...state, category };
    case ChangeFilter.TYPE:
      // const type = parseInt(action.value);
      const type = action.value;
      return { ...state, type };
    default:
      return state;
  }
}
