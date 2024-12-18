import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Face {
  id: string
  name: string
  image?: string
}

interface FacepileProps {
  faces: Face[]
  maxFaces?: number
  size?: number
  overlap?: number
}

const gradients = [
  'linear-gradient(135deg, #6366f1, #a5b4fc)', // Indigo
  'linear-gradient(135deg, #8b5cf6, #c4b5fd)', // Purple
  'linear-gradient(135deg, #ec4899, #f9a8d4)', // Pink
  'linear-gradient(135deg, #f43f5e, #fda4af)', // Rose
  'linear-gradient(135deg, #f97316, #fdba74)', // Orange
]

function Facepile({
  faces = [],
  maxFaces = 5,
  size = 40,
  overlap = 0.6,
}: FacepileProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [prevHoveredIndex, setPrevHoveredIndex] = useState<number | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const offsetX = size * overlap // How much each avatar overlaps

  const visibleFaces = faces.slice(0, maxFaces)
  const hiddenFaces = faces.slice(maxFaces)
  const extraFaces = Math.max(0, faces.length - maxFaces)

  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [tooltipWidth, setTooltipWidth] = useState(0)

  useEffect(() => {
    if (tooltipRef.current) {
      const updateTooltipWidth = () => {
        setTooltipWidth(tooltipRef.current!.offsetWidth)
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
    ? faces.length * offsetX + size - offsetX
    : visibleFaces.length * offsetX +
      size -
      offsetX +
      (extraFaces > 0 ? offsetX : 0)

  const getTooltipAnimation = (index: number | null) => {
    if (prevHoveredIndex === null || index === null) return {}
    const direction = index > prevHoveredIndex ? 1 : -1
    return {
      initial: { opacity: 0, x: -20 * direction },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 * direction },
      transition: { duration: 0.2 },
    }
  }

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
          key={face.id}
          face={face}
          index={index}
          size={size}
          offsetX={offsetX}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          handleMouseEnter={handleMouseEnter}
          totalFaces={visibleFaces.length}
          isExpanded={isExpanded}
          maxFaces={maxFaces}
        />
      ))}

      <AnimatePresence>
        {isExpanded &&
          hiddenFaces.map((face, index) => (
            <AvatarWrapper
              key={face.id}
              face={face}
              index={index + maxFaces}
              size={size}
              offsetX={offsetX}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              handleMouseEnter={handleMouseEnter}
              totalFaces={faces.length}
              isExpanded={isExpanded}
              maxFaces={maxFaces}
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
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={faces[hoveredIndex].id}
                {...getTooltipAnimation(hoveredIndex)}
              >
                {faces[hoveredIndex].name}
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
            className="border-background flex items-center justify-center rounded-full border-2 bg-gray-200 text-sm font-medium text-gray-600"
            style={{ width: size, height: size }}
          >
            +{extraFaces}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function AvatarWrapper({
  face,
  index,
  size,
  offsetX,
  hoveredIndex,
  setHoveredIndex,
  handleMouseEnter,
  totalFaces,
  isExpanded,
  maxFaces,
  ...motionProps
}: {
  face: Face
  index: number
  size: number
  offsetX: number
  hoveredIndex: number | null
  setHoveredIndex: (index: number | null) => void
  handleMouseEnter: (index: number) => void
  totalFaces: number
  isExpanded: boolean
  maxFaces: number
} & React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: index * offsetX,
        zIndex:
          hoveredIndex === index
            ? totalFaces + 1
            : isExpanded
              ? totalFaces - index
              : index < maxFaces
                ? maxFaces - index
                : 0,
      }}
      whileHover={{ scale: 1.1 }}
      animate={{
        x:
          hoveredIndex === null
            ? 0
            : hoveredIndex === index
              ? 0
              : hoveredIndex < index
                ? size * 0.2
                : -size * 0.2,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...motionProps}
    >
      <Avatar
        className="border-background cursor-pointer border-2"
        style={{ width: size, height: size }}
        onMouseEnter={() => handleMouseEnter(index)}
      >
        <AvatarFallback
          style={{ background: gradients[index % gradients.length] }}
          className="font-medium text-white"
        >
          {face.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
    </motion.div>
  )
}

export default function Component() {
  const sampleFaces: Face[] = [
    { id: '1', name: 'Alice Johnson' },
    { id: '2', name: 'Bob Smith' },
    { id: '3', name: 'Charlie Brown' },
    { id: '4', name: 'Diana Ross' },
    { id: '5', name: 'Edward Norton' },
    { id: '6', name: 'Fiona Apple' },
    { id: '7', name: 'George Clooney' },
  ]

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Facepile faces={sampleFaces} />
    </div>
  )
}
