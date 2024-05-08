<script>
  import SvelteMarkdown from "svelte-markdown";
  import { ArrowUpOutline } from "svelte-ionicons";
  import moment from "moment";
  import { slide } from "svelte/transition";
  import { formatNumber } from "$lib/utils";
  import { goto } from "$app/navigation";

  export let comment;
  export let viewType = undefined;

  let isCollapsed = false;

  function handleClick() {
    if (viewType === "profile") {
      goto(comment.data.permalink);
    }
  }

  function collapse() {
    if (viewType !== "profile") {
      isCollapsed = !isCollapsed;
    }
  }

  console.log(comment.data.permalink);
  console.log(viewType);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if comment.data.body}
  <div class="pl-2 bg-white dark:bg-black" on:click={handleClick}>
    <div
      class:border-b={isCollapsed}
      class:!border-none={viewType === "profile"}
      class="border-zinc-200 transition-[padding] dark:border-zinc-800"
      class:pb-2={isCollapsed}
    >
      <div class="flex items-center pt-3 pb-1 pl-2 pr-3" on:click={collapse}>
        {#if comment.data.depth > 0}
          <div class="absolute left-0 w-3 h-full"></div>
        {/if}
        <h4
          class:!text-green-500={comment.data.distinguished === "moderator"}
          class:text-blue-500={comment.data.is_submitter}
          class="mr-2 font-semibold"
          s
        >
          {comment.data.author}
        </h4>

        <div class="flex justify-between text-zinc-500 grow">
          <div class="flex items-center">
            <ArrowUpOutline size="18" />
            {formatNumber(comment.data.score)}
          </div>
          <div class="flex items-center">
            {moment.unix(comment.data.created).fromNow()}
          </div>
        </div>
      </div>
      {#if !isCollapsed}
        <div transition:slide>
          <div
            class="border-zinc-200 dark:border-zinc-800"
            class:border-b={viewType !== "profile"}
            on:click={collapse}
          >
            <p class="pb-3 pl-2 pr-4 break-words pl-">
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
