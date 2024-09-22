import Typography from "@/components/UI/Typography";
import { Coordinate } from "@/types/pathfinder";
import styles from "./PathArray.module.scss";
import React, { useEffect, useRef, useState } from "react";
import PathCell from "../PathCell";
import cn from "classnames";

interface PropTypes {
  path?: Coordinate[] | null;
  title: string;
  errorMessage: string | null;
  className?: string;
}

const PathArray = ({ path, title, errorMessage, className }: PropTypes) => {
  const hasPath = path !== null;
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState(0);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (hasPath) {
      setIsShown(true);
      if (contentRef.current) {
        setMaxHeight(contentRef.current.scrollHeight);
      }
    } else {
      setMaxHeight(0);
      setIsShown(false);
    }
  }, [hasPath, path]);

  if (errorMessage) return <Typography>{errorMessage}</Typography>;
  if (path === undefined) return null;

  return (
    <div
      className={cn(styles.root, className, { [styles.visible]: isShown })}
      ref={contentRef}
      style={{ maxHeight: `${maxHeight}px`, opacity: isShown ? 1 : 0 }}
    >
      <Typography tag="h2" size="l" weight="semiBold" className={styles.title}>
        {title}
      </Typography>
      <ul className={styles.path}>
        {hasPath &&
          path.map((coordinate, idx) => {
            const isLastItem = idx === path.length - 1;
            return (
              <PathCell
                key={`${idx}-${coordinate}`}
                coordinate={coordinate}
                hasArrow={!isLastItem}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default PathArray;
