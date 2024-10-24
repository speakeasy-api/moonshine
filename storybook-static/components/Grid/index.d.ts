import { Columns, Gap, ResponsiveValue } from '../../types';
interface GridProps {
    columns?: ResponsiveValue<Columns>;
    gap?: ResponsiveValue<Gap>;
    children: React.ReactNode;
}
export default function Grid({ children, columns, gap }: GridProps): import("react/jsx-runtime").JSX.Element;
export {};
