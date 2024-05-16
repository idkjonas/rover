<script>
  import { Link2, ChevronRight } from "lucide-svelte";
  export let url;
  export let thumbnail = undefined;
  export let preview;

  console.log(preview);
</script>

<a
  href={url}
  target="_blank"
  title={url}
  class="bg-[var(--gray-6)] overflow-clip block rounded-[10px]"
>
  {#if thumbnail}
    <img
      src={thumbnail}
      class="object-cover w-full max-h-60"
      alt="{url}'s thumbnail"
    />
  {/if}

  <div
    class="grid grid-cols-[min-content,1fr,min-content] pr-3 py-3 text-[var(--gray-1)]"
  >
    <div class="border-r px-3 mr-3 border-[var(--gray-4)]">
      <Link2 />
    </div>
    <div class="truncate">
      {url}
    </div>
    <ChevronRight />
  </div>
</a>
