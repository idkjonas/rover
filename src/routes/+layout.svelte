<script>
  import { hasScrolledToBottom } from "$lib/stores";
  import moment from "moment";
  import TabBar from "./TabBar.svelte";
  import "../colors.css";
  import "../app.css";

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
  class="grid-rows-[1fr,min-content] md:grid-cols-[min-content,1fr] max-w-3xl mx-auto bg-[var(--background)] grid h-dvh"
>
  <div class="relative grid grid-rows-1 overflow-hidden isolate md:order-1">
    <slot />
  </div>

  <TabBar />
</rover-app>
