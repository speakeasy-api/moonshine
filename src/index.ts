import './global.css'

export { isGroupOf } from '@/lib/typeUtils'
export { Grid, type GridProps } from '@/components/Grid'
export { Stack, type StackProps } from '@/components/Stack'
export { Button, type ButtonProps } from '@/components/Button'
export { Card, type CardProps } from '@/components/Card'
export { Icon, type IconProps } from '@/components/Icon'
export { isIconName } from '@/components/Icon/isIconName'
export { type IconName } from '@/components/Icon/names'
export { Separator, type SeparatorProps } from '@/components/Separator'
export { Skeleton, type SkeletonProps } from '@/components/Skeleton'
export { Badge, type BadgeProps } from '@/components/Badge'
export { Heading, type HeadingProps } from '@/components/Heading'
export { Text, type TextProps } from '@/components/Text'
export { Score, type ScoreValue } from '@/components/Score'
export { Logo, type LogoProps } from '@/components/Logo'
export { Container, type ContainerProps } from '@/components/Container'
export { Combobox, type ComboboxProps } from '@/components/Combobox'
export {
  TargetLanguageIcon,
  type TargetLanguageIconProps,
} from '@/components/TargetLanguageIcon'
export { UserAvatar, type UserAvatarProps } from '@/components/UserAvatar'
export { Subnav, type SubnavItem, type SubnavProps } from '@/components/Subnav'
export { Breadcrumb, type BreadcrumbProps } from '@/components/Breadcrumb'
export { CodeSnippet, type CodeSnippetProps } from '@/components/CodeSnippet'
export {
  LoggedInUserMenu,
  type LoggedInUserProps,
} from '@/components/LoggedInUserMenu'
export {
  PromptInput,
  type PromptInputProps,
  type Suggestion,
  type Attachment,
} from '@/components/PromptInput'
export {
  WorkspaceSelector,
  type Org,
  type Workspace,
  type WorkspaceSelectorProps,
} from '@/components/WorkspaceSelector'
export { Wizard, type WizardProps } from '@/components/Wizard'
export { type WizardStep, type WizardCommand } from '@/components/Wizard/types'
export {
  MoonshineConfigProvider,
  type MoonshineConfigProviderProps,
} from '@/context/ConfigContext'
export { useConfig as useMoonshineConfig } from '@/hooks/useConfig'
export { useTheme as useMoonshineTheme } from '@/hooks/useTheme'
export { default as useTailwindBreakpoint } from '@/hooks/useTailwindBreakpoint'
export {
  GradientCircle,
  type GradientCircleProps,
} from '@/components/GradientCircle'
export { Alert, type AlertProps } from '@/components/Alert'
export { Tabs, type TabProps } from '@/components/Tabs'
export {
  Table,
  type TableProps,
  type Column,
  type Group,
} from '@/components/Table'
export { Input, type InputProps } from '@/components/Input'
export {
  type SupportedLanguage,
  supportedLanguages,
  isSupportedLanguage,
} from '@/types'
export { PageHeader, type PageHeaderProps } from '@/components/PageHeader'

export { ExternalPill, type ExternalPillProps } from '@/components/ExternalPill'
export {
  LanguageIndicator,
  type LanguageIndicatorProps,
} from '@/components/LanguageIndicator'
export {
  PullRequestLink,
  type PullRequestLinkProps,
} from '@/components/PullRequestLink'
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
export {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
} from '@/components/Popover'
export { Facepile, type FacepileProps } from '@/components/Facepile'
export { Link, type LinkProps } from '@/components/Link'
export { Dialog } from '@/components/Dialog'
export { Navbar, type NavbarProps, type NavItem } from '@/components/Navbar'
export { Switch, type SwitchProps } from '@/components/Switch'

export { ActionBar, type ActionBarProps } from '@/components/ActionBar'
export {
  Key,
  type KeyProps,
  KeyHint,
  type KeyHintProps,
} from '@/components/KeyHint'
export {
  HighlightedText,
  type HighlightedTextProps,
} from '@/components/HighlightedText'
export {
  DragNDropArea,
  type DragNDropAreaProps,
} from '@/components/DragNDrop/DragNDropArea'
export { DragOverlay } from '@/components/DragNDrop/DragOverlay'
export {
  Draggable,
  type DraggableProps,
} from '@/components/DragNDrop/Draggable'
export {
  Droppable,
  type DroppableProps,
} from '@/components/DragNDrop/Droppable'
export {
  ResizablePanel,
  type ResizablePanelProps,
} from '@/components/ResizablePanel'
export {
  CodePlayground,
  type CodePlaygroundProps,
  type CodePlaygroundSnippets,
} from '@/components/CodePlayground'
export {
  CodeEditor,
  type CodeEditorLayoutProps,
} from '@/components/CodeEditorLayout'
export {
  Command,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from '@/components/Command'
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/Dropdown'

// ContextDropdown
export { ContextDropdown } from '@/components/ContextDropdown'
export { ContextDropdownProvider as ContextDropdownProvider } from '@/components/ContextDropdown/provider'
export { useModal as useContextDropdown } from '@/components/ContextDropdown/useModal'

export { Loader, type LoaderProps } from '@/components/Loader'

/** START BETA COMPONENTS */
import { CLIWizard } from '@/components/__beta__/CLIWizard'
import { Timeline } from '@/components/__beta__/Timeline'

export const beta = {
  // TODO: This component is not yet reusable, it's only for use on the SDK Overview page right now
  // TODO: needs light mode tweaks too.
  CLIWizard,

  // Readme editor components
  Timeline,
}
// DO NOT USE: EXPORTED TO UNBLOCK GRAM
export {
  AIChatContainer,
  AIChatMessage,
  AIChatMessageComposer,
} from '@/components/AIChat'
export { useToolCallApproval } from '@/components/AIChat/toolCallApproval'

/** END BETA COMPONENTS */
