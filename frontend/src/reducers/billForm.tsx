import { Form, Action } from "../types";
import { ChangeNewBill, TOGGLE_FORM_VISIBILITY } from "../actions";

export default function billForm(state: Form, action: Action): Form {
  switch (action.type) {
    case ChangeNewBill.TIME:
      const time = action.value;
      return { ...state, time };
    case ChangeNewBill.CATEGORY:
      const category = action.value;
      return { ...state, category };
    case ChangeNewBill.TYPE:
      const type = action.value;
      return { ...state, type };
    case ChangeNewBill.AMOUNT:
      const amount = action.value;
      return { ...state, amount };
    case TOGGLE_FORM_VISIBILITY:
      const isShow = !state.show;
      return { ...state, show: isShow };
    default:
      return state;
  }
}
