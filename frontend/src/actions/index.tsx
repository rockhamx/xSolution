export const ChangeNewBill = {
  TIME: "NEWBILL_TIME",
  CATEGORY: "NEWBILL_CATEGORY",
  TYPE: "NEWBILL_TYPE",
  AMOUNT: "NEWBILL_AMOUNT",
};

export const changeFormTime = (time: string) => {
  return {
    type: ChangeNewBill.TIME,
    value: time,
  };
};

export const changeFormCategory = (category: string) => {
  return {
    type: ChangeNewBill.CATEGORY,
    value: category,
  };
};

export const changeFormType = (type: string) => {
  return {
    type: ChangeNewBill.TYPE,
    value: type,
  };
};

export const changeFormAmount = (amount: string) => {
  return {
    type: ChangeNewBill.AMOUNT,
    value: amount,
  };
};

export const TOGGLE_FORM_VISIBILITY = "TOGGLE_FORM_VISIBILITY";
export const toggleFormVisibility = () => {
  return {
    type: TOGGLE_FORM_VISIBILITY,
    value: "",
  };
};

export const ChangeFilter = {
  TIME: "FILTER_TIME",
  CATEGORY: "FILTER_CATEGORY",
  TYPE: "FILTER_TYPE",
};

export const changeFilterTime = (time: string) => {
  return {
    type: ChangeFilter.TIME,
    value: time,
  };
};

export const changeFilterCategory = (category: string) => {
  return {
    type: ChangeFilter.CATEGORY,
    value: category,
  };
};

export const changeFilterType = (type: string) => {
  return {
    type: ChangeFilter.TYPE,
    value: type,
  };
};
