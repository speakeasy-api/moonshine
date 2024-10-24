import { ResponsiveValue } from '../types';
import { ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Given an object of responsive values for T and a mapper function, return a string of class names
 * that correspond to the responsive values.
 *
 * @param value - The responsive value
 * @param mapper - A function that takes the value and returns a string of class names
 * @returns A string of class names
 * @example
 * const gapMapper = (gap: number) => `gap-${gap}`
 * const gap = getResponsiveClasses({ sm: 0, md: 10 }, gapMapper)
 * // => 'gap-0 md:gap-10'
 */
export declare function getResponsiveClasses<T>(value: ResponsiveValue<T>, mapper: (val: T) => string): string;
