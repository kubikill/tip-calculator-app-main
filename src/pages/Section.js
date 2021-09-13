import * as sectionStyle from "./Section.module.scss";

const Section = ({ children }) => {
  return <section className={sectionStyle.container}>{children}</section>;
};

export default Section;
