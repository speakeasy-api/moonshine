export type Range<N extends number, Arr extends unknown[] = []> = Arr['length'] extends N ? [...Arr, N][number] : Range<N, [...Arr, Arr['length']]>;
