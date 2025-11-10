// quartz/components/resources/mermaid-init.ts
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

function toMermaidContainers() {
  const blocks = document.querySelectorAll<HTMLElement>("code.language-mermaid, pre > code.language-mermaid");
  blocks.forEach((block) => {
    const code = block.textContent ?? "";
    const container = document.createElement("div");
    container.className = "mermaid";
    container.textContent = code;
    const pre = block.closest("pre");
    (pre ?? block).replaceWith(container);
  });
}

async function renderMermaid() {
  // In case Quartz hasn’t finished swapping content yet (mobile Safari)
  await Promise.resolve(); // microtask: let DOM updates flush
  toMermaidContainers();
  mermaid.init(undefined, ".mermaid");
}

// First load after DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderMermaid, { once: true });
} else {
  renderMermaid();
}

// Re-run after SPA navigations; add a slight delay for mobile
window.addEventListener("quartz:navigation", () => {
  // macOS/iOS Safari sometimes needs a tick; setTimeout 0 is enough
  setTimeout(renderMermaid, 0);
});
