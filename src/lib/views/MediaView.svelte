<script>
  import { Drawer } from "vaul-svelte";
  import Media from "$lib/Media.svelte";
  export let post;

  let open;
  $: open = post;
</script>

<Drawer.Root {open}>
  <Drawer.Portal>
    <Drawer.Content
      class="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center h-full overflow-clip"
    >
      <div>
        <div>
          {#if !post.data.is_gallery}
            <Media
              {post}
              class="object-contain max-w-2xl w-full max-h-[calc(100dvh-4rem)] md:w-fit shrink-0 snap-center"
            />
          {:else}
            <div
              class="flex gap-4 mx-auto overflow-x-scroll max-w-7xl md:gap-4 md:px-0 snap-x snap-mandatory"
            >
              <Media
                {post}
                class="object-contain w-full max-h-screen md:w-fit shrink-0 snap-center"
              />
            </div>
          {/if}
        </div>
      </div>
    </Drawer.Content>
    <Drawer.Overlay
      class="fixed inset-0 z-40 bg-black md:bg-black/75 md:backdrop-blur-sm"
    />
  </Drawer.Portal>
</Drawer.Root>
