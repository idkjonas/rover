<script>
  import Post from "$lib/Post.svelte";
  import { page } from "$app/stores";
  import Spinner from "$lib/Spinner.svelte";
  import Comment from "$lib/Comment.svelte";

  let redditData = null;

  if (redditData === null) {
    fetchHomepage();
  }

  async function fetchHomepage() {
    try {
      const response = await fetch(
        `https://www.reddit.com/user/${$page.params.user}.json`
      );
      redditData = await response.json();
    } catch (error) {
      console.error("Error fetching Reddit homepage:", error);
    }
  }
</script>

{#if redditData}
  <div class="grid grid-cols-1">
    {#each redditData.data.children as child}
      {#if child.kind === "t3"}
        <Post post={child} isProfileView />
      {:else if child.kind === "t1"}
        <Comment comment={child} />
      {/if}
    {/each}
  </div>
{:else}
  <Spinner />
{/if}
