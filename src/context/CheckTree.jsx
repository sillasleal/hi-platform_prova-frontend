import { createContext, useEffect, useState } from "react";

const TreeContext = createContext({ data: {}, onCheck() {} });
const { Provider } = TreeContext;

export const CheckTreeProvider = ({ children }) => {
  const STORAGE_KEY = "tree-status";
  const [data, setData] = useState({});
  const onCheck = (id, isCheck) => {
    setData((d) => ({ ...d, [id]: isCheck ?? !d[id] }));
  };

  useEffect(() => {
    if (Object.keys(data).length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);
  useEffect(() => {
    const storageData = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (storageData) {
      setData(storageData);
    }
  }, []);
  const value = { data, onCheck };
  /** */
  return <Provider value={value}>{children}</Provider>;
};
export default TreeContext;
