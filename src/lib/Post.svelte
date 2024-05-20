<script>
  import { selectedMedia } from "$lib/stores";

  import MarkdownView from "$lib/views/MarkdownView.svelte";
  import Flair from "$lib/Flair.svelte";
  import Author from "$lib/Author.svelte";
  import { settings } from "$lib/settings";

  import { page } from "$app/stores";
  import UrlPreview from "$lib/UrlPreview.svelte";
  import GestureView from "$lib/views/GestureView.svelte";
  import Media from "$lib/Media.svelte";

  import { pushState } from "$app/navigation";

  import moment from "moment";
  import { formatNumber } from "$lib/utils";

  import {
    ArrowUp,
    ArrowDown,
    ChatbubbleOutline,
    TimeOutline,
    HappyOutline,
    Megaphone,
    EllipsisHorizontal,
    BookmarkOutline,
    ArrowUndoOutline,
    ShareOutline,
  } from "svelte-ionicons";

  export let post;
  export let viewType = undefined;

  console.log(post);
</script>

{#if post}
  <rover-post>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <GestureView enableGestures={viewType !== "details"}>
      <!-- href={post.data.permalink} -->
      <svelte:element
        this={viewType !== "details" ? "a" : "div"}
        id={post.data.id}
        on:click={() =>
          viewType !== "details" &&
          pushState("", {
            showSubView: true,
            subViewType: "details",
            item: post,
          })}
        class:!bg-[var(--gray-7)]={$page.state.item === post &&
          viewType !== "details"}
        style="grid-template-columns: [full-start] 1rem [normal-start] 1fr [normal-end] 1rem [full-end];"
        class="grid transition-colors overflow-clip py-4 border-[var(--gray-5)] bg-[var(--base)] gap-y-4"
      >
        {#if $settings.appearance.showSubredditAtTop && viewType !== "subreddit" && viewType !== "details"}
          <div class="col-[normal] -mb-3">
            <a
              href={`/r/${post.data.subreddit_}`}
              class="text-[15px] text-[var(--gray-1)] font-medium fine:hover:underline"
            >
              {post.data.subreddit}
            </a>
          </div>
        {/if}
        <div class="col-[normal]">
          <h3
            class:!text-lg={viewType === "details"}
            class:!font-medium={viewType === "details"}
          >
            {@html post.data.title}

            {#if post.data.link_flair_text}
              <Flair text={post.data.link_flair_text} />
            {/if}
            {#if post.data.over_18}
              <Flair nsfw />
            {/if}
          </h3>
          {#if viewType === "details"}
            <h4 class="text-[var(--gray-1)]">
              {post.data.num_comments} Comments
            </h4>
          {/if}
        </div>

        {#if post.data.post_hint === "image"}
          <button
            on:click|stopPropagation={() => selectedMedia.set(post)}
            class="col-[full] md:col-[normal] md:rounded-xl bg-[var(--gray-6)]"
          >
            <Media
              {post}
              {viewType}
              class="w-full max-h-96 col-[full] md:col-[normal] md:rounded-xl object-contain
            {viewType === 'details' ? 'max-h-[20rem]' : 'max-h-[38rem]'}"
            />
          </button>
        {:else if post.data.is_video}
          <button
            on:click|stopPropagation={() => selectedMedia.set(post)}
            class="col-[full] {viewType === 'details'
              ? 'max-h-[20rem]'
              : 'max-h-[38rem]'}"
          >
            <Media {post} class="relative w-full h-full " />
          </button>
        {:else if post.data.is_gallery}
          <button
            on:click|stopPropagation={() => selectedMedia.set(post)}
            class="col-[full] md:col-[normal] md:rounded-xl overflow-clip gap-1 bg-[var(--gray-6)] grid grid-cols-[50%,50%] max-h-[24rem]"
          >
            <Media
              {post}
              {viewType}
              class="object-cover size-full overflow-clip [&:nth-of-type(1)]:row-span-2 [&:not(:nth-of-type(1),:nth-of-type(2),:nth-of-type(3))]:hidden"
            />
          </button>
        {:else if !post.data.is_self}
          <div class="col-[normal]">
            <UrlPreview
              url={post.data.url}
              preview={post.data.preview}
              {viewType}
            />
          </div>
        {/if}

        {#if post.data.selftext}
          {#if viewType === "details"}
            <p class="col-[full] p-4 text-[15px] overflow-hidden">
              <MarkdownView source={post.data.selftext} />
            </p>
          {:else}
            <p
              class="col-[normal] text-[15px] text-[var(--gray-1)] line-clamp-3"
            >
              {@html post.data.selftext}
            </p>
          {/if}
        {/if}

        <div
          class:flex={viewType !== "details"}
          class="items-center col-[normal] justify-between text-[var(--gray-1)]"
        >
          <div class="text-[15px] meta">
            <h4 class="flex gap-2 truncate">
              {#if post.data.stickied}
                <Megaphone size="20" class="text-[var(--green)]" />
              {/if}
              {#if viewType !== "details"}
                {#if viewType === "subreddit"}
                  <span>
                    by
                    <Author author={post.data.author} />
                  </span>
                {:else if !$settings.appearance.showSubredditAtTop}
                  <a
                    href={`/r/${post.data.subreddit}`}
                    class="font-medium fine:hover:underline"
                  >
                    {post.data.subreddit}
                  </a>
                {/if}
              {:else}
                <span>
                  in
                  <a
                    href={`/r/${post.data.subreddit}`}
                    class="font-medium fine:hover:underline"
                  >
                    {post.data.subreddit}
                  </a>
                  by
                  <Author author={post.data.author} />
                </span>
              {/if}
            </h4>
            <div class="flex text-[15px] gap-3 *:flex *:items-center *:gap-1">
              <div>
                <ArrowUp size="18" />
                {formatNumber(post.data.score)}
              </div>
              {#if viewType !== "details"}
                <div>
                  <ChatbubbleOutline size="16" />
                  {formatNumber(post.data.num_comments)}
                </div>
              {:else}
                <div>
                  <HappyOutline size="16" />
                  {post.data.upvote_ratio * 100}%
                </div>
              {/if}
              <div>
                <TimeOutline size="16" />
                {moment.unix(post.data.created).fromNow()}
              </div>
            </div>
          </div>

          {#if viewType !== "details"}
            <div
              class="actions *:size-9 flex gap-1 fine:hover:*:bg-[var(--gray-6)] *:rounded-md *:flex *:items-center *:justify-center"
            >
              {#if $settings.appearance.showVotingButtons}
                <button>
                  <EllipsisHorizontal size="25" />
                </button>

                <button>
                  <ArrowUp size="25" />
                </button>

                <button>
                  <ArrowDown size="25" />
                </button>
              {/if}
            </div>
          {/if}
        </div>
        {#if viewType === "details"}
          <div
            class="flex col-[normal] justify-between h-[50px] -mb-4 px-4 text-[var(--blue)] border-t border-[var(--gray-5)]"
          >
            <button>
              <ArrowUp size="25" />
            </button>
            <button>
              <ArrowDown size="25" />
            </button>
            <button>
              <BookmarkOutline size="25" />
            </button>
            <button>
              <ArrowUndoOutline size="25" />
            </button>
            <button
              on:click={() =>
                navigator.share({
                  url: `https://reddit.com${post.data.permalink}`,
                })}
            >
              <ShareOutline size="25" />
            </button>
          </div>
        {/if}
      </svelte:element>
    </GestureView>
  </rover-post>
{/if}
