import React, { ChangeEvent } from "react";
import styles from "./Uploader.module.scss";
import cn from "classnames";
import Typography from "../UI/Typography";

interface PropTypes {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  validFormat?: string;
  className?: string;
  errorMessage: string | null;
}

// Component should be as dump as possible, i.e. no logic coupled to this component

const Uploader = ({
  validFormat,
  onUpload,
  className,
  errorMessage,
}: PropTypes) => {
  return (
    <div className={cn(styles.root, className)}>
      <input
        type="file"
        accept={validFormat}
        id="file-upload"
        className={styles.fileInput}
        onChange={onUpload}
      />
      <label htmlFor="file-upload" className={styles.cta}>
        Upload File
      </label>
      {errorMessage && (
        <Typography color="var(--primary-red-color)">{errorMessage}</Typography>
      )}
    </div>
  );
};

export default Uploader;
