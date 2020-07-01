// 添加新的账单到服务器
export const postBill = (bill: any) => {
  fetch("/api/bills", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bill }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
