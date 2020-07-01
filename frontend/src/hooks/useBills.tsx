import { useState, useRef, useEffect } from "react";
import { Bill, Category } from "../utils/types";

export const useBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<Map<string, Category>>(
    new Map()
  );
  const billID = useRef(0);

  useEffect(() => {
    console.log("fetching data from remote...");
    fetch("/api/bills", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data: { bills: any[]; cats: Category[] }) => {
        const { bills, cats } = data;
        // 转换Category列表为Map
        let catsMap = new Map();
        for (let cat of cats) {
          const { id, ...c } = cat;
          catsMap.set(id, c);
        }
        setCategories(catsMap);

        // 添加ID，并转换一些服务器传递过来的数据类型
        for (const b of bills) {
          b.id = billID.current++;
          b.time = new Date(parseInt(b.time));
          b.category = catsMap.get(b.category).name || "无";
          b.type = parseInt(b.type);
          b.amount = parseInt(b.amount);
        }
        setBills(bills as Bill[]);
      });
  }, []);

  return { bills, setBills, categories, setCategories, billID };
};
