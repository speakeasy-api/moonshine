import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResponsiveValue, Size } from '@/types'
import { UserAvatar, UserAvatarProps } from '@/components/UserAvatar'
import {
  userAvatarSizeMap,
  userAvatarSizeMapper,
} from '@/components/UserAvatar/sizeMap'
import { cn, getResponsiveClasses } from '@/lib/utils'
import useTailwindBreakpoint from '@/hooks/useTailwindBreakpoint'
import { resolveSizeForBreakpoint } from '@/lib/responsiveUtils'

type FacepileVariant = 'interactive' | 'static'

export interface FacepileProps {
  avatars: Omit<UserAvatarProps, 'size'>[]
  maxFaces?: number
  avatarSize?: ResponsiveValue<Size>
  overlap?: number
  variant?: FacepileVariant
}

export function Facepile({
  avatars = [],
  maxFaces = 3,
  avatarSize = 'medium',
  overlap = 0.6,
  variant = 'interactive',
}: FacepileProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [prevHoveredIndex, setPrevHoveredIndex] = useState<number | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const breakpoint = useTailwindBreakpoint()
  const resolvedSize = resolveSizeForBreakpoint(
    breakpoint,
    avatarSize,
    'medium'
  )

  const size = userAvatarSizeMap[resolvedSize] * 4 // *4 as avatarSizeMap is a record of tailwind sizes - possibly a better way to do this
  const offsetX = size * overlap // How much each avatar overlaps

  const visibleFaces = avatars.slice(0, maxFaces)
  const hiddenFaces = avatars.slice(maxFaces)
  const extraFaces = Math.max(0, avatars.length - maxFaces)

  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipWidth, setTooltipWidth] = useState(0)

  useEffect(() => {
    if (tooltipRef.current) {
      const updateTooltipWidth = () => {
        if (tooltipRef.current?.offsetWidth) {
          setTooltipWidth(tooltipRef.current!.offsetWidth)
        }
      }
      updateTooltipWidth()
      const resizeObserver = new ResizeObserver(updateTooltipWidth)
      resizeObserver.observe(tooltipRef.current)
      return () => resizeObserver.disconnect()
    }
  }, [hoveredIndex, visibleFaces])

  useEffect(() => {
    if (hoveredIndex !== null) {
      setTooltipVisible(true)
      setPrevHoveredIndex(hoveredIndex)
    } else {
      setTooltipVisible(false)
    }
  }, [hoveredIndex])

  const getTooltipPosition = (index: number, tooltipWidth: number) => {
    const avatarCenter = index * offsetX + size / 2
    return avatarCenter - tooltipWidth / 2
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsExpanded(false)
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    if (index < maxFaces) {
      setIsExpanded(false)
    } else {
      setIsExpanded(true)
    }
  }

  const containerWidth = isExpanded
    ? avatars.length * offsetX + size - offsetX
    : visibleFaces.length * offsetX +
      size -
      offsetX +
      (extraFaces > 0 ? offsetX : 0)

  const getTooltipAnimation = (index: number | null) => {
    if (prevHoveredIndex === null || index === null) return {}
    const direction = index > prevHoveredIndex ? 1 : -1
    return {
      initial: { opacity: 0, x: -15 * direction },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 * direction },
      transition: { duration: 0.2 },
    }
  }

  if (variant === 'static') {
    return (
      <div
        className="relative"
        style={{ height: size, width: containerWidth }}
        onMouseLeave={handleMouseLeave}
      >
        {visibleFaces.map((face, index) => (
          <AvatarWrapper
            key={face.name}
            avatar={face}
            avatarSize={avatarSize}
            index={index}
            size={size}
            offsetX={offsetX}
            hoveredIndex={null}
            handleMouseEnter={handleMouseEnter}
            totalFaces={visibleFaces.length}
            isExpanded={isExpanded}
            maxFaces={maxFaces}
            interactive={false}
          />
        ))}
        <AnimatePresence>
          {tooltipVisible && hoveredIndex !== null && (
            <motion.div
              ref={tooltipRef}
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: getTooltipPosition(hoveredIndex ?? 0, tooltipWidth),
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: size + 4,
                left: 0,
                height: 20,
                background: 'black',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 8,
                paddingRight: 8,
                color: 'white',
                fontSize: 12,
                fontWeight: 'medium',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span key={avatars[hoveredIndex].name}>
                  {avatars[hoveredIndex].name}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        {extraFaces > 0 && (
          <div
            className="absolute"
            style={{
              left: visibleFaces.length * offsetX,
              zIndex: 0,
            }}
          >
            <div
              className={cn(
                'border-background ml-1.5 flex items-center justify-center rounded-full border-2 bg-gray-200 text-sm font-medium text-gray-600',
                getResponsiveClasses(avatarSize, userAvatarSizeMapper)
              )}
            >
              +{extraFaces}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (variant === 'interactive') {
    return (
      <motion.div
        ref={containerRef}
        className="relative"
        style={{ height: size }}
        animate={{ width: containerWidth }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onMouseLeave={handleMouseLeave}
      >
        {visibleFaces.map((face, index) => (
          <AvatarWrapper
            key={face.name}
            avatar={face}
            avatarSize={avatarSize}
            index={index}
            size={size}
            offsetX={offsetX}
            hoveredIndex={hoveredIndex}
            handleMouseEnter={handleMouseEnter}
            totalFaces={visibleFaces.length}
            isExpanded={isExpanded}
            maxFaces={maxFaces}
            interactive={true}
          />
        ))}

        <AnimatePresence>
          {isExpanded &&
            hiddenFaces.map((face, index) => (
              <AvatarWrapper
                key={face.name}
                avatar={face}
                avatarSize={avatarSize}
                index={index + maxFaces}
                size={size}
                offsetX={offsetX}
                hoveredIndex={hoveredIndex}
                handleMouseEnter={handleMouseEnter}
                totalFaces={avatars.length}
                isExpanded={isExpanded}
                maxFaces={maxFaces}
                interactive={true}
                initial={{ opacity: 0, scale: 0.5, x: -size / 2 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: -size / 2 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            ))}
        </AnimatePresence>

        <AnimatePresence>
          {tooltipVisible && hoveredIndex !== null && (
            <motion.div
              ref={tooltipRef}
              layout
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: getTooltipPosition(hoveredIndex ?? 0, tooltipWidth),
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: size + 4,
                left: 0,
                height: 20,
                background: 'black',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 8,
                paddingRight: 8,
                color: 'white',
                fontSize: 12,
                fontWeight: 'medium',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={avatars[hoveredIndex].name}
                  {...getTooltipAnimation(hoveredIndex)}
                >
                  {avatars[hoveredIndex].name}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {extraFaces > 0 && !isExpanded && (
          <motion.div
            className="absolute cursor-pointer"
            style={{
              left: visibleFaces.length * offsetX,
              zIndex: 0,
            }}
            onMouseEnter={() => setIsExpanded(true)}
            whileHover={{ scale: 1.1 }}
          >
            <div
              className={cn(
                'border-background ml-1.5 flex items-center justify-center rounded-full border-2 bg-gray-200 text-sm font-medium text-gray-600',
                getResponsiveClasses(avatarSize, userAvatarSizeMapper)
              )}
            >
              +{extraFaces}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return null
}

function AvatarWrapper({
  avatar,
  avatarSize,
  index,
  size,
  offsetX,
  hoveredIndex,
  handleMouseEnter,
  totalFaces,
  isExpanded,
  maxFaces,
  interactive,
  ...motionProps
}: {
  avatar: Omit<UserAvatarProps, 'size'>
  avatarSize?: ResponsiveValue<Size>
  index: number
  size: number
  offsetX: number
  hoveredIndex: number | null
  handleMouseEnter: (index: number) => void
  totalFaces: number
  isExpanded: boolean
  maxFaces: number
  interactive: boolean
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: index * offsetX,
        zIndex:
          interactive && hoveredIndex === index
            ? totalFaces + 1
            : isExpanded
              ? totalFaces - index
              : index < maxFaces
                ? maxFaces - index
                : 0,
      }}
      whileHover={{ scale: interactive ? 1.1 : 1 }}
      animate={{
        x:
          hoveredIndex === null || !interactive
            ? 0
            : hoveredIndex === index
              ? 0
              : hoveredIndex < index
                ? size * 0.2
                : -size * 0.2,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={() => handleMouseEnter(index)}
      {...motionProps}
    >
      <UserAvatar {...avatar} size={avatarSize} border />
    </motion.div>
  )
}
