<script>
  import { Person, Search } from "svelte-ionicons";

  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";

  let query;
</script>

<section class="grid grid-cols-1 gap-4 p-4">
  <search
    class="flex bg-[var(--base)] items-center py-1.5 px-2.5 gap-1.5 rounded-md text-[var(--gray-1)]"
  >
    <Search size="20" />
    <input
      type="text"
      class="outline-none placeholder:text-inherit grow"
      placeholder="Search Posts, Subreddits, Users"
      bind:value={query}
    />
  </search>

  {#if query}
    <ListView>
      <ListItem href="r/{query}" class="flex items-center gap-2">
        <Search size="20" class="text-[var(--gray-1)]" />
        Go to Subreddit "{query}"
      </ListItem>
      <ListItem href="u/{query}" class="flex items-center gap-2">
        <Person size="20" class="text-[var(--gray-1)]" />
        Go to User "{query}"
      </ListItem>
    </ListView>
  {/if}
</section>
