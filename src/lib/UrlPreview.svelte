<script>
  import { Compass, ChevronForward } from "svelte-ionicons";
  export let url;
  export let preview;
  export let viewType;

  let dontRenderThumbnail;
</script>

<a
  href={url}
  target="_blank"
  title={url}
  class="bg-[var(--gray-6)] overflow-clip block rounded-[10px]"
>
  {#if viewType !== "details"}
    {#if preview && !dontRenderThumbnail}
      <img
        class="object-cover w-full max-h-60"
        src={preview.images[0].source.url.replaceAll("&amp;", "&")}
        alt="thumbnail"
        on:error={() => (dontRenderThumbnail = true)}
      />
    {/if}

    <div
      class="grid grid-cols-[min-content,1fr,min-content] pr-3 py-3 text-[var(--gray-1)]"
    >
      <div class="border-r px-3 mr-3 border-[var(--gray-4)]">
        <Compass />
      </div>
      <div class="truncate">
        {url}
      </div>
      <ChevronForward />
    </div>
  {:else}
    <div class="grid grid-cols-[min-content,1fr]">
      {#if preview && !dontRenderThumbnail}
        <img
          class="object-cover w-12 h-full mr-3 max-w-none"
          src={preview.images[0].source.url.replaceAll("&amp;", "&")}
          alt="thumbnail"
          on:error={() => (dontRenderThumbnail = true)}
        />
      {:else}
        <div
          class="border-r flex items-center px-3 mr-3 border-[var(--gray-4)] text-[var(--gray-1)]"
        >
          <Compass />
        </div>
      {/if}

      <div
        class="grid grid-cols-[1fr,min-content] py-4 pr-3 text-[var(--gray-1)]"
      >
        <div class="truncate">
          {url}
        </div>
        <ChevronForward />
      </div>
    </div>
  {/if}
</a>
