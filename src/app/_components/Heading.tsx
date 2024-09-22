import Typography from "@/components/UI/Typography";
import React from "react";
import styles from "./Heading.module.scss";
import cn from "classnames";
import { PiPathThin as PathIcon } from "react-icons/pi";

interface PropTypes {
  label: string;
  className?: string;
}

const Heading = ({ label, className }: PropTypes) => {
  return (
    <div className={cn(styles.root, className)}>
      <PathIcon size={28} />
      <Typography tag="h1" size="xxl" weight="bold">
        {label}
      </Typography>
    </div>
  );
};

export default Heading;
