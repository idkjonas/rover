<script>
  import {
    ArrowUp,
    LockClosed,
    EllipsisHorizontal,
    ChevronDown,
  } from "svelte-ionicons";
  import { formatNumber } from "$lib/utils";
  import Flair from "$lib/Flair.svelte";
  import Author from "$lib/Author.svelte";
  import moment from "moment";

  export let comment;
  export let collapsed = false;
</script>

<rover-comment-meta class="flex items-center gap-2">
  {#if comment.data.depth > 0}
    <div class="absolute left-0 w-3 h-full"></div>
  {/if}
  <Author
    author={comment.data.author}
    op={comment.data.is_submitter}
    mod={comment.data.distinguished === "moderator"}
  />
  <div
    class="flex items-center justify-between overflow-hidden text-[var(--gray-1)] grow"
  >
    <div class="flex items-center w-full gap-2">
      <div class="flex items-center gap-2">
        <div class="flex items-center">
          <ArrowUp size="18" />
          {#if !comment.data.score_hidden}
            {formatNumber(comment.data.score)}
          {:else}
            -
          {/if}
        </div>
        {#if comment.data.locked}
          <LockClosed size="18" class="text-[var(--green)]" />
        {/if}
      </div>
      {#if comment.data.author_flair_text}
        <div class="overflow-hidden shrink grow-0">
          <Flair text={comment.data.author_flair_text} />
        </div>
      {/if}
      <div class="flex items-center self-end justify-end grow">
        {#if !collapsed}
          <div class="flex items-center gap-2">
            <button on:click|stopPropagation={() => console.log(comment)}>
              <EllipsisHorizontal size="18" />
            </button>
            {moment.unix(comment.data.created).fromNow()}
          </div>
        {:else}
          <ChevronDown size="22" class="text-[var(--gray-4)]" />
        {/if}
      </div>
    </div>
  </div>
</rover-comment-meta>
