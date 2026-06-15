// TODO: https://linear.app/speakeasy/issue/SXF-171/input-component
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { IconName } from "../Icon/names";
import { useCallback, useState } from "react";

export interface InputProps extends React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> {
  icon?: IconName;
  multiline?: boolean;
  error?: boolean;
  className?: string;
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled,
  icon,
  multiline,
  error,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (props.onFocus) {
        props.onFocus(event);
      }
      setIsFocused(true);
    },
    [props.onFocus],
  );
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (props.onBlur) {
        props.onBlur(event);
      }
      setIsFocused(false);
    },
    [props.onBlur],
  );

  const commonProps = {
    value,
    onChange,
    placeholder,
    disabled,
  } as const;

  let element: React.ReactNode = (
    <input
      {...commonProps}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "h-full w-full bg-surface-primary-default text-sm text-default shadow-none outline-none placeholder:text-placeholder disabled:cursor-not-allowed disabled:opacity-50",
        isFocused && "placeholder:text-default",
      )}
    />
  );

  if (multiline) {
    element = (
      <textarea
        {...commonProps}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        cols={30}
        rows={10}
        className={cn(
          "my-2 h-full max-h-60 min-h-16 w-full bg-surface-primary-default px-3 py-3 text-sm text-default shadow-none outline-none placeholder:text-placeholder disabled:cursor-not-allowed disabled:opacity-50",
          isFocused && "placeholder:text-default",
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border border-input bg-surface-primary-default px-4 py-3 text-muted-foreground",
        icon && "px-3",
        isFocused && "border-focus text-default",
        error && "border-destructive-default",
        className,
      )}
    >
      {icon && <Icon name={icon} size="small" />}
      {element}
    </div>
  );
}
