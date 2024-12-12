import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer(
    {
    links: {
    },
  }
  ),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
  ],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.Divider(),
        Component.DesktopOnly(Component.RecentNotes({
      title: "Latest",
      limit: 9,
    }))
  ],
  right: [
    // Component.TagList(),
    Component.MobileOnly(Component.RecentNotes({
      title: "Latest",
      limit: 5
    })),
     Component.DesktopOnly(Component.Graph({
       localGraph: {
         linkDistance: 50,
       },
       globalGraph: {
         linkDistance: 50,
       },
     })),
        Component.DesktopOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      sortFn: (a, b) => {
        if ((!a.file && !b.file) || (a.file && b.file)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (a.file && !b.file) {
          return 1
        } else {
          return -1
        }
      },
    })),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.ArticleTitle()],
  left: [
    Component.PageTitle(),
    Component.Search(),
    Component.Darkmode(),
    Component.Divider(),
    Component.DesktopOnly(Component.RecentNotes({
      title: "Most recent",
      limit: 5
    })),
    Component.DesktopOnly(Component.Explorer({
      title: "Explore",
      useSavedState: true,
      sortFn: (a, b) => {
        if ((!a.file && !b.file) || (a.file && b.file)) {
          return a.displayName.localeCompare(b.displayName, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        }
        if (a.file && !b.file) {
          return 1
        } else {
          return -1
        }
      },
    })),
  ],
  right: [],
}
