import * as logoStyles from "./Logo.module.scss";
import LogoImage from "../images/logo.svg";

const Logo = () => {
  return (
    <div>
      <img className={logoStyles.logo} src={LogoImage} alt="Splitter" />
    </div>
  );
};

export default Logo;
