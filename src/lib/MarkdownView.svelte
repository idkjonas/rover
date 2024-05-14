<script>
  import SvelteMarkdown from "svelte-markdown";
  export let source;
</script>

<rover-markdown-view class={$$restProps.class || ""}>
  <SvelteMarkdown {source} />
</rover-markdown-view>

<style>
  rover-markdown-view :global(p:not(:last-child)) {
    @apply mb-[1lh];
  }

  rover-markdown-view :global(hr) {
    @apply h-4 opacity-0;
  }

  rover-markdown-view :global(br) {
    @apply mb-4;
  }

  rover-markdown-view :global(a) {
    @apply text-[var(--blue)] fine:hover:underline;
  }

  rover-markdown-view :global(ul) {
    @apply list-disc pl-6;
  }
</style>
