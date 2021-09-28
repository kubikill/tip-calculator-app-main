import { useState, useEffect, useRef } from "react";
import * as tipCalculatorStyle from "./TipCalculator.module.scss";
import CurrencyFormat from "react-currency-format";
import DollarIcon from "../images/icon-dollar.svg";
import PersonIcon from "../images/icon-person.svg";

const TipCalculator = () => {
  const [bill, setBill] = useState({
    cost: "",
    tipPercent: "",
    numOfPeople: "",
  });

  const [calculated, setCalculated] = useState({
    tipPerPerson: 0,
    totalPerPerson: 0,
  });

  const [resetDisabled, setResetDisabled] = useState(true);

  let activeButton = useRef(null);

  function resetBill() {
    if (activeButton.current) {
      activeButton.current.classList.remove(tipCalculatorStyle.active);
    }
    activeButton.current = null;
    setBill({
      cost: "",
      tipPercent: "",
      numOfPeople: "",
    });
  }

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
    if (bill.cost === "" && bill.tipPercent === "" && bill.numOfPeople === "") {
      setResetDisabled(true);
    } else {
      setResetDisabled(false);
    }
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
    <div className={tipCalculatorStyle.tipCalculator}>
      <div className={tipCalculatorStyle.inputColumn}>
        <label htmlFor="billField">Bill</label>
        <div className={tipCalculatorStyle.inputContainer}>
          <div className={tipCalculatorStyle.inputIcon}>
            <img src={DollarIcon} alt="" />
          </div>
          <CurrencyFormat
            thousandSeparator={true}
            decimalScale={2}
            placeholder="0"
            allowNegative={false}
            value={bill.cost}
            id="billField"
            onValueChange={(values) => {
              if (!isNaN(parseInt(values.floatValue))) {
                setBill({
                  ...bill,
                  cost: parseInt(values.floatValue),
                });
              } else {
                setBill({
                  ...bill,
                  cost: "",
                });
              }
            }}
          />
        </div>

        <label className={tipCalculatorStyle.tipLabel}>Select Tip %</label>
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

        <label htmlFor="peopleField">Number of People</label>
        <div className={tipCalculatorStyle.inputContainer}>
          <div className={tipCalculatorStyle.inputIcon}>
            <img src={PersonIcon} alt="" />
          </div>
          <CurrencyFormat
            placeholder="0"
            allowNegative={false}
            value={bill.numOfPeople}
            id="peopleField"
            onValueChange={(values) => {
              if (!isNaN(parseInt(values.value))) {
                setBill({
                  ...bill,
                  numOfPeople: parseInt(values.value),
                });
              } else {
                setBill({
                  ...bill,
                  numOfPeople: "",
                });
              }
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
        <button
          className={tipCalculatorStyle.resetButton}
          onClick={resetBill}
          disabled={resetDisabled}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default TipCalculator;
