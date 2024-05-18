<script>
  import Video from "$lib/Video.svelte";

  export let post;
</script>

{#if post.data.post_hint === "image"}
  <img
    loading="lazy"
    src={post.data.url}
    alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
    class={$$restProps.class || ""}
    draggable="false"
    style="aspect-ratio:
    {post.data.preview.images[0].source.width}/
    {post.data.preview.images[0].source.height}"
  />
{/if}

{#if post.data.is_video}
  <Video {post} class={$$restProps.class || ""} />
{/if}

{#if post.data.is_gallery}
  {#each post.data.gallery_data.items as item}
    <img
      src={post.data.media_metadata[item.media_id].s.u.replaceAll("&amp;", "&")}
      loading="lazy"
      draggable="false"
      alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
      class={$$restProps.class || ""}
    />
  {/each}
{/if}
