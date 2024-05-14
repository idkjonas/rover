<script>
  import MarkdownView from "$lib/MarkdownView.svelte";

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

<section class="p-4">
  <h1 class="text-3xl font-medium">Welcome to Rover</h1>
  {#if readme}
    <MarkdownView source={readme} />
  {/if}
</section>
