// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function debounce(func: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
