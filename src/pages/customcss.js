import { Typography } from "@material-ui/core";
import customStyle from "../styles/custom.module.css";

const CustomCSS = () => {
  return (
    <React.Fragment>
      <Typography className={customStyle.title} variant="h2" gutterBottom>
        Custom CSS
      </Typography>
      <label className="customTitle">Im From Global CSS.</label>
    </React.Fragment>
  );
};

export default CustomCSS;
