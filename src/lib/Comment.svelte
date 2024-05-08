<script>
  import MarkdownView from "$lib/MarkdownView.svelte";
  import { ArrowUpOutline, LockClosed } from "svelte-ionicons";
  import moment from "moment";
  import { slide } from "svelte/transition";
  import { formatNumber } from "$lib/utils";
  import { goto } from "$app/navigation";
  import Flair from "./Flair.svelte";

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
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if comment.data.body}
  <div
    class:pl-2={comment.data.depth > 0}
    class="grid grid-cols-1 text-sm bg-white dark:bg-black"
    on:click={handleClick}
  >
    <div
      class:!border-none={viewType === "profile"}
      class="border-[var(--gray-5)] transition-[padding"
      class:pb-2={isCollapsed}
      class:border-t={viewType !== "profile"}
    >
      <div class="flex items-center pt-3 pb-1 pl-4 pr-4" on:click={collapse}>
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

        <div
          class="flex items-center justify-between overflow-hidden text-[var(--gray-1)] grow"
        >
          <div class="flex items-center w-full gap-2">
            <div class="flex items-center gap-2">
              <div class="flex items-center">
                <ArrowUpOutline size="14" />
                {#if !comment.data.score_hidden}
                  {formatNumber(comment.data.score)}
                {:else}
                  -
                {/if}
              </div>
              {#if comment.data.locked}
                <LockClosed size="14" class="text-[var(--green)]" />
              {/if}
            </div>

            {#if comment.data.author_flair_text}
              <Flair>{comment.data.author_flair_text}</Flair>
            {/if}
            <div class="flex items-center self-end justify-end grow">
              {moment.unix(comment.data.created).fromNow()}
            </div>
          </div>
        </div>
      </div>
      {#if !isCollapsed}
        <div transition:slide>
          <div class="border-[var(--gray-5)]" on:click={collapse}>
            <p class="pb-3 pl-4 pr-4 break-words pl-">
              <MarkdownView source={comment.data.body} />
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
