<script>
  import { page } from "$app/stores";
  import { hasScrolledToBottom } from "$lib/stores";
  import { fly } from "svelte/transition";
  import DetailsView from "$lib/views/DetailsView.svelte";

  let atBottom = false;

  function scrollListener(node) {
    node.addEventListener("scroll", () => {
      atBottom = node.scrollHeight - node.offsetHeight - node.scrollTop < 1;
      if (atBottom) {
        hasScrolledToBottom.set(true);
        setTimeout(() => {
          hasScrolledToBottom.set(false);
        }, 500);
      }
    });
  }
</script>

<!-- class:opacity-50={$page.state.showSubView} -->
<rover-navigation-view
  use:scrollListener
  class="absolute inset-0 overflow-y-scroll transition-[transform,opacity] duration-300 isolate"
>
  <slot />
</rover-navigation-view>

{#if $page.state.showSubView}
  <rover-sub-navigation-view
    in:fly={{ x: 100 }}
    class="absolute inset-0 overflow-y-scroll z-50 size-full bg-[var(--background)]"
  >
    <button
      on:click={() => history.back()}
      class="bg-[var(--elevated)] z-50 border border-[var(--gray-4)] shadow sticky top-4 m-4 rounded-[10px] size-12"
    >
      &times;
    </button>

    <DetailsView />
  </rover-sub-navigation-view>
{/if}
