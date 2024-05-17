<script>
  import NavigationView from "$lib/views/NavigationView.svelte";
  import ContentView from "$lib/views/ContentView.svelte";
  import MarkdownView from "$lib/views/MarkdownView.svelte";

  import { page } from "$app/stores";
  import { formatNumber } from "$lib/utils";

  let redditData;

  async function fetchAbout() {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${$page.params.subreddit}/about.json`,
      );
      redditData = await response.json();
    } catch (error) {
      console.error("Error fetching:", error);
    }
  }

  fetchAbout();
</script>

<svelte:head>
  <title>Rover - r/{$page.params.subreddit.toLowerCase()}</title>
  {#if redditData}
    <meta name="theme-color" content={redditData.data.primary_color} />
  {/if}
</svelte:head>

<NavigationView>
  <div class="bg-[var(--base)] mb-2 relative">
    <div class="relative h-36 overflow-clip">
      {#if redditData}
        {#if redditData.data.banner_background_image}
          <img
            src={`https://${
              new URL(redditData.data.banner_background_image).hostname
            }${new URL(redditData.data.banner_background_image).pathname}`}
            class="object-cover size-full"
            alt="r/{$page.params.subreddit} banner image"
          />
        {:else}
          <div
            class="w-full"
            style="background-color: {redditData.data.primary_color}"
          ></div>
        {/if}
      {/if}
    </div>
    {#if redditData}
      <img
        src={`https://${
          new URL(redditData.data.community_icon).hostname
        }${new URL(redditData.data.community_icon).pathname}`}
        alt="r/{$page.params.subreddit} icon"
        class="absolute rounded-full size-20 right-4 top-24"
      />
    {/if}

    <div class="p-4">
      <h1 class="mb-2 text-2xl font-semibold">
        {#if redditData}
          {redditData.data.display_name}
        {:else}
          {$page.params.subreddit}
        {/if}
      </h1>
      {#if redditData}
        <MarkdownView source={redditData.data.public_description} />
      {/if}

      {#if redditData}
        <div class="text-[15px] mt-4 text-[var(--gray-1)]">
          <div>
            <h4>{formatNumber(redditData.data.subscribers)} Members</h4>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <ContentView
    url={`https://www.reddit.com/r/${$page.params.subreddit}/hot.json`}
    viewType="subreddit"
  />
</NavigationView>
