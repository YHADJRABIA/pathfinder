import { ImSpinner2 as LoaderIcon } from "react-icons/im"
import styles from "./Loader.module.scss"
import cn from "classnames"

interface PropTypes {
  size?: number
  className?: string
}

const Loader = (props: PropTypes) => {
  const { size, className } = props
  return (
    <LoaderIcon {...props} size={size} className={cn(styles.root, className)} />
  )
}

export default Loader
