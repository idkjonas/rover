<script>
  import { page } from "$app/stores";
  import { hasScrolledToBottom, cachedNavigation } from "$lib/stores";

  import moment from "moment";
  import TabBar from "./TabBar.svelte";
  import "../app.css";
  import { fly } from "svelte/transition";

  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s",
      s: "now",
      ss: "%ss",
      m: "1m",
      mm: "%dm",
      h: "1h",
      hh: "%dh",
      d: "1d",
      dd: "%dd",
      M: "1mo",
      MM: "%dmo",
      y: "1y",
      yy: "%dy",
    },
  });

  let atBottom = false;

  function handleScroll(node) {
    node.addEventListener("scroll", () => {
      atBottom = node.scrollHeight - node.offsetHeight - node.scrollTop < 1;
      if (atBottom) {
        hasScrolledToBottom.set(true);
        setTimeout(() => {
          hasScrolledToBottom.set(false);
        }, 500);
      }
    });
  }

  $: console.log($cachedNavigation);
</script>

<div id="rover" class="max-w-xl mx-auto dark:bg-zinc-900 bg-zinc-100">
  <div id="grid" class="grid-rows-[min-content,1fr,min-content] grid h-dvh">
    <div
      class="h-[44px] flex items-center justify-center px-4 bg-white border-b g size-full dark:bg-black dark:border-zinc-800 border-zinc-200"
    >
      <h1>Rover</h1>
    </div>
    {#key $page.url.pathname}
      <main
        use:handleScroll
        class="overflow-y-scroll isolate overlow-x-hidden"
        in:fly={{ y: 10 }}
      >
        <slot />
      </main>
    {/key}
    <TabBar />
  </div>
</div>
