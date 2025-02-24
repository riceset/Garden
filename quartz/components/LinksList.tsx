import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const LinksList: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    return (
      <ul class={`${displayClass ?? ""}`}>
        {Object.entries(links).map(([text, link]) => (
          <li>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
    )
  }

  LinksList.css = style
  return LinksList
}) satisfies QuartzComponentConstructor
