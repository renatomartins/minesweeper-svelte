<script>
  import Popup from "./Popup.svelte";
  import Status from "./Status.svelte";
  import Grid from "./Grid.svelte";

  type GameStatus = "ongoing" | "lost" | "victory";

  let gridHeight: number;
  let gridWidth: number;
  const bombRatio = 0.2;
  $: numberOfBombs = Math.floor(gridHeight * gridWidth * bombRatio);

  let gameStatus: GameStatus;
  let statusHeight: number;
  let showPopup: boolean;
  let gridReset: boolean;
  let missingCells: number;
  let usedFlags: number;
  $: {
    missingCells = gridHeight * gridWidth;
    usedFlags = 0;
  }

  const reset = () => {
    showPopup = false;
    gameStatus = "ongoing";
    gridReset = true;
    missingCells = gridHeight * gridWidth;
    usedFlags = 0;
  };
  reset();

  $: if (missingCells === 0) {
    gameStatus = "victory";
    showPopup = true;
  }

  const handleReveal = ({
    detail: { remainingCells },
  }: {
    detail: { remainingCells: number };
  }) => {
    if (gameStatus !== "ongoing") {
      return;
    }
    missingCells = remainingCells;
    gridReset = false;
  };

  const handleFlag = ({
    detail: { remainingCells, numberOfFlags },
  }: {
    detail: { remainingCells: number; numberOfFlags: number };
  }) => {
    if (gameStatus !== "ongoing") {
      return;
    }
    usedFlags = numberOfFlags;
    missingCells = remainingCells;
    gridReset = false;
  };

  const handleGameOver = () => {
    gameStatus = "lost";
    showPopup = true;
  };
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
  }
</style>

<main style={`--grid-height: ${gridHeight}; --grid-width: ${gridWidth}`}>
  <Popup title={gameStatus === 'lost' ? '😵' : '🎉'} show={showPopup}>
    <button autofocus={true} tabindex={0} on:click={reset}>Play again!</button>
  </Popup>
  <Status
    {missingCells}
    {usedFlags}
    {numberOfBombs}
    height={statusHeight}
    bind:gridHeight
    bind:gridWidth />
  <Grid
    height={gridHeight}
    width={gridWidth}
    bombs={numberOfBombs}
    topOffset={statusHeight}
    reset={gridReset}
    on:cells={handleReveal}
    on:flags={handleFlag}
    on:gameOver={handleGameOver} />
</main>
