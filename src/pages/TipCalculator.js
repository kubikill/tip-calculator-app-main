import { useState, useEffect, useRef } from "react";
import * as tipCalculatorStyle from "./TipCalculator.module.scss";
import CurrencyFormat from "react-currency-format";

const TipCalculator = () => {
  const [bill, setBill] = useState({
    cost: 0,
    tipPercent: 0,
    numOfPeople: 0,
  });

  const [calculated, setCalculated] = useState({
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  let activeButton = useRef(null);

  useEffect(() => {
    let tipPerPerson = (bill.cost / bill.numOfPeople) * (bill.tipPercent / 100);
    if (isNaN(tipPerPerson) | (tipPerPerson === Infinity)) {
      tipPerPerson = 0;
    }
    let totalPerPerson = bill.cost / bill.numOfPeople + tipPerPerson;
    if (isNaN(totalPerPerson) | (totalPerPerson === Infinity)) {
      totalPerPerson = 0;
    }
    setCalculated({
      tipPerPerson: tipPerPerson,
      totalPerPerson: totalPerPerson,
    });
    console.log(bill);
    console.log(calculated);
  }, [bill]);

  function handleButtonClick(event) {
    if (activeButton.current) {
      activeButton.current.classList.remove(tipCalculatorStyle.active);
    }
    activeButton.current = event.target;
    activeButton.current.classList.add(tipCalculatorStyle.active);
    setBill({
      ...bill,
      tipPercent: parseInt(event.target.value),
    });
  }

  return (
    <div className="tipCalculator">
      <div className={tipCalculatorStyle.inputColumn}>
        <label htmlFor="bill">Bill</label>
        <div className={tipCalculatorStyle.inputContainer}>
          <div className={tipCalculatorStyle.inputIcon}>$</div>
          <CurrencyFormat
            thousandSeparator={true}
            decimalScale={2}
            placeholder="0"
            step="0.01"
            allowNegative={false}
            onValueChange={(values) => {
              setBill({
                ...bill,
                cost: values.floatValue,
              });
            }}
          />
        </div>

        <label>Select Tip %</label>
        <div className={tipCalculatorStyle.tipContainer}>
          <button onClick={handleButtonClick} value={5}>
            5%
          </button>
          <button onClick={handleButtonClick} value={10}>
            10%
          </button>
          <button onClick={handleButtonClick} value={15}>
            15%
          </button>
          <button onClick={handleButtonClick} value={25}>
            25%
          </button>
          <button onClick={handleButtonClick} value={50}>
            50%
          </button>
          <CurrencyFormat
            placeholder="Custom"
            suffix="%"
            allowNegative={false}
            onValueChange={(values) => {
              if (activeButton.current) {
                activeButton.current.classList.remove(
                  tipCalculatorStyle.active
                );
              }
              activeButton.current = null;
              setBill({
                ...bill,
                tipPercent: parseInt(values.value),
              });
            }}
          />
        </div>

        <label htmlFor="people">Number of People</label>
        <div className={tipCalculatorStyle.inputContainer}>
          <div className={tipCalculatorStyle.inputIcon}>P</div>
          <CurrencyFormat
            placeholder="0"
            allowNegative={false}
            onValueChange={(values) => {
              setBill({
                ...bill,
                numOfPeople: parseInt(values.value),
              });
            }}
          />
        </div>
      </div>
      <div className={tipCalculatorStyle.tipResults}>
        <div className={tipCalculatorStyle.result}>
          <div className="resultLabel">
            <div className={tipCalculatorStyle.labelTopRow}>Tip Amount</div>
            <div className={tipCalculatorStyle.labelBottomRow}>/ person</div>
          </div>
          <CurrencyFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            className={tipCalculatorStyle.resultValue}
            prefix="$"
            displayType="text"
            value={calculated.tipPerPerson}
          />
        </div>
        <div className={tipCalculatorStyle.result}>
          <div className="resultLabel">
            <div className={tipCalculatorStyle.labelTopRow}>Total</div>
            <div className={tipCalculatorStyle.labelBottomRow}>/ person</div>
          </div>
          <CurrencyFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            className={tipCalculatorStyle.resultValue}
            prefix="$"
            displayType="text"
            value={calculated.totalPerPerson}
          />
        </div>
        <button className={tipCalculatorStyle.resetButton}>RESET</button>
      </div>
    </div>
  );
};

export default TipCalculator;
