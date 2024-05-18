<script>
  import Spinner from "$lib/Spinner.svelte";
  import Post from "$lib/Post.svelte";
  import Comment from "$lib/comment/Comment.svelte";
  import { onMount } from "svelte";
  import { hasScrolledToBottom } from "$lib/stores";

  const POST_LIMIT = 8;

  export let url;
  export let viewType = "normal";

  let redditData;
  let list = [];
  let loadedIds = new Set();

  onMount(async () => {
    if (list.length === 0) {
      await fetchPosts();
    }
  });

  let lastChildId;

  async function fetchPosts() {
    try {
      const response = await fetch(
        `${url}?limit=${POST_LIMIT}&after=t3_${lastChildId == undefined ? "0" : lastChildId}`,
      );
      redditData = await response.json();

      const newItems = redditData.data.children.filter(
        (item) => !loadedIds.has(item.data.id),
      );
      newItems.forEach((item) => loadedIds.add(item.data.id));

      list = [...list, ...newItems];
    } catch (error) {
      console.error("Error fetching:", error);
      alert("Error fetching:", error);
      history.back();
    }
  }

  async function loadMore() {
    await fetchPosts();
  }

  $: if (list.length > 0) {
    lastChildId = list[list.length - 1].data.id;
  }

  $: if ($hasScrolledToBottom === true) loadMore();
</script>

{#if list.length > 0}
  <rover-content-view class="grid grid-cols-1 gap-2 bg-[var(--gray-6)]">
    {#each list as item (item.data.id)}
      {#if item.kind === "t3"}
        <Post post={item} {viewType} />
      {:else if item.kind === "t1"}
        <Comment comment={item} {viewType} />
      {/if}
    {/each}
  </rover-content-view>

  <Spinner />
{:else}
  <Spinner />
{/if}
