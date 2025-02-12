import './global.css'

export { isGroupOf } from '@/lib/typeUtils'
export { Grid } from '@/components/Grid'
export { Stack } from '@/components/Stack'
export { Button } from '@/components/Button'
export { Card } from '@/components/Card'
export { Icon } from '@/components/Icon'
export { type IconName } from '@/components/Icon/names'
export { Separator } from '@/components/Separator'
export { Badge } from '@/components/Badge'
export { Heading } from '@/components/Heading'
export { Text } from '@/components/Text'
export { Score, type ScoreValue } from '@/components/Score'
export { Logo } from '@/components/Logo'
export { Container } from '@/components/Container'
export { Combobox } from '@/components/Combobox'
export { TargetLanguageIcon } from '@/components/TargetLanguageIcon'
export { UserAvatar } from '@/components/UserAvatar'
export { Subnav, type SubnavItem } from '@/components/Subnav'
export { Breadcrumb } from '@/components/Breadcrumb'
export { CodeSnippet } from '@/components/CodeSnippet'
export { LoggedInUserMenu } from '@/components/LoggedInUserMenu'
export {
  WorkspaceSelector,
  type Org,
  type Workspace,
} from '@/components/WorkspaceSelector'
export { Wizard } from '@/components/Wizard'
export { type WizardStep, type WizardCommand } from '@/components/Wizard/types'
export { MoonshineConfigProvider } from '@/context/ConfigContext'
export { useConfig as useMoonshineConfig } from '@/hooks/useConfig'
export { GradientCircle } from '@/components/GradientCircle'
export { Alert } from '@/components/Alert'
export { Tabs, type TabProps, type TabsProps } from '@/components/Tabs'
export {
  Table,
  type TableProps,
  type Column,
  type Group,
} from '@/components/Table'
export { Input, type InputProps } from '@/components/Input'
export { type SupportedLanguage, supportedLanguages } from '@/types'
export { PageHeader } from '@/components/PageHeader'
export { default as useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
export { ExternalPill } from '@/components/ExternalPill'
export { LanguageIndicator } from '@/components/LanguageIndicator'
export {
  Select,
  SelectGroup,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
} from '@/components/Select'
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/Tooltip'
export { Facepile, type FacepileProps } from '@/components/Facepile'
export { Link, type LinkProps } from '@/components/Link'
export { Dialog } from '@/components/Dialog'
export { Navbar } from '@/components/Navbar'

/** START BETA COMPONENTS */
import { CLIWizard } from '@/components/__beta__/CLIWizard'
import { ActionBar } from '@/components/__beta__/ActionBar'
import { Timeline } from '@/components/__beta__/Timeline'
import { KeyHint } from '@/components/__beta__/KeyHint'
import { HighlightedText } from '@/components/__beta__/HighlightedText'
import { DragNDropArea } from '@/components/__beta__/DragNDrop/DragNDropArea'
import { DragOverlay } from '@/components/__beta__/DragNDrop/DragOverlay'
import { Draggable } from '@/components/__beta__/DragNDrop/Draggable'
import { Droppable } from '@/components/__beta__/DragNDrop/Droppable'
import { ResizablePanel } from './components/__beta__/ResizablePanel'
import { CodePlayground } from './components/__beta__/CodePlayground'
import { CodeEditor } from './components/__beta__/CodeEditorLayout'

export const beta = {
  // TODO: This component is not yet reusable, it's only for use on the SDK Overview page right now
  CLIWizard,

  // Readme editor components
  ActionBar,
  Timeline,
  KeyHint,
  HighlightedText,

  // Drag & Drop primitives
  DragNDropArea,
  DragOverlay,
  Draggable,
  Droppable,

  ResizablePanel,
  CodePlayground,
  CodeEditor,
}

/** END BETA COMPONENTS */
