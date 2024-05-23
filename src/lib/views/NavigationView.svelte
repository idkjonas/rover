<script>
  import { page } from "$app/stores";
  import { hasScrolledToBottom } from "$lib/stores";
  import DetailsView from "$lib/views/DetailsView.svelte";
  import { pushState } from "$app/navigation";
  import { Close } from "svelte-ionicons";

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

<rover-navigation-view
  use:scrollListener
  class="absolute md:static inset-0 overflow-y-scroll transition-[transform,opacity] duration-300 isolate"
>
  <slot />
</rover-navigation-view>

{#if $page.state.showSubView}
  <rover-sub-navigation-view
    class="absolute md:border-l border-[var(--gray-5)] md:static inset-0 overflow-scroll z-40 size-full bg-[var(--gray-6)]"
  >
    <div
      class="w-full items-center flex p-2 -mb-4 bg-[var(--base)] sticky top-0 z-40"
    >
      <button
        on:mousedown={() => {
          pushState("", {
            showSubView: false,
          });
        }}
        class="fine:hover:bg-[var(--gray-6)] p-2 rounded-full"
      >
        <Close class="text-[var(--blue)]" />
      </button>
    </div>

    <div class="overflow-hidden">
      {#key $page.state}
        <DetailsView />
      {/key}
    </div>
  </rover-sub-navigation-view>
{/if}
