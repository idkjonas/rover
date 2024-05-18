<script>
  import { VolumeX, Volume2 } from "lucide-svelte";
  import viewport from "./useViewportAction";
  import { scale } from "svelte/transition";
  export let post;

  let video;
  let audio;

  let isPaused = true;
  let currentTime = false;

  let hasLoaded = false;
  let hasAudio = true;

  let isMuted = true;

  $: if (video) {
    console.log(video.currentTime);
  }
</script>

<rover-video
  class="{$$restProps.class || ''} relative block isolate bg-[var(--gray-6)]"
>
  {#if hasAudio}
    <button
      on:click|stopPropagation={() => {
        isMuted = !isMuted;
        currentTime = video.currentTime;
      }}
      class="absolute z-[999] flex top-auto items-center justify-center p-2 rounded-md size-10 bg-black/80 bottom-2 right-2"
    >
      {#if isMuted}
        <div transition:scale class="absolute">
          <VolumeX />
        </div>
      {:else}
        <div transition:scale class="absolute">
          <Volume2 />
        </div>
      {/if}
    </button>
  {/if}

  <video
    loop
    loading="lazy"
    draggable="false"
    use:viewport
    on:enterViewport={() => video.play()}
    on:exitViewport={() => {
      video.pause();
      isMuted = true;
    }}
    bind:this={video}
    on:pause={() => {
      isPaused = true;
      currentTime = video.currentTime;
    }}
    on:play={() => {
      isPaused = false;
      currentTime = video.currentTime;
    }}
    on:seeked={() => (currentTime = video.currentTime)}
    on:seeked
    on:loaddedata={() => (hasLoaded = true)}
    playsinline
    style="aspect-ratio: {post.data.preview.images[0].source.width}/{post.data
      .preview.images[0].source.height}"
    class="h-full mx-auto"
  >
    <source src="{post.data.url}/DASH_1080.mp4" type="video/mp4" />
    <source src="{post.data.url}/DASH_720.mp4" type="video/mp4" />
    <source src="{post.data.url}/DASH_480.mp4" type="video/mp4" />
    <source src="{post.data.url}/DASH_360.mp4" type="video/mp4" />
    <source src="{post.data.url}/DASH_270.mp4" type="video/mp4" />
    <source src="{post.data.url}/DASH_220.mp4" type="video/mp4" />

    <track kind="captions" />
  </video>

  <!-- svelte-ignore a11y-media-has-caption -->
  <video
    muted={isMuted}
    loop
    playsinline
    class="hidden"
    bind:paused={isPaused}
    bind:this={audio}
    bind:currentTime
  >
    <source
      src="{post.data.url}/DASH_AUDIO_64.mp4"
      type="audio/mp4"
      on:error={() => (hasAudio = false)}
    />
  </video>
</rover-video>
