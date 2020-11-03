<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Grid from "./lib/Grid";
  import Cell from "./Cell.svelte";

  export let height: number;
  export let width: number;
  export let bombs: number;
  export let topOffset = 0;
  export let reset = false;
  $: grid = Grid.random(height, width, bombs);
  const dispatch = createEventDispatcher();

  $: if (reset) {
    grid = Grid.random(height, width, bombs);
  }

  onMount(() => {
    dispatch("cells", { remainingCells: grid.getMissingCells().length });
    dispatch("flags", {
      numberOfFlags: grid.getFlaggedCells().length,
      remainingCells: grid.getMissingCells().length,
    });
  });

  const handleReveal = ({ detail: [x, y] }: { detail: [number, number] }) => {
    grid = grid.reveal(x, y);
    dispatch("cells", { remainingCells: grid.getMissingCells().length });
    if (grid.isGameOver()) {
      dispatch("gameOver");
    }
  };

  const handleFlag = ({ detail: [x, y] }: { detail: [number, number] }) => {
    grid = grid.flag(x, y);
    dispatch("flags", {
      numberOfFlags: grid.getFlaggedCells().length,
      remainingCells: grid.getMissingCells().length,
    });
  };
</script>

<style>
  div {
    height: 100%;
    width: 100%;
    max-height: calc(100vw - var(--top-offset));
    max-width: calc(100vh - var(--top-offset));
  }
</style>

<div style={`--top-offset: ${topOffset}px`} data-reset={reset}>
  {#each grid.cells as lines, y}
    {#each lines as _, x}
      <Cell
        cell={grid.get(x, y)}
        on:reveal={handleReveal}
        on:flag={handleFlag} />
    {/each}
  {/each}
</div>
