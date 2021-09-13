import * as React from "react";
import Logo from "./Logo";
import TipCalculator from "./TipCalculator";
import Section from "./Section";
import "./index.scss";

// markup
const IndexPage = () => {
  return (
    <main>
      <Logo />
      <Section>
        <TipCalculator />
      </Section>
    </main>
  );
};

export default IndexPage;
