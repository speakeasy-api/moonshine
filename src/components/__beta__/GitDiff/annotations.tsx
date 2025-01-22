import { AnnotationHandler, BlockAnnotation, InnerLine } from 'codehike/code'
import { getChangeTypeGutterSymbol } from './utils'
import { ChangeType } from './types'
import { getChangeTypeColor, getChangeTypeGutterColor } from './styles'
import { CustomLineProps } from 'codehike/code/types'

export const handlerName = 'diff'

export const diff: AnnotationHandler = {
  name: 'diff',
  onlyIfAnnotated: true,
  Pre: (props) => {
    return (
      <pre
        {...props}
        className="bg-background flex w-full flex-col items-stretch text-sm"
      >
        {props.children}
      </pre>
    )
  },
  transform: (annotation: BlockAnnotation) => {
    const color = getChangeTypeColor(annotation?.query as ChangeType)
    return [
      annotation,
      {
        ...annotation,
        name: 'mark',
        query: color,
      },
    ]
  },
  Line: (props) => {
    return (
      <div className="flex w-full flex-row items-center gap-2">
        <div className="flex flex-row gap-2 py-0.5">
          <InnerLine merge={props} />
        </div>
      </div>
    )
  },
}

function renderLine({
  annotation,
  color,
  ...props
}: CustomLineProps & { color: string }) {
  return (
    <div
      style={{
        borderLeft: 'solid 2px transparent',
        borderLeftColor: annotation && color,
        backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
      }}
      className="flex w-full flex-row items-center"
    >
      <div className="text-muted px-0.5 pl-1.5 text-xs">{props.lineNumber}</div>
      <div className="flex flex-row items-center gap-2">
        <div
          className="ml-1.5 text-xs"
          style={{
            color:
              annotation?.data.changeType &&
              getChangeTypeGutterColor(
                annotation?.data?.changeType as ChangeType
              ),
          }}
        >
          {getChangeTypeGutterSymbol(
            annotation?.data?.changeType as ChangeType
          )}
        </div>
        <InnerLine merge={props} />
      </div>
    </div>
  )
}

export const mark: AnnotationHandler = {
  name: 'mark',
  onlyIfAnnotated: true,
  Line: ({ annotation, ...props }) => {
    const color = annotation?.query || 'rgb(14 165 233)'
    // TODO: this component is incorrect at the moment
    // as it doesn't render the before and after lines in the
    // case of a modification (across a single or multi line change)
    return <>{renderLine({ annotation, color, ...props })}</>
  },

  Inline: ({ annotation }) => {
    const color = annotation?.query || 'rgb(14 165 233)'
    return (
      <span
        className="..."
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.5)`,
          background: `rgb(from ${color} r g b / 0.13)`,
        }}
      >
        {annotation?.data?.content}
      </span>
    )
  },
}
