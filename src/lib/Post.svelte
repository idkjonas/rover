<script>
  import { pan, tap } from "svelte-gestures";
  import MarkdownView from "$lib/MarkdownView.svelte";
  import Flair from "$lib/Flair.svelte";

  import moment from "moment";
  import { goto } from "$app/navigation";
  import { formatNumber } from "$lib/utils";
  import {
    ArrowUpOutline,
    ChatbubbleOutline,
    HappyOutline,
    TimeOutline,
    Megaphone,
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
  import { spring } from "svelte/motion";

  export let post;
  export let viewType = undefined;

  let startPosition = 0;

  const dragX = spring(0);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="overflow-hidden">
  <div
    use:pan={{ delay: 300 }}
    on:pan={(e) =>
      viewType !== "details" && dragX.set(e.detail.x - startPosition)}
    on:pandown={(e) => (startPosition = e.detail.event.layerX)}
    on:panup={() => dragX.set(0)}
    use:tap
    on:tap={() =>
      viewType !== "details"
        ? goto(post.data.permalink, { replaceState: false, noScroll: true })
        : ""}
    target="_blank"
    style="transform: perspective(500px) transform3d({$dragX}px, 0, 0px)"
    id={post.data.id}
    rover-post
    class="grid py-4 border-[var(--gray-5)] bg-white gap-y-4 dark:bg-black"
  >
    <!-- style="transform: translateX(calc({x}px - 50%))" -->
    <div class="col-[normal]">
      <h3
        class:!text-lg={viewType === "details"}
        class:!font-medium={viewType === "details"}
      >
        {post.data.title}

        {#if post.data.link_flair_text}
          <Flair>{post.data.link_flair_text}</Flair>
        {/if}
      </h3>
      {#if viewType === "details"}
        <h4 class="font-medium text-[var(--gray-1)]">
          {post.data.num_comments} Comments
        </h4>
      {/if}
    </div>

    {#if post.data.post_hint === "image"}
      <div class="col-[full] overflow-clip bg-[var(--gray-6)]">
        <img
          loading="lazy"
          src={post.data.url}
          alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
          class:max-h-[20rem]={viewType === "details"}
          class="object-contain bg-contain bg-center bg-no-repeat w-full max-h-[38rem] object-center mx-auto"
        />
      </div>
    {:else if post.data.is_video}
      <div class="col-[full] overflow-clip bg-[var(--gray-6)]">
        <!-- prettier-ignore -->
        <video
          loading="lazy"
          class:max-h-[20rem]={viewType === "details"}
          class="object-contain snap-x w-full max-h-[38rem] object-center mx-auto"
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
              src="https://i.redd.it/{image.media_id}.jpg"
              loading="lazy"
              alt="{post.data.subreddit_name_prefixed} - {post.data.title}"
              class="object-contain max-h-[24rem] object-center"
            />
          </div>
        {/each}
      </div>
    {/if}

    {#if post.data.selftext}
      <p
        class="col-[normal] text-sm"
        class:text-[var(--gray-1)]={viewType !== "details"}
        class:line-clamp-3={viewType !== "details"}
      >
        <MarkdownView source={post.data.selftext} />
      </p>
    {/if}

    <div
      class:flex={viewType !== "details"}
      class="items-center col-[normal] justify-between text-[var(--gray-1)]"
    >
      <div class="text-sm meta">
        <h4 class="flex gap-2 truncate">
          {#if post.data.stickied}
            <Megaphone size="20" class="text-[var(--green)]" />
          {/if}
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
    {#if viewType === "details"}
      <div
        class="flex col-[normal] justify-between h-[50px] -mb-4 px-4 text-[var(--blue)] border-t border-[var(--gray-5)]"
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
        <button
          on:click={() =>
            navigator.share({
              url: `https://reddit.com${post.data.permalink}`,
            })}
        >
          <Icon src={ArrowUpOnSquare} class="size-6" />
        </button>
      </div>
    {/if}
  </div>
</div>

<style>
  [rover-post] {
    grid-template-columns: [full-start] 1rem [normal-start] 1fr [normal-end] 1rem [full-end];
  }
</style>
