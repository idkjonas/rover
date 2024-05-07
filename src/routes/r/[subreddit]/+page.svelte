<script>
  import Post from "$lib/Post.svelte";
  import { page } from "$app/stores";
  import Spinner from "$lib/Spinner.svelte";
  import { onMount } from "svelte";

  let redditData;

  async function fetchHomepage(url) {
    try {
      const response = await fetch(url);
      redditData = await response.json();
    } catch (error) {
      console.error("Error fetching Reddit homepage:", error);
    }
  }

  onMount(() => {
    fetchHomepage(`https://www.reddit.com/r/${$page.params.subreddit}.json`);
  });
</script>

{#if redditData}
  <div class="grid grid-cols-1 gap-2">
    {#each redditData.data.children as post}
      <Post {post} isSubredditView />
    {/each}
  </div>
{:else}
  <Spinner />
{/if}
