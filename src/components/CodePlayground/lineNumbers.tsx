import { AnnotationHandler, InnerLine } from 'codehike/code'

export const lineNumbers: AnnotationHandler = {
  name: 'lineNumbers',
  Line: (props) => {
    const { lineNumber } = props
    return (
      <div className="flex flex-row gap-2 py-0.5">
        <div className="text-body-muted/50 select-none pr-3">{lineNumber}</div>
        <InnerLine merge={props} className="inline-block" />
      </div>
    )
  },
}
