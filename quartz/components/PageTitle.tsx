import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Lexend+Zetta:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <h2 class={classNames(displayClass, "page-title")}>
        <a href={baseDir}>{title}</a>
      </h2>
    </>
  )
}

PageTitle.css = `
/* Default (light mode) */
:root {
  --primary-color: black;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: white;
  }
}

.page-title {
  font-family: 'Lexend Zetta', sans-serif;
  font-size: 1.5rem;
  margin: 0;
  color: var(--primary-color);
}

.page-title a {
  text-decoration: none;
  color: inherit;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
