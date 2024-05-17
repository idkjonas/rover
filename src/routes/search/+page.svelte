<script>
  import { Search, Tag, CircleUserRound } from "lucide-svelte";

  import NavigationView from "$lib/views/NavigationView.svelte";

  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";

  let query;
</script>

<NavigationView>
  <section class="grid h-fit grid-cols-1 gap-4 p-4 bg-[var(--background)]">
    <ListView>
      <ListItem class="flex items-center gap-2">
        <Search size="20" class="text-[var(--gray-1)]" />
        <input
          type="text"
          class="outline-none h-[44px] text-[var(--text)] bg-transparent placeholder:text-[var(--gray-1)] grow"
          placeholder="Search Posts, Subreddits, Users"
          bind:value={query}
        />
      </ListItem>
    </ListView>

    {#if query}
      <ListView>
        <ListItem
          href="search/results?q={encodeURI(query.replace(' ', '+'))}"
          class="flex items-center gap-2"
        >
          <Search size="20" class="text-[var(--gray-1)]" />
          Posts with "{query}"
        </ListItem>
      </ListView>
      {#if !query.includes(" ")}
        <ListView>
          <ListItem href="r/{query}" class="flex items-center gap-2">
            <Tag size="20" class="text-[var(--gray-1)]" />
            Go to Subreddit "{query}"
          </ListItem>
          <ListItem href="u/{query}" class="flex items-center gap-2">
            <CircleUserRound size="20" class="text-[var(--gray-1)]" />
            Go to User "{query}"
          </ListItem>
        </ListView>
      {/if}
    {/if}
  </section>
</NavigationView>
