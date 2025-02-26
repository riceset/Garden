// Darkmode.tsx
import darkmodeScript from "./scripts/darkmode.inline"
// import styles from "./styles/darkmode.scss" // (optional) remove if you no longer need button styling
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Darkmode: QuartzComponent = (_props: QuartzComponentProps) => {
  // Return nothing so no toggle button is rendered
  return null
}

// Keep this so the system dark-mode logic still applies
Darkmode.beforeDOMLoaded = darkmodeScript
// If you no longer need the button’s CSS, comment out or remove:
// Darkmode.css = styles

export default (() => Darkmode) satisfies QuartzComponentConstructor
