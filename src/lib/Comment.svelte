<script>
  import SvelteMarkdown from "svelte-markdown";
  import { ArrowUpOutline } from "svelte-ionicons";
  import moment from "moment";
  import { slide } from "svelte/transition";

  export let comment;

  console.log(comment);

  let isCollapsed = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

{#if comment.data.body}
  <div
    class="pl-2 bg-white dark:bg-black"
    on:click={() => console.log(comment)}
  >
    <div
      class:border-b={isCollapsed}
      class="border-zinc-200 dark:border-zinc-800"
    >
      <div
        class="flex items-center pl-1 pr-3 pt-3 pb-3"
        on:click={() => (isCollapsed = !isCollapsed)}
      >
        <h4 class="font-semibold mr-2">{comment.data.author}</h4>
        <div class="text-zinc-500 flex grow justify-between">
          <div class="flex items-center">
            <ArrowUpOutline size="18" />
            {comment.data.score}
          </div>
          <div class="flex items-center">
            {moment.unix(comment.data.created).fromNow()}
          </div>
        </div>
      </div>
      {#if !isCollapsed}
        <div transition:slide>
          <div
            class="border-b border-zinc-200 dark:border-zinc-800"
            on:click={() => (isCollapsed = !isCollapsed)}
          >
            <p class="break-words pl-1 pb-3 pr-3">
              <SvelteMarkdown source={comment.data.body} />
            </p>
          </div>
          {#if comment.data.replies}
            {#each comment.data.replies.data.children as reply}
              <svelte:self comment={reply}></svelte:self>
            {/each}
          {/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
