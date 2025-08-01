import { AnnotationHandler, InnerLine } from 'codehike/code'

export const lineNumbers: AnnotationHandler = {
  name: 'lineNumbers',
  Line: (props) => {
    const { lineNumber } = props
    return (
      <div className="flex flex-row gap-2 py-0.5">
        <div className="text-body-muted pr-3 select-none">{lineNumber}</div>
        <InnerLine merge={props} className="inline-block" />
      </div>
    )
  },
}
