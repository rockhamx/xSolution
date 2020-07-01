export function Str(num: any) {
  if (typeof num === "number") {
    return num.toString();
  }
  return num;
}

export function getDays(year: number, month: number) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (isLeapYear(year)) return 29;
      else return 28;
    default:
      throw new Error("month error: " + month);
  }
}

export function isLeapYear(year: number) {
  if (year % 4 === 0)
    if (year % 100 !== 0) return true;
    else if (year % 400 === 0) return true;
  return false;
}
