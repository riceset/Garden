import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

export default (() => {
  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: string[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

      if (fileData.dates) {
        // segments.push(formatDate(getDate(cfg, fileData)!))
        const createdDate = formatDate(getDate(cfg, fileData)!)
        let modifiedDateSegment = '';
        if (fileData.frontmatter.modified) {
            const modifiedDate = formatDate(new Date(fileData.frontmatter.modified));
            modifiedDateSegment = `, modified on ${modifiedDate}`;
        }
        segments.push(`Created on ${createdDate}${modifiedDateSegment}`)
      }

      segments.push(timeTaken)
      return <p class={`content-meta ${displayClass ?? ""}`}>{segments.join(", ")}</p>
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor
