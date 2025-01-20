import { Timeline } from '.'
import { StoryObj, Meta } from '@storybook/react'
import {
  Children,
  useState,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { IconName } from '@/components/Icon/names'
import { faker } from '@faker-js/faker'
import {
  Color,
  highlightBgMap,
  highlightColors,
  HighlightedText,
  highlightFgMap,
  mutedBgMap,
  mutedFgMap,
} from '../HighlightedText'

interface TimelineItem {
  id: string
  title: string
  description: string
  position: { y: number }
  iconName: IconName
  color: Color
}

type TimelineWithStateProps = PropsWithChildren

function stateFromChildren(children: React.ReactNode) {
  return Children.toArray(children)
    .map((child) => {
      if (!isValidElement(child)) return null
      return {
        id: child.key as string,
        title: child.props.title,
        description: child.props.description,
        position: child.props.position,
        iconName: child.props.iconName,
      }
    })
    .filter((item): item is TimelineItem => item !== null)
}

interface RangeIndices {
  start: number
  end: number
}

function TimelineWithState({ children }: TimelineWithStateProps) {
  const [items, setItems] = useState<TimelineItem[]>(() =>
    stateFromChildren(children)
  )
  const [pageContent, setPageContent] = useState<string[]>([])
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const randomIndices = useRef<RangeIndices[]>([])
  const colorIndices = useRef<number[]>([])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  useEffect(() => {
    setPageContent(
      Array.from({ length: 15 }).map(() =>
        faker.lorem.sentence({ min: 70, max: 100 })
      )
    )
  }, [])

  const annotateRandomWordInSentence = useCallback(
    (sentence: string, index: number) => {
      // Initialize random indices and color for this sentence if not already set
      if (!randomIndices.current[index]) {
        const words = sentence.split(' ')
        const maxRange = Math.min(15, words.length)
        const rangeLength = Math.floor(Math.random() * (maxRange - 1)) + 1 // Random range between 1-15 words
        const startIndex = Math.floor(
          Math.random() * (words.length - rangeLength)
        )

        randomIndices.current[index] = {
          start: startIndex,
          end: startIndex + rangeLength,
        }
        colorIndices.current[index] = Math.floor(
          Math.random() * highlightColors.length
        )
      }

      const words = sentence.split(' ')
      const range = randomIndices.current[index]

      return (
        <>
          {/* Words before the range */}
          {words.slice(0, range.start).map((word, i) => (
            <span key={`before-${i}`}>{word} </span>
          ))}

          {/* Highlighted range */}
          <span ref={(el) => (wordRefs.current[index] = el)}>
            <HighlightedText
              color={highlightColors[colorIndices.current[index]]}
              muted={hoveredItem !== `highlight-${index}`}
              className="text-primary cursor-pointer hover:scale-150"
            >
              {words.slice(range.start, range.end).join(' ')}
            </HighlightedText>
          </span>

          {/* Words after the range */}
          {words.slice(range.end).map((word, i) => (
            <span key={`after-${i}`}> {word}</span>
          ))}
        </>
      )
    },
    [hoveredItem]
  )

  // Update positions based on refs
  useEffect(() => {
    if (!pageContent.length) return

    const newHighlightedItems = pageContent
      .map((content, index) => {
        const words = content.split(' ')
        const randomWord = words[randomIndices.current[index].start]
        const ref = wordRefs.current[index]
        if (!ref) return null
        const rect = ref.getBoundingClientRect()
        const offsetTop = rect.top
        const height = rect.height
        if (!offsetTop || !height) return null
        return {
          id: `highlight-${index}`,
          title: randomWord,
          description: `Highlighted word from paragraph ${index + 1}`,
          position: { y: rect.y - rect.height / 2 },
          iconName:
            index % 2 === 0
              ? 'message-square'
              : ('message-circle-code' as IconName),
          color: highlightColors[colorIndices.current[index]],
        }
      })
      .filter((item): item is TimelineItem => item !== null)

    setItems(newHighlightedItems)
  }, [pageContent])

  return (
    <Timeline>
      <Timeline.Content>
        <>
          {pageContent.map((content, index) => (
            <p
              key={index}
              className="text-muted-foreground mb-6 text-base leading-normal"
            >
              {annotateRandomWordInSentence(content, index)}
            </p>
          ))}
        </>
      </Timeline.Content>
      {items.map((item) => (
        <Timeline.Item
          key={item.id}
          title={item.title}
          description={item.description}
          // TODO: use forwardRef so we can remeasure on window resize.
          position={item.position}
          iconName={item.iconName}
          onMouseEnter={() => {
            setHoveredItem(item.id)
          }}
          onMouseLeave={() => {
            setHoveredItem(null)
          }}
          style={{
            backgroundColor:
              hoveredItem === item.id
                ? highlightBgMap[item.color]
                : mutedBgMap[item.color],
            color:
              hoveredItem === item.id
                ? highlightFgMap[item.color]
                : mutedFgMap[item.color],
          }}
        >
          {item.title}
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

const meta: Meta<typeof Timeline> = {
  component: Timeline,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    // children will be calculated based on the page content
    children: [],
  },
  render: (args) => {
    return <TimelineWithState {...args} />
  },
}
