import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.LinksList({
        links: {
            "E-Mail": "mailto:riceset@icloud.com",
            GitHub: "https://github.com/riceset",
            LinkedIn: "https://www.linkedin.com/in/riceset/",
            Mastodon: "https://mastodon.social/@riceset",
        }
    })),
    Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(Component.RecentNotes({
        title: "Latest",
        limit: 8
    })),
    Component.MobileOnly(Component.RecentNotes({
        title: "Latest",
        limit: 2
    })),
    Component.MobileOnly(Component.LinksList({
        links: {
            "E-Mail": "mailto:riceset@icloud.com",
            GitHub: "https://github.com/riceset",
            LinkedIn: "https://www.linkedin.com/in/riceset/",
            Mastodon: "https://mastodon.social/@riceset",
        }
    }))
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.DesktopOnly(Component.LinksList({
        links: {
            "E-Mail": "mailto:riceset@icloud.com",
            GitHub: "https://github.com/riceset",
            LinkedIn: "https://www.linkedin.com/in/riceset/",
            Mastodon: "https://mastodon.social/@riceset",
        }
    })),
    Component.Explorer(),
  ],
  right: [
    Component.DesktopOnly(Component.RecentNotes({
        title: "Latest",
        limit: 8
    })),
    Component.MobileOnly(Component.RecentNotes({
        title: "Latest",
        limit: 2
    })),
    Component.MobileOnly(Component.LinksList({
        links: {
            "E-Mail": "mailto:riceset@icloud.com",
            GitHub: "https://github.com/riceset",
            LinkedIn: "https://www.linkedin.com/in/riceset/",
            Mastodon: "https://mastodon.social/@riceset",
        }
    }))
  ],
}
