<script>
  import MarkdownView from "$lib/views/MarkdownView.svelte";
  import GestureView from "$lib/views/GestureView.svelte";
  import { slide } from "svelte/transition";
  import CommentMeta from "$lib/comment/CommentMeta.svelte";
  import { settings } from "$lib/settings";
  import "$lib/comment/themes.css";

  export let comment;
  export let viewType = "normal";

  let isCollapsed;

  if (
    comment.data.author === "AutoModerator" &&
    $settings.general.collapseAutomoderator
  ) {
    isCollapsed = true;
  } else {
    isCollapsed = false;
  }
</script>

{#if comment.kind !== "more"}
  <rover-comment class="grid grid-cols-1 relative text-[15px]">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <GestureView>
      <svelte:element
        this={viewType === "profile" ? "a" : "div"}
        href={comment.data.permalink}
        style="padding-inline-start: {comment.data.depth * 0.75}rem"
        class="fine:hover:bg-[var(--gray-7)] bg-[var(--base)] w-full block relative text-start"
        on:mousedown={() =>
          viewType !== "profile" ? (isCollapsed = !isCollapsed) : ""}
      >
        <div
          class="overflow-hidden border-[var(--gray-5)]"
          class:border-t={viewType !== "profile"}
        >
          {#if comment.data.depth > 0}
            <rover-comment-depth-indicator
              class="w-0.5 rounded-full h-[calc(100%-1rem)] top-2 absolute"
              style="
                background-color: var(--rainbow-depth-{comment.data.depth})
              "
            />
          {/if}
          <rover-comment-inner class="grid grid-cols-1 px-4 py-3 gap-y-0.5">
            <CommentMeta {comment} collapsed={isCollapsed} />
            {#if !isCollapsed}
              <div transition:slide>
                <MarkdownView source={comment.data.body} class="break-words" />
              </div>
            {/if}
          </rover-comment-inner>
        </div>
      </svelte:element>
    </GestureView>

    {#if comment.data.replies}
      {#if !isCollapsed}
        <rover-comment-replies transition:slide>
          {#each comment.data.replies.data.children as reply}
            <svelte:self comment={reply} {viewType} />
          {/each}
        </rover-comment-replies>
      {/if}
    {/if}
  </rover-comment>
{/if}
