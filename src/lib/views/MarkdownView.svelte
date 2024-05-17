<script>
  import { marked } from "marked";
  export let source;
</script>

<rover-markdown-view class="break-words {$$restProps.class || ''}">
  {@html marked(source, { mangle: false, headerIds: false })}
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

  rover-markdown-view :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin-block-end: 1rem;
  }

  rover-markdown-view :global(td),
  rover-markdown-view :global(th) {
    border: 1px solid var(--gray-5);
    text-align: left;
    padding: 0.5rem;
  }

  rover-markdown-view :global(tr):nth-child(even),
  rover-markdown-view :global(th) {
    background: var(--gray-6);
  }
</style>
