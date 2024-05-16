<script>
  import NavigationView from "$lib/NavigationView.svelte";

  import ContentView from "$lib/ContentView.svelte";
  import { Search } from "lucide-svelte";

  import { page } from "$app/stores";

  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";

  let query = $page.url.searchParams.get("q");
</script>

<NavigationView>
  <div class="p-4">
    <ListView>
      <ListItem class="flex items-center gap-2" href="/search">
        <Search size="20" class="text-[var(--gray-1)]" />
        <p>{query}</p>
      </ListItem>
    </ListView>
  </div>

  <ContentView
    url={`https://www.reddit.com/search.json?q=${query}`}
    viewType="profile"
  />
</NavigationView>
