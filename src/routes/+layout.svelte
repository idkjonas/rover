<script>
  import { page } from "$app/stores";
  import { hasScrolledToBottom, cachedNavigation } from "$lib/stores";

  import moment from "moment";
  import TabBar from "./TabBar.svelte";
  import "../colors.css";
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
</script>

<div id="rover" class="max-w-3xl mx-auto bg-[var(--gray-6)]">
  <div
    class="grid-rows-[1fr,min-content] md:grid-cols-[min-content,1fr] grid h-dvh"
  >
    <div class="grid md:order-1 grid-rows-[min-content,1fr] overflow-hidden">
      <div
        class="h-[44px] flex items-center justify-center px-4 bg-white border-b g size-full dark:bg-black border-[var(--gray-5)]"
      >
        <h1>Rover</h1>
      </div>
      <main use:handleScroll class="overflow-y-scroll isolate overlow-x-hidden">
        <slot />
      </main>
    </div>

    <TabBar />
  </div>
</div>
