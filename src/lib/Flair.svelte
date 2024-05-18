<script>
  export let nsfw = false;

  export let text;
</script>

<rover-flair
  class="bg-[var(--gray-6)] overflow-hidden max-w- truncate shrink text-sm font-normal px-1.5 py-0.5 rounded text-[var(--gray-1)]
  {nsfw && 'bg-[var(--red)] text-white'}
  "
>
  {#if !nsfw}
    {@html text}
  {:else}
    NSFW
  {/if}
</rover-flair>

{" "}
