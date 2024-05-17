<script>
  import NavigationView from "$lib/views/NavigationView.svelte";
  import ContentView from "$lib/views/ContentView.svelte";
  import { page } from "$app/stores";
</script>

<NavigationView>
  <ContentView
    url={`https://www.reddit.com/user/${$page.params.user}.json`}
    viewType="profile"
  />
</NavigationView>
