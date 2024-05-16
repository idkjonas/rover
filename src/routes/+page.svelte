<script>
  import NavigationView from "$lib/NavigationView.svelte";
  import MarkdownView from "$lib/MarkdownView.svelte";
  import ListView from "$lib/list/ListView.svelte";
  import ListItem from "$lib/list/ListItem.svelte";
  import { ChevronRight } from "lucide-svelte";

  let readme;

  async function fetchReadme() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/jnsdotgg/rover/main/README.md",
      );

      readme = await response.text();
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }

  fetchReadme();
</script>

<NavigationView>
  <section class="grid p-4 grid-cols gap-y-4">
    <h1 class="text-3xl font-medium">Welcome to Rover</h1>
    <ListView>
      <ListItem class="py-3">
        {#if readme}
          <MarkdownView source={readme} />
        {/if}
      </ListItem>
      <ListItem
        class="justify-between py-3"
        href="https://github.com/jnsdotgg/rover"
      >
        View on GitHub
        <ChevronRight class="text-[var(--gray-2)]" />
      </ListItem>
    </ListView>
  </section>
</NavigationView>
