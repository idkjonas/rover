<script>
  import { pan } from "svelte-gestures";
  import { spring } from "svelte/motion";

  export let enableGestures = true;

  let currentAction;

  let startPosition = 0;

  const dragX = spring(0);

  $: console.log(currentAction);

  // $: console.log($dragX);

  $: {
    // if (0 < $dragX > 100) currentAction = 0;
    // if (0 < $dragX) currentAction = 1;
    // if (0 > $dragX) currentAction = 2;
    // if (0 > $dragX < -100) currentAction = 3;

    if ($dragX > 0) currentAction = "left";
    if ($dragX < 0) currentAction = "right";
  }
</script>

{#if enableGestures === "prevent from enabling until this is properly implemented :)"}
  <rover-gesture-view class="overflow-hidden bg-[var(--gray-5)]">
    <div
      use:pan={{ delay: 200 }}
      on:pan={(e) =>
        enableGestures && dragX.set((e.detail.x - startPosition) * 0.75)}
      on:pandown={(e) => (startPosition = e.detail.event.layerX)}
      on:panup={() => dragX.set(0)}
    >
      <div
        style="transform: perspective(500px) translate3d({$dragX}px, 0, 0px)"
      >
        <slot />
      </div>
    </div>
  </rover-gesture-view>
{:else}
  <slot />
{/if}
