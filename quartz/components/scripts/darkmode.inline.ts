(() => {
  const applyTheme = (theme: string) => {
    document.documentElement.setAttribute("saved-theme", theme)
    localStorage.setItem("theme", theme)
  }

  // Detect current system preference
  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"

  // Check saved theme or fall back to system theme
  const savedTheme = localStorage.getItem("theme")
  const systemTheme = getSystemTheme()

  // If no saved theme or saved theme doesn't match system theme, update it
  if (!savedTheme || savedTheme !== systemTheme) {
    applyTheme(systemTheme)
  } else {
    applyTheme(savedTheme)
  }

  document.addEventListener("nav", () => {
    const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement

    const switchTheme = (e: any) => {
      const newTheme = e.target.checked ? "dark" : "light"
      applyTheme(newTheme)
    }

    if (toggleSwitch) {
      toggleSwitch.removeEventListener("change", switchTheme)
      toggleSwitch.addEventListener("change", switchTheme)
      toggleSwitch.checked = (localStorage.getItem("theme") ?? getSystemTheme()) === "dark"
    }

    // Listen for system preference changes while the user is on the page
    const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    colorSchemeMediaQuery.addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light"
      applyTheme(newTheme)
      if (toggleSwitch) toggleSwitch.checked = e.matches
    })
  })
})()
