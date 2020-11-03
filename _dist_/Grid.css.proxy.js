// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-1moi1gb{height:100%;width:100%;max-height:calc(100vw - var(--top-offset));max-width:calc(100vh - var(--top-offset))}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}