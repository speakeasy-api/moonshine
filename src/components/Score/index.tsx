import { Size } from '@/types'
import { useMemo, type CSSProperties } from 'react'
import styles from './index.module.css'
type Threshold = [number, number]

export interface ScoreProps {
  score: number
  size?: Size
  showLabel?: boolean
  trackColor?: string

  /**
   * Custom definition of thresholds for color changes.
   * e.g [50, 75] will change color to green at 75%, orange at 50%. Otherwise red.
   */
  thresholds?: Threshold
}

const transition = {
  length: 1000, // ms
  step: 200, // ms
  delay: 0, // ms
}
const gapPercent = 5
const strokeWidth = 10

const sizeMap: Record<Size, number> = {
  small: 40,
  medium: 50,
  large: 60,
  xl: 70,
  '2xl': 80,
}

export function Score({
  score,
  size = 'large',
  showLabel = true,
  trackColor = 'lightgray',
  thresholds = [40, 70],
}: ScoreProps) {
  const strokePercent = score // %
  const progressColour = useMemo(() => {
    if (score >= thresholds[1]) return 'green'
    if (score >= thresholds[0]) return 'darkorange'
    return 'red'
  }, [score, thresholds])

  const circleSize = 100
  const radius = circleSize / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const percentToDegree = 360 / 100 // deg
  const percentToPx = circumference / 100 // px

  const offsetFactor = 0
  const offsetFactorSecondary = 1 - offsetFactor

  const primaryStrokeDasharray = () => {
    if (
      offsetFactor > 0 &&
      strokePercent > 100 - gapPercent * 2 * offsetFactor
    ) {
      // calculation to gradually shift back to 0 offset as progress nears 100% when offsetFactor > 0
      const subtract = -strokePercent + 100

      return `${Math.max(strokePercent * percentToPx - subtract * percentToPx, 0)} ${circumference}`
    } else {
      const subtract = gapPercent * 2 * offsetFactor

      return `${Math.max(strokePercent * percentToPx - subtract * percentToPx, 0)} ${circumference}`
    }
  }

  const secondaryStrokeDasharray = () => {
    if (
      offsetFactorSecondary < 1 &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      // calculation to gradually shift back to 1 secondary offset as progress nears 100% when offsetFactorSecondary < 1
      const subtract = strokePercent

      return `${Math.max((100 - strokePercent) * percentToPx - subtract * percentToPx, 0)} ${circumference}`
    } else {
      const subtract = gapPercent * 2 * offsetFactorSecondary

      return `${Math.max((100 - strokePercent) * percentToPx - subtract * percentToPx, 0)} ${circumference}`
    }
  }

  const primaryTransform = () => {
    if (
      offsetFactor > 0 &&
      strokePercent > 100 - gapPercent * 2 * offsetFactor
    ) {
      // calculation to gradually shift back to 0 offset as progress nears 100% when offsetFactor > 0
      const add = 0.5 * (-strokePercent + 100)

      return `rotate(${-90 + add * percentToDegree}deg)`
    } else {
      const add = gapPercent * offsetFactor

      return `rotate(${-90 + add * percentToDegree}deg)`
    }
  }

  const secondaryTransform = () => {
    if (
      offsetFactorSecondary < 1 &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      // calculation to gradually shift back to 1 secondary offset as progress nears 100% when offsetFactorSecondary < 1
      const subtract = 0.5 * strokePercent

      return `rotate(${360 - 90 - subtract * percentToDegree}deg) scaleY(-1)`
    } else {
      const subtract = gapPercent * offsetFactorSecondary

      return `rotate(${360 - 90 - subtract * percentToDegree}deg) scaleY(-1)`
    }
  }

  const primaryOpacity = () => {
    if (
      offsetFactor > 0 &&
      strokePercent < gapPercent * 2 * offsetFactor &&
      strokePercent < gapPercent * 2 * offsetFactorSecondary
    ) {
      return 0
    } else return 1
  }

  const secondaryOpacity = () => {
    if (
      (offsetFactor === 0 && strokePercent > 100 - gapPercent * 2) ||
      (offsetFactor > 0 &&
        strokePercent > 100 - gapPercent * 2 * offsetFactor &&
        strokePercent > 100 - gapPercent * 2 * offsetFactorSecondary)
    ) {
      return 0
    } else return 1
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${circleSize} ${circleSize}`}
      shapeRendering="crispEdges"
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={styles.svg}
      style={
        {
          '--stroke-width': strokeWidth,
          '--transition-length': `${transition?.length}ms`,
          '--delay': `${transition?.delay}ms`,
        } as CSSProperties
      }
      fill="none"
    >
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={
          {
            '--track-colour': trackColor,
            '--track-stroke-dasharray': secondaryStrokeDasharray(),
            transform: secondaryTransform(),
            stroke: trackColor,
            opacity: secondaryOpacity(),
          } as CSSProperties
        }
        className={styles.track}
      />

      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={
          {
            '--progress-colour': progressColour,
            '--progress-stroke-dasharray': primaryStrokeDasharray(),
            '--transition-length': `${transition?.length}ms`,
            '--delay': `${transition?.delay}ms`,
            transform: primaryTransform(),
            stroke: progressColour,
            opacity: primaryOpacity(),
          } as CSSProperties
        }
        className={styles.progress}
      />

      {showLabel && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          alignmentBaseline="central"
          className={styles.text}
          style={
            {
              '--progress-colour': progressColour,
              '--transition-length': `${transition?.length}ms`,
              '--delay': `${transition?.delay}ms`,
            } as CSSProperties
          }
        >
          {Math.round(strokePercent)}
        </text>
      )}
    </svg>
  )
}
