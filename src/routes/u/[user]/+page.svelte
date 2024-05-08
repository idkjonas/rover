<script>
  import ContentView from "$lib/ContentView.svelte";
  import { page } from "$app/stores";
</script>

<ContentView
  url={`https://www.reddit.com/user/${$page.params.user}.json`}
  viewType="profile"
/>
