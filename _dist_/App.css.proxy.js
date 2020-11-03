// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "main.svelte-1cyhqsa{display:flex;flex-direction:column;align-items:center;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}