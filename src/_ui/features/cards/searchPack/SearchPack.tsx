import React, { useState } from "react";
import { Input } from "../../../common/_superComponents/Input/Input";

export const SearchCards = () => {
  const [data, setData] = useState('');

  return (
    <div>
      <Input onChangeText={setData} />
    </div>
  );
};
