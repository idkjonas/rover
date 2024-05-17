<script>
  import NavigationView from "$lib/views/NavigationView.svelte";
  import ContentView from "$lib/views/ContentView.svelte";
</script>

<NavigationView>
  <ContentView url={`https://www.reddit.com/hot.json`} />
</NavigationView>
