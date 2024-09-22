import { Coordinate } from '@/types/pathfinder'
import { formatCoordinateToYX } from '@/utils/pathfinder'
import styles from './PathCell.module.scss'
import React from 'react'
import Typography from '@/components/UI/Typography'
import { PiArrowRightThin as RightArrow } from 'react-icons/pi'

interface PropTypes {
  coordinate: Coordinate
  hasArrow?: boolean
}

const PathCell = ({ coordinate, hasArrow }: PropTypes) => {
  const formattedCoordinate = formatCoordinateToYX(coordinate)

  return (
    <li className={styles.root}>
      <Typography size="s" weight="semiBold">
        {formattedCoordinate}
      </Typography>
      {hasArrow && <RightArrow size={18} />}
    </li>
  )
}

export default PathCell
