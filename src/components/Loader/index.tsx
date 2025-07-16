import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'
import { motion, MotionProps } from 'framer-motion'

const animateProps: MotionProps['animate'] = {
  rotateY: [0, 30, -30, 0],
  scale: [1, 1.08, 1.08, 1],
  y: [0, -2, -2, 0],
}

export interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  const theme = useTheme()

  const createLayerTransition = (delay: number): MotionProps['transition'] => ({
    duration: 2.5,
    delay: delay,
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay: 0.5,
    ease: 'easeInOut',
  })

  return (
    <motion.svg
      width="101"
      height="97"
      viewBox="-25 -25 151 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-24', className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {theme === 'dark' ? (
        // White logo for dark mode
        <>
          <motion.path
            d="M71.2877 92.748L4.34428 83.2409L0.351947 86.7009L71.2877 96.7723L100.352 71.562L96.3489 70.9977L71.2877 92.748Z"
            fill="white"
            animate={animateProps}
            transition={createLayerTransition(0)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M71.2877 76.398L100.352 51.1877L96.3489 50.6235L71.2877 72.3737L41.9893 68.211L14.4369 64.2932L4.34428 62.856L0.351947 66.3267L10.4446 67.7533L0.351947 76.5151L71.2877 86.5864L100.352 61.3762L96.3596 60.8119L71.2877 82.5622L37.6883 77.782L43.7885 72.4908L71.2877 76.398Z"
            fill="white"
            animate={animateProps}
            transition={createLayerTransition(0.2)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M71.2877 62.1772L4.34428 52.6701L0.351947 56.1407L71.2877 66.2121L100.352 41.0018L96.3489 40.4376L71.2877 62.1772Z"
            fill="white"
            animate={animateProps}
            transition={createLayerTransition(0.4)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M96.3596 20.0435L71.2877 41.7937L4.34428 32.2866L0.351947 35.7466L40.0624 41.3891L33.9621 46.6803L4.34428 42.4751L0.351947 45.9351L71.2877 56.0171L100.352 30.8068L90.2487 29.3696L100.352 20.6184L96.3596 20.0435Z"
            fill="white"
            animate={animateProps}
            transition={createLayerTransition(0.6)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M100.352 10.431L29.4161 0.34906L0.351946 25.5593L71.2877 35.6307L100.352 10.431Z"
            fill="white"
            animate={animateProps}
            transition={createLayerTransition(0.8)}
            style={{ transformOrigin: '50% 50%' }}
          />
        </>
      ) : (
        // Black logo for light mode
        <>
          <motion.path
            d="M71.2876 91.5639L5.40262 82.2023L0.352051 86.5828L71.2876 96.6587L100.352 71.4438L95.3078 70.7295L71.2876 91.5639Z"
            fill="black"
            animate={animateProps}
            transition={createLayerTransition(0)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M71.2876 76.2791L100.352 51.0642L95.3078 50.3499L71.2876 71.178L47.7794 67.8405L15.4911 63.2576L5.40262 61.8227L0.352051 66.2033L10.4469 67.6319L0.352051 76.3866L71.2876 86.4624L100.352 61.2539L95.3078 60.5396L71.2939 81.374L37.6845 76.5952L42.7288 72.221L71.2876 76.2791Z"
            fill="black"
            animate={animateProps}
            transition={createLayerTransition(0.2)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M71.2876 60.9885L5.40262 51.627L0.352051 56.0075L71.2876 66.0834L100.352 40.8748L95.3078 40.1605L71.2876 60.9885Z"
            fill="black"
            animate={animateProps}
            transition={createLayerTransition(0.4)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M95.3078 19.7744L85.213 28.5292L71.2876 40.6088L44.0562 36.7403L5.40262 31.2472L0.352051 35.6278L39.0057 41.1145L33.9614 45.495L5.3963 41.4369L0.352051 45.8174L71.2876 55.8933L100.352 30.6847L90.2572 29.2498L100.352 20.4887L95.3078 19.7744Z"
            fill="black"
            animate={animateProps}
            transition={createLayerTransition(0.6)}
            style={{ transformOrigin: '50% 50%' }}
          />
          <motion.path
            d="M100.352 10.2995L29.4165 0.223633L0.352051 25.4322L71.2876 35.5144L100.352 10.2995Z"
            fill="black"
            animate={animateProps}
            transition={createLayerTransition(0.8)}
            style={{ transformOrigin: '50% 50%' }}
          />
        </>
      )}
    </motion.svg>
  )
}
