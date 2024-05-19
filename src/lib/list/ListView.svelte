<script>
  export let title;
</script>

<rover-list-view>
  {#if title}
    <h3 class="my-1 ml-4 uppercase text-sm text-[var(--gray-1)]">{title}</h3>
  {/if}
  <ul
    class="bg-[var(--gray-5)] grid-cols-1 grid gap-px overflow-clip rounded-[10px] {$$restProps.class ||
      ''}"
  >
    <slot />
  </ul>
</rover-list-view>
