<script>
  import { page } from "$app/stores";

  import Post from "$lib/Post.svelte";
  import Comment from "$lib/comment/Comment.svelte";

  import Spinner from "$lib/Spinner.svelte";

  let redditData;

  console.log($page);

  async function fetchDetails() {
    try {
      const response = await fetch(
        `https://www.reddit.com/${$page.state.item.data.permalink}/.json`,
      );
      redditData = await response.json();
    } catch (error) {
      console.error("Error fetching Reddit homepage:", error);
    }
  }

  fetchDetails();

  let post, comments;

  $: if (redditData) {
    post = redditData[0].data.children[0];
    comments = redditData[1].data.children;
  }
</script>

<Post post={$page.state.item} viewType="details" />

{#if !redditData}
  <Spinner />
{:else}
  {#each comments as comment}
    <Comment {comment} />
  {/each}
{/if}
