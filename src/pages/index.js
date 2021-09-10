import * as React from "react";
import Logo from "./Logo";
import BillCalculator from "./BillCalculator";
import * as mainStyles from "./index.module.scss";

// markup
const IndexPage = () => {
  return (
    <main>
      <Logo />
      <BillCalculator />
    </main>
  );
};

export default IndexPage;
