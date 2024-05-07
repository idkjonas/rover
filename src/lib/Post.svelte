<script>
  import moment from "moment";
  import { goto } from "$app/navigation";
  import { openedPost } from "$lib/stores";
  import { formatNumber } from "$lib/utils";
  import {
    ArrowUpOutline,
    ChatbubbleOutline,
    HappyOutline,
    TimeOutline,
  } from "svelte-ionicons";
  import {
    Icon,
    ArrowUp,
    ArrowDown,
    EllipsisHorizontal,
    Bookmark,
    ChatBubbleOvalLeft,
    ArrowUpOnSquare,
  } from "svelte-hero-icons";

  export let post;
  export let isCommentsView = false;
  export let isSubredditView = false;
  export let isProfileView = false;

  function handleClick() {
    openedPost.set(post);
    goto(`/details${post.data.permalink}`);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={handleClick}>
  <div class="pb-4 bg-white dark:bg-black" id={post.data.id}>
    <div class:flex-col-reverse={isCommentsView} class="flex flex-col mb-4">
      <h3 class="px-4 mt-4">
        {post.data.title}
        {#each post.data.link_flair_richtext as flair}
          <span
            class="bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 rounded-md text-zinc-500"
            >{flair.t}</span
          >{" "}
        {/each}
      </h3>
      {#if post.data.post_hint === "image" || post.data.is_video}
        <div class:mt-4={!isCommentsView} class="bg-zinc-100 dark:bg-zinc-900">
          {#if post.data.post_hint === "image"}
            <img
              src={post.data.url}
              alt=""
              class="object-contain max-h-[24rem] object-center mx-auto"
            />
          {:else if post.data.is_video}
            <!-- prettier-ignore -->
            <video class="object-contain max-h-[24rem] object-center mx-auto" controls playsinline src="https://sd.redditsave.com/download.php?permalink=https://reddit.com/&video_url={post.data.media.reddit_video.dash_url}?source=fallback&audio_url={post.data.media.reddit_video.dash_url}?source=fallback">
            <track kind="captions" />
          </video>
          {/if}
        </div>
      {/if}
    </div>

    {#if isCommentsView && post.data.selftext}
      <p class="px-4 pb-4">{post.data.selftext}</p>
    {/if}

    <div
      class:flex={!isCommentsView}
      class="items-center justify-between px-4 text-zinc-500"
    >
      <div class="meta">
        <h4 class="truncate">
          {#if !isCommentsView}
            {#if isSubredditView}
              <span>
                by
                <a href={`/u/${post.data.author}`} class="font-medium">
                  {post.data.author}
                </a>
              </span>
            {:else}
              <a href={`/r/${post.data.subreddit}`} class="font-medium">
                {post.data.subreddit}
              </a>
            {/if}
          {:else}
            <span>
              in
              <a href={`/r/${post.data.subreddit}`} class="font-medium">
                {post.data.subreddit}
              </a>
              by
              <a href={`/u/${post.data.author}`} class="font-medium">
                {post.data.author}
              </a>
            </span>
          {/if}
        </h4>
        <div class="flex gap-3 *:flex *:items-center *:gap-1">
          <div>
            <ArrowUpOutline size="18" />
            {formatNumber(post.data.score)}
          </div>
          {#if !isCommentsView}
            <div>
              <ChatbubbleOutline size="18" />
              {formatNumber(post.data.num_comments)}
            </div>
          {:else}
            <div>
              <HappyOutline size="18" />
              {post.data.upvote_ratio * 100}%
            </div>
          {/if}
          <div>
            <TimeOutline size="18" />
            {moment.unix(post.data.created).fromNow()}
          </div>
        </div>
      </div>

      {#if !isCommentsView}
        <div
          class="actions *:size-9 flex gap-1 *:rounded-md *:flex *:items-center *:justify-center"
        >
          <button>
            <Icon src={EllipsisHorizontal} class="size-8" />
          </button>

          <button>
            <Icon src={ArrowUp} class="size-6" />
          </button>
          <button>
            <Icon src={ArrowDown} class="size-6" />
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
{#if isCommentsView}
  <div
    class="sticky flex justify-between px-6 py-3 text-blue-500 bg-white -bottom-px -top-px dark:bg-black border-y border-zinc-200 dark:border-zinc-800"
  >
    <button>
      <Icon src={ArrowUp} class="size-6" />
    </button>
    <button>
      <Icon src={ArrowDown} class="size-6" />
    </button>
    <button>
      <Icon src={Bookmark} class="size-6" />
    </button>
    <button>
      <Icon src={ChatBubbleOvalLeft} class="size-6" />
    </button>
    <button>
      <Icon src={ArrowUpOnSquare} class="size-6" />
    </button>
  </div>
{/if}
