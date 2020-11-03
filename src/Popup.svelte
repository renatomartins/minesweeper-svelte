<script>
  export let title = "";
  export let show = false;
</script>

<style>
  .popup {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .popup__backdrop {
    position: absolute;
    height: 100%;
    width: 100%;
    background: #222a;
    z-index: 1000;
  }

  .popup__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    min-width: 200px;
    min-height: 200px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border: 1px solid #000;
    border-radius: 4px;
    box-shadow: 0 0 20px #00000080;
    background: #222;
    z-index: 1001;
  }

  .popup__title {
    font-size: 3em;
  }
</style>

{#if show}
  <section class="popup">
    <div class="popup__backdrop" />
    <div class="popup__content">
      {#if title}
        <h2 class="popup__title">{title}</h2>
      {/if}
      <div class="popup__actions">
        <slot />
      </div>
    </div>
  </section>
{/if}
