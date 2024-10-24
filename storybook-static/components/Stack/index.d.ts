import { default as React } from '../../../node_modules/.pnpm/react@18.3.1/node_modules/react';
import { Gap, ResponsiveValue } from '../../types';
type Direction = 'row' | 'column';
interface StackProps {
    children: React.ReactNode;
    direction?: ResponsiveValue<Direction>;
    gap?: ResponsiveValue<Gap>;
}
export declare function Stack({ children, direction, gap }: StackProps): import("react/jsx-runtime").JSX.Element;
export {};
