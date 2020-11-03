// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".status.svelte-1v96p09.svelte-1v96p09{justify-content:space-between;display:flex;padding:10px;width:100%}.status__dimensions-separator.svelte-1v96p09.svelte-1v96p09{padding:0 10px}.status__info.svelte-1v96p09.svelte-1v96p09{display:flex;margin:0;padding:0;list-style:none}.status__info__item.svelte-1v96p09+.status__info__item.svelte-1v96p09{margin-left:15px;padding-left:15px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}