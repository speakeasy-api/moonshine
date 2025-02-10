import { Button, MoonshineConfigProvider } from '@speakeasy-api/moonshine'

export default function Home() {
  return (
    <div>
      <MoonshineConfigProvider themeElement={document.documentElement}>
        <Button>Click me</Button>
      </MoonshineConfigProvider>
    </div>
  )
}
