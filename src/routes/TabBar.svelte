<script>
  import { page } from "$app/stores";
  import { Home, Mail, PersonCircle, Search, Cog } from "svelte-ionicons";
</script>

<nav
  class="bg-white border-t md:border-r md:border-t-0 size-full dark:bg-black border-[var(--gray-5)]"
>
  <div
    class="h-[50px] md:flex-col md:p-2 md:*:p-2 gap-y-2 *:rounded-md fine:[&>*:hover]:bg-[var(--gray-6)] [&>*:active]:scale-90 *:transition-transform standalone:pb-[34px] w-full text-[var(--gray-1)] flex [&>.active]:text-[var(--blue)] *:w-full *:text-[11px] *:flex *:flex-col *:items-center *:justify-center items-center justify-between"
  >
    <a href="/posts" class:active={$page.url.pathname === "/posts"}>
      <Home size="26" />
      Posts
    </a>
    <a href="/inbox" class:active={$page.url.pathname === "/inbox"}>
      <Mail size="26" />
      Inbox
    </a>
    <a href="/account" class:active={$page.url.pathname === "/account"}>
      <PersonCircle size="26" />
      Account
    </a>
    <a href="/search" class:active={$page.url.pathname === "/search"}>
      <Search size="26" />
      Search
    </a>
    <a href="/settings" class:active={$page.url.pathname === "/settings"}>
      <Cog size="26" />
      Settings
    </a>
  </div>
</nav>
