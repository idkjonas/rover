<script>
  import SvelteMarkdown from "svelte-markdown";

  import moment from "moment";
  import { goto } from "$app/navigation";
  // import { openedPost } from "$lib/stores";
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
  export let viewType = undefined;

  function handleClick() {
    // openedPost.set(post);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<a
  href={post.data.permalink}
  target="_blank"
  id={post.data.id}
  rover-post
  class="grid py-4 bg-white gap-y-4 dark:bg-black"
  on:click={handleClick}
>
  <div class="col-[normal]">
    <h3 class="text-lg font-[450]" class:!text-xl={viewType === "details"}>
      {post.data.title}

      {#if post.data.link_flair_text}
        <span
          class="bg-zinc-100 text-base font-normal dark:bg-zinc-900 px-2 py-0.5 rounded-md text-zinc-500"
          >{post.data.link_flair_text}</span
        >{" "}
      {/if}
    </h3>
    {#if viewType === "details"}
      <h4 class="font-[450] text-zinc-500">
        {post.data.num_comments} Comments
      </h4>
    {/if}
  </div>

  {#if post.data.post_hint === "image"}
    <div
      class="col-[normal] overflow-clip rounded-xl bg-zinc-100 dark:bg-zinc-900"
    >
      <img
        loading="lazy"
        src={post.data.url}
        alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
        class="object-contain bg-contain bg-center bg-no-repeat rounded-xl col-[normal] w-full max-h-[24rem] object-center mx-auto"
      />
    </div>
  {:else if post.data.is_video}
    <div
      class="col-[normal] rounded-xl overflow-clip bg-zinc-100 dark:bg-zinc-900"
    >
      <!-- prettier-ignore -->

      <video
          class="object-contain col-[normal] snap-x w-full max-h-[24rem] object-center mx-auto"
          controls
          playsinline
          src="https://sd.redditsave.com/download.php?permalink=https://reddit.com/&video_url={post.data.media.reddit_video.dash_url}?source=fallback&audio_url={post.data.media.reddit_video.dash_url}?source=fallback"
>
          <track kind="captions" />
        </video>
    </div>
  {:else if post.data.is_gallery}
    <div
      class="flex gap-4 col-[full] px-4 overflow-x-scroll snap-x bg-white snap-mandatory dark:bg-black"
    >
      {#each post.data.gallery_data.items as image}
        <div
          class="overflow-clip snap-center grid place-items-center shrink-0 rounded-xl w-[calc(100%-1rem)] bg-zinc-100 dark:bg-zinc-900"
        >
          <img
            src="https://i.redd.it/{image.media_id}.jpeg"
            loading="lazy"
            alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
            class="object-contain max-h-[24rem] object-center"
          />
        </div>
      {/each}
    </div>
  {/if}

  {#if post.data.selftext}
    <p class="col-[normal]" class:line-clamp-3={viewType !== "details"}>
      <SvelteMarkdown source={post.data.selftext} />
    </p>
  {/if}

  <div
    class:flex={viewType !== "details"}
    class="items-center col-[normal] justify-between text-zinc-500"
  >
    <div class="meta">
      <h4 class="truncate">
        {#if viewType !== "details"}
          {#if viewType === "subreddit"}
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
        {#if viewType !== "details"}
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

    {#if viewType !== "details"}
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
</a>

{#if viewType === "details"}
  <div
    class="sticky flex justify-between h-[50px] px-8 text-blue-500 bg-white -bottom-px -top-px dark:bg-black border-y border-zinc-200 dark:border-zinc-800"
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

<style>
  [rover-post] {
    grid-template-columns: [full-start] 1rem [normal-start] 1fr [normal-end] 1rem [full-end];
  }
</style>
