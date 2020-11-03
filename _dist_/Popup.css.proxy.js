// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".popup.svelte-lh2iiv{position:absolute;top:0;right:0;bottom:0;left:0}.popup__backdrop.svelte-lh2iiv{position:absolute;height:100%;width:100%;background:#222a;z-index:1000}.popup__content.svelte-lh2iiv{display:flex;flex-direction:column;justify-content:space-between;align-items:center;position:absolute;min-width:200px;min-height:200px;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border:1px solid #000;border-radius:4px;box-shadow:0 0 20px #00000080;background:#222;z-index:1001}.popup__title.svelte-lh2iiv{font-size:3em}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}