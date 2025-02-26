import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const LinksList: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    return (
      <>
        <style>
          {`
            @media (max-width: 800px) {
              .contact-header {
                text-align: center;
              }
              .contact-list {
                text-align: center;
              }
            }
          `}
        </style>
        <div class={`${displayClass ?? ""}`}>
          <h3 class="contact-header" style={{ margin: "0.5rem 0 0 0", fontSize: "1rem" }}>Social</h3>
          <ul class="contact-list" style={{ listStyleType: "none", padding: 0, margin: "1rem 0 0 0" }}>
            {Object.entries(links).map(([text, link]) => (
              <li><a href={link}>{text}</a></li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  LinksList.css = style
  return LinksList
}) satisfies QuartzComponentConstructor
