<script>
  import { CircleUserRound, Search } from "lucide-svelte";

  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";

  let query;
</script>

<section class="grid grid-cols-1 gap-4 p-4">
  <search
    class="flex bg-[var(--base)] text-[var(--gray-1)] items-center pl-4 gap-2 rounded-md"
  >
    <Search size="20" />
    <input
      type="text"
      class="outline-none h-[44px] text-[var(--text)] bg-transparent placeholder:text-[var(--gray-1)] grow"
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
        <CircleUserRound size="20" class="text-[var(--gray-1)]" />
        Go to User "{query}"
      </ListItem>
    </ListView>
  {/if}
</section>
