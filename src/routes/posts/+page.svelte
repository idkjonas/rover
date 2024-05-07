<script>
  import Post from "$lib/Post.svelte";
  import Spinner from "$lib/Spinner.svelte";

  let redditData = null;

  if (redditData === null) {
    fetchHomepage();
  }

  async function fetchHomepage() {
    try {
      const response = await fetch("https://www.reddit.com/.json");
      redditData = await response.json();
    } catch (error) {
      console.error("Error fetching Reddit homepage:", error);
    }
  }
</script>

{#if redditData}
  <div class="grid grid-cols-1 gap-2">
    {#each redditData.data.children as post}
      <Post {post} />
    {/each}
  </div>
{:else}
  <Spinner />
{/if}
