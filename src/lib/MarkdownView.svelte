<script>
  import SvelteMarkdown from "svelte-markdown";
  export let source;
</script>

<div rover-markdown>
  <SvelteMarkdown {source} />
</div>

<style>
  [rover-markdown] :global(p:not(:last-child)) {
    @apply mb-[1lh];
  }

  [rover-markdown] :global(hr) {
    @apply h-4 opacity-0;
  }

  [rover-markdown] :global(br) {
    @apply mb-4;
  }

  [rover-markdown] :global(a) {
    @apply text-[var(--blue)] fine:hover:underline;
  }
</style>
