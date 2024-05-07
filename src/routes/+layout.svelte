<script>
  import { page } from "$app/stores";

  import moment from "moment";

  import Navbar from "./NavBar.svelte";
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
</script>

<div id="rover" class="max-w-xl mx-auto dark:bg-zinc-900 bg-zinc-100">
  <div
    id="grid-wrapper"
    class="grid grid-rows-[44px,1fr,50px] standalone:grid-rows-[44px,1fr,84px] h-dvh"
  >
    <Navbar />
    {#key $page.url.pathname}
      <main class="overflow-y-scroll overlow-x-hidden" in:fly={{ y: 10 }}>
        <slot />
      </main>
    {/key}
    <TabBar />
  </div>
</div>
