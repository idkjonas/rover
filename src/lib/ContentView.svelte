<script>
  import Spinner from "$lib/Spinner.svelte";
  import Post from "$lib/Post.svelte";
  import Comment from "$lib/Comment.svelte";
  import { onMount } from "svelte";
  import { hasScrolledToBottom } from "$lib/stores";

  const POST_LIMIT = 8;

  export let url;
  export let viewType = "normal";

  let redditData;
  let list = [];

  onMount(async () => {
    if (list.length === 0) {
      try {
        const response = await fetch(
          `${url}?limit=${POST_LIMIT}&after=t3_${lastChildId}`,
        );
        redditData = await response.json();

        list = [...redditData.data.children];
      } catch (error) {
        console.error("Error fetching:", error);
      }
    }
  });

  let lastChildId;

  async function loadMore() {
    try {
      const response = await fetch(
        `${url}?limit=${POST_LIMIT}&after=t3_${lastChildId}`,
      );
      redditData = await response.json();
      list = [...list, ...redditData.data.children];
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }

  $: if (list.length > 0) {
    lastChildId = list[list.length - 1].data.id;
  }

  $: console.log(list[0]);

  $: if ($hasScrolledToBottom === true) loadMore();
</script>

{#if list.length > 0}
  <div class="grid grid-cols-1 gap-2">
    {#each list as item}
      {#key item.data.id}
        {#if item.kind === "t3"}
          <Post post={item} {viewType} />
        {:else if item.kind === "t1"}
          <Comment comment={item} {viewType} />
        {/if}
      {/key}
    {/each}
  </div>

  <Spinner />
{:else}
  <Spinner />
{/if}
