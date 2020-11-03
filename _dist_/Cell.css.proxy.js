// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button.svelte-noe0nm.svelte-noe0nm{position:relative;border:none;background:none;color:white;outline:none;padding:5px;height:calc(100% / var(--grid-height));width:calc(100% / var(--grid-width))}button.revealed.svelte-noe0nm div.svelte-noe0nm,button.flagged.svelte-noe0nm div.svelte-noe0nm{background:#111}div.svelte-noe0nm.svelte-noe0nm{display:flex;align-items:center;justify-content:center;height:100%;width:100%;background:#444;border:2px solid transparent;border-radius:4px;color:white;cursor:pointer;outline:none}div.svelte-noe0nm.svelte-noe0nm::before{display:inline-block;content:\"\"}button.svelte-noe0nm:focus div.svelte-noe0nm{border:2px solid rgb(241, 163, 60)}button.svelte-noe0nm:active div.svelte-noe0nm{background:#666}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}