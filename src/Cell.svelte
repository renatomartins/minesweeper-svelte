<script>
  import type Cell from "./lib/Cell";
  import { createEventDispatcher } from "svelte";

  export let cell: Cell;
  let size;
  const dispatch = createEventDispatcher();

  const getCellIcon = (cell: Cell): string => {
    if (cell.flagged) {
      return "🚩";
    } else if (!cell.revealed) {
      return "";
    } else if (cell.revealed && cell.hasBomb) {
      return "💥";
    } else if (cell.hasBomb) {
      return "💣";
    }
    const bombs = cell.bombsInVicinity;
    return bombs !== 0 ? String(cell.bombsInVicinity) : "";
  };

  const handleClick = () => {
    if (cell.isRevealable()) {
      dispatch("reveal", [cell.x, cell.y]);
    }
  };

  const handleRightClick = () => {
    dispatch("flag", [cell.x, cell.y]);
  };
</script>

<style>
  button {
    position: relative;
    border: none;
    background: none;
    color: white;
    outline: none;
    padding: 5px;
    height: calc(100% / var(--grid-height));
    width: calc(100% / var(--grid-width));
  }
  button.revealed div,
  button.flagged div {
    background: #111;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #444;
    border: 2px solid transparent;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    outline: none;
  }
  div::before {
    display: inline-block;
    content: "";
  }
  button:focus div {
    border: 2px solid rgb(241, 163, 60);
  }
  button:active div {
    background: #666;
  }
</style>

<button
  class:revealed={cell.revealed}
  class:flagged={cell.flagged}
  bind:clientWidth={size}
  style={`font-size: ${size / 3}px`}
  on:click={handleClick}
  on:contextmenu|preventDefault={handleRightClick}
  tabindex="0">
  <div tabindex="-1">{getCellIcon(cell)}</div>
</button>
