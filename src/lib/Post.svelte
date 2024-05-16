<script>
  import MarkdownView from "$lib/MarkdownView.svelte";
  import Flair from "$lib/Flair.svelte";
  import UrlPreview from "$lib/UrlPreview.svelte";
  import GestureView from "$lib/GestureView.svelte";
  import { pushState } from "$app/navigation";

  import moment from "moment";
  import { formatNumber } from "$lib/utils";

  import {
    ArrowUp,
    ArrowDown,
    MessageCircle,
    Smile,
    Clock,
    Megaphone,
    Ellipsis,
    Bookmark,
    Share,
  } from "lucide-svelte";

  export let post;
  export let viewType = undefined;
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
          pushState(post.data.permalink, {
            showSubView: true,
            subViewType: "details",
            item: post,
          })}
        style=" grid-template-columns: [full-start] 1rem [normal-start] 1fr [normal-end] 1rem [full-end];"
        class="grid py-4 border-[var(--gray-5)] bg-[var(--base)] gap-y-4"
      >
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
            <h4 class="text-[var(--gray-1)]">
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
              style="aspect-ratio: {post.data.preview.images[0].source
                .width}/{post.data.preview.images[0].source.height}"
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
                style="aspect-ratio: {post.data.preview.images[0].source
                  .width}/{post.data.preview.images[0].source.height}"
              >
                <track kind="captions" />
              </video>
          </div>
        {:else if post.data.is_gallery}
          <div
            class="flex gap-4 col-[full] px-4 overflow-x-scroll snap-x bg-[var(--base)] snap-mandatory"
          >
            {#each post.data.gallery_data.items as image}
              <div
                class="overflow-clip snap-center grid place-items-center shrink-0 rounded-xl w-[calc(100%-1rem)] bg-[var(--gray-6)]"
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
        {:else if new URL(post.data.url).pathname !== post.data.permalink}
          <div class="col-[normal]">
            <UrlPreview
              url={post.data.url}
              thumbnail={post.data.thumbnail}
              preview={post.data.preview}
            />
          </div>
        {/if}

        {#if post.data.selftext}
          <p
            class="col-[normal] text-[15px]"
            class:text-[var(--gray-1)]={viewType !== "details"}
            class:line-clamp-3={viewType !== "details"}
            class:max-h-[3lh]={viewType !== "details"}
          >
            <MarkdownView source={post.data.selftext} />
          </p>
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
                    <a
                      href={`/u/${post.data.author}`}
                      target="_blank"
                      class="font-medium fine:hover:underline"
                    >
                      {post.data.author}
                    </a>
                  </span>
                {:else}
                  <a
                    href={`/r/${post.data.subreddit}`}
                    target="_blank"
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
                    target="_blank"
                    class="font-medium fine:hover:underline"
                  >
                    {post.data.subreddit}
                  </a>
                  by
                  <a
                    href={`/u/${post.data.author}`}
                    target="_blank"
                    class="font-medium fine:hover:underline"
                  >
                    {post.data.author}
                  </a>
                </span>
              {/if}
            </h4>
            <div class="flex gap-3 *:flex *:items-center *:gap-1">
              <div>
                <ArrowUp size="18" />
                {formatNumber(post.data.score)}
              </div>
              {#if viewType !== "details"}
                <div>
                  <MessageCircle size="18" />
                  {formatNumber(post.data.num_comments)}
                </div>
              {:else}
                <div>
                  <Smile size="18" />
                  {post.data.upvote_ratio * 100}%
                </div>
              {/if}
              <div>
                <Clock size="18" />
                {moment.unix(post.data.created).fromNow()}
              </div>
            </div>
          </div>

          {#if viewType !== "details"}
            <div
              class="actions *:size-9 flex gap-1 fine:hover:*:bg-[var(--gray-6)] *:rounded-md *:flex *:items-center *:justify-center"
            >
              <button>
                <Ellipsis size="25" />
              </button>

              <button>
                <ArrowUp size="25" />
              </button>

              <button>
                <ArrowDown size="25" />
              </button>
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
              <Bookmark size="25" />
            </button>
            <button>
              <MessageCircle size="25" />
            </button>
            <button
              on:click={() =>
                navigator.share({
                  url: `https://reddit.com${post.data.permalink}`,
                })}
            >
              <Share size="25" />
            </button>
          </div>
        {/if}
      </svelte:element>
    </GestureView>
  </rover-post>
{/if}
