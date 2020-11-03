<script>
  const defaultHeight = 4;
  const defaultWidth = 4;

  export let gridHeight =
    localStorage.getItem("gridHeight") !== null
      ? parseInt(localStorage.getItem("gridHeight") || "" + defaultHeight, 10)
      : defaultHeight;
  export let gridWidth =
    localStorage.getItem("gridWidth") !== null
      ? parseInt(localStorage.getItem("gridWidth") || "" + defaultWidth, 10)
      : defaultWidth;
  export let height: number;
  export let missingCells = 0;
  export let numberOfBombs = 0;
  export let usedFlags = 0;
  const status = "";

  $: {
    localStorage.setItem("gridHeight", "" + gridHeight);
    localStorage.setItem("gridWidth", "" + gridWidth);
  }
</script>

<style>
  .status {
    justify-content: space-between;
    display: flex;
    padding: 10px;
    width: 100%;
  }

  .status__dimensions-separator {
    padding: 0 10px;
  }

  .status__info {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .status__info__item + .status__info__item {
    margin-left: 15px;
    padding-left: 15px;
  }
</style>

<nav class="status">
  <div class="status__options">
    <input type="number" min="2" max="20" bind:value={gridHeight} />
    <span class="status__dimensions-separator">x</span>
    <input type="number" min="2" max="20" bind:value={gridWidth} />
  </div>
  <span />
  <div>{status}</div>
  <ul class="status__info" bind:clientHeight={height}>
    <li class="status__info__item">◽️ &nbsp;{missingCells}</li>
    <li class="status__info__item">🚩 &nbsp;{usedFlags}</li>
    <li class="status__info__item">💣 &nbsp;{numberOfBombs}</li>
  </ul>
</nav>
