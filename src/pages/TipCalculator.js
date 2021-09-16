import { useState, useEffect } from "react";
import * as tipCalculatorStyle from "./TipCalculator.module.scss";

const TipCalculator = () => {
  const [bill, setBill] = useState({
    bill: 0,
    tipPercent: 0,
    numOfPeople: 0,
  });
  useEffect(() => {}, [bill]);
  return (
    <div className="tipCalculator">
      <label for="bill">Bill</label>
      <div className={tipCalculatorStyle.inputContainer}>
        <div className={tipCalculatorStyle.inputIcon}>$</div>
        <input id="bill" type="number" />
      </div>
    </div>
  );
};

export default TipCalculator;
