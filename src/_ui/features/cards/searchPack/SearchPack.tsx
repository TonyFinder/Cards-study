import React, { useState } from "react";
import { setPacksTC } from "../../../../_bll/features/cards/packsReducer";
import { useAppDispatch } from "../../../../_bll/main/store";
import { Input } from "../../../common/_superComponents/Input/Input";

export const SearchCards = () => {
  const [data, setData] = useState<string>("");
  const dispatch = useAppDispatch();
  function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number = 300
  ): (...args: Params) => void {
    let timer: NodeJS.Timeout;

    return (...args: Params) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }


  return (
    <div>
      <Input value={data} onChangeText={setData} />
    </div>
  );
};
