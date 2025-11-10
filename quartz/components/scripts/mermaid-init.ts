// quartz/components/resources/mermaid-init.ts
import mermaid from "mermaid";

// Initialize without auto-start so we control render timing
mermaid.initialize({ startOnLoad: false });

function renderMermaid() {
  // Convert highlighted code fences back into .mermaid containers
  document
    .querySelectorAll<HTMLElement>("code.language-mermaid, pre > code.language-mermaid")
    .forEach((block) => {
      const code = block.textContent ?? "";
      const container = document.createElement("div");
      container.className = "mermaid";
      container.textContent = code;

      const pre = block.closest("pre");
      (pre ?? block).replaceWith(container);
    });

  // Render .mermaid blocks
  mermaid.init(undefined, ".mermaid");
}

// Run at initial load
renderMermaid();

// Re-run after SPA navigations (Quartz dispatches this when content swaps)
window.addEventListener("quartz:navigation", renderMermaid);
