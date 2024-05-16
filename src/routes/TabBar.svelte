<script>
  import { page } from "$app/stores";
  import { hasScrolledToBottom } from "$lib/stores";
  import { Newspaper, Mail, CircleUserRound, Search, Cog } from "lucide-svelte";
</script>

<rover-tab-bar>
  <nav
    class="border-t md:border-r bg-[var(--base)] standalone:pb-[34px] md:border-t-0 size-full border-[var(--gray-5)]"
  >
    <div
      class="h-[50px] md:flex-col md:[&>span]:*:hidden px md:p-2 md:*:p-3 gap-y-2 *:rounded-md fine:[&>*:hover]:bg-[var(--gray-6)] [&>*:active]:scale-90 *:transition-transform w-full text-[var(--gray-1)] flex [&>.active]:text-[var(--blue)] *:w-full *:text-[11px] *:flex *:flex-col *:items-center *:justify-center items-center justify-between"
    >
      <a
        href="/posts"
        data-sveltekit-replacestate
        class:active={$page.url.pathname === "/posts"}
      >
        <Newspaper size="26" />
        <span>Posts</span>
      </a>
      <a
        href="/inbox"
        data-sveltekit-replacestate
        class:active={$page.url.pathname === "/inbox"}
      >
        <Mail size="26" />
        <span>Inbox</span>
      </a>
      <a
        href="/account"
        data-sveltekit-replacestate
        class:active={$page.url.pathname === "/account"}
      >
        <CircleUserRound size="26" />
        <span>Account</span>
      </a>
      <a
        href="/search"
        data-sveltekit-replacestate
        class:active={$page.url.pathname === "/search"}
      >
        <Search size="26" />
        <span>Search</span>
      </a>
      <a
        href="/settings"
        data-sveltekit-replacestate
        class:active={$page.url.pathname === "/settings"}
      >
        <Cog size="26" />
        <span>Settings</span>
      </a>
    </div>
  </nav>
</rover-tab-bar>
