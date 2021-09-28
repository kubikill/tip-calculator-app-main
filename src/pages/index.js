import * as React from "react";
import { Helmet } from "react-helmet";
import Logo from "./Logo";
import TipCalculator from "./TipCalculator";
import Section from "./Section";
import "./index.scss";

// markup
const IndexPage = () => {
  return (
    <main>
      <Helmet
        htmlAttributes={{
          lang: "en",
        }}
      >
        <meta charSet="utf-8" />
        <title>Tip Calculator</title>
      </Helmet>
      <Logo />
      <Section>
        <TipCalculator />
      </Section>
    </main>
  );
};

export default IndexPage;
