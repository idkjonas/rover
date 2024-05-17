<script>
  import { page } from "$app/stores";
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
</script>

<rover-app
  class="grid-rows-[1fr,min-content]
  {$page.state.showSubView ? 'max-w-7xl' : 'max-w-3xl'}
   md:grid-cols-[min-content,1fr] mx-auto bg-[var(--background)] grid h-dvh"
>
  <div
    class="relative grid grid-cols-1 grid-rows-1 isolate md:order-1 md:h-dvh
    {$page.state.showSubView ? 'md:grid-cols-2' : 'md:grid-cols-1'}"
  >
    <slot />
  </div>

  <TabBar />
</rover-app>
