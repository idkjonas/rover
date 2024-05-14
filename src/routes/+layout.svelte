<script>
  import { hasScrolledToBottom } from "$lib/stores";
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

<rover-app
  class="grid-rows-[1fr,min-content] md:grid-cols-[min-content,1fr] max-w-3xl mx-auto bg-[var(--gray-6)] grid h-dvh"
>
  <rover-grid class="grid grid-rows-1 overflow-hidden md:order-1">
    <main use:handleScroll class="overflow-y-scroll isolate overlow-x-hidden">
      <slot />
    </main>
  </rover-grid>

  <TabBar />
</rover-app>
