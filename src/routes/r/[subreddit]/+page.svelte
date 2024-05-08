<script>
  import ContentView from "$lib/ContentView.svelte";
  import { page } from "$app/stores";
</script>

<ContentView
  url={`https://www.reddit.com/r/${$page.params.subreddit}/hot.json`}
  viewType="subreddit"
/>
