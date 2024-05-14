<script>
  import { ArrowUp, Lock, ChevronUp, Ellipsis } from "lucide-svelte";
  import { formatNumber } from "$lib/utils";
  import Flair from "$lib/Flair.svelte";
  import moment from "moment";

  export let comment;
  export let collapsed = false;
</script>

<rover-comment-meta class="flex items-center">
  {#if comment.data.depth > 0}
    <div class="absolute left-0 w-3 h-full"></div>
  {/if}
  <a
    href="/u/{comment.data.author}"
    target="_blank"
    class:!text-[var(--green)]={comment.data.distinguished === "moderator"}
    class:text-[var(--blue)]={comment.data.is_submitter}
    class="mr-2 font-semibold fine:hover:underline"
  >
    {comment.data.author}
  </a>
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
          <Lock size="18" class="text-[var(--green)]" />
        {/if}
      </div>
      {#if comment.data.author_flair_text}
        <div class="overflow-hidden shrink grow-0">
          <Flair>{comment.data.author_flair_text}</Flair>
        </div>
      {/if}
      <div class="flex items-center self-end justify-end grow">
        {#if !collapsed}
          <div class="flex items-center gap-2">
            <button on:click|stopPropagation={() => console.log(comment)}>
              <Ellipsis size="18" />
            </button>
            {moment.unix(comment.data.created).fromNow()}
          </div>
        {:else}
          <ChevronUp size="22" />
        {/if}
      </div>
    </div>
  </div>
</rover-comment-meta>
