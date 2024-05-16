<script>
  import NavigationView from "$lib/NavigationView.svelte";
  import ContentView from "$lib/ContentView.svelte";
</script>

<NavigationView>
  <ContentView url={`https://www.reddit.com/hot.json`} />
</NavigationView>
