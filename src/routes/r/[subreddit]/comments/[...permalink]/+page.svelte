<script>
  import { page } from "$app/stores";
  // import { openedPost } from "$lib/stores";

  import Post from "$lib/Post.svelte";
  import Comment from "$lib/Comment.svelte";

  import Spinner from "$lib/Spinner.svelte";

  let redditData;

  async function fetchDetails() {
    try {
      const response = await fetch(
        `https://www.reddit.com/${$page.url.pathname}/.json`,
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

<!-- 
{#if $openedPost}
  <Post post={$openedPost} viewType="details" />
{:else if !redditData}
  <Spinner />
{:else}
  <Post {post} viewType="details" />
{/if} -->

{#if !redditData}
  <Spinner />
{:else}
  <Post {post} viewType="details" />
  {#each comments as comment}
    <Comment {comment} />
  {/each}
{/if}
