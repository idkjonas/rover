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
      s: "seconds",
      ss: "%ss",
      m: "a minute",
      mm: "%dm",
      h: "an hour",
      hh: "%dh",
      d: "a day",
      dd: "%dd",
      M: "a month",
      MM: "%dM",
      y: "a year",
      yy: "%dY",
    },
  });
</script>

<div class="max-w-xl mx-auto dark:bg-zinc-900 bg-zinc-100">
  <div class="grid grid-rows-[44px,1fr,50px] h-dvh">
    <Navbar />
    {#key $page.url.pathname}
      <main class="overflow-y-scroll overlow-x-hidden" in:fly={{ y: 10 }}>
        <slot />
      </main>
    {/key}
    <TabBar />
  </div>
</div>
