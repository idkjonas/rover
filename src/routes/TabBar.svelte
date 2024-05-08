<script>
  import { page } from "$app/stores";
  import { Home, Mail, PersonCircle, Search, Cog } from "svelte-ionicons";
</script>

<nav
  class="bg-white border-t md:border-r md:border-t-0 size-full dark:bg-black border-[var(--gray-5)]"
>
  <div
    class="h-[50px] standalone:pb-[34px] w-full text-zinc-500 flex [&>.active]:text-blue-500 *:w-full font-medium *:text-xs *:flex *:flex-col *:items-center *:justify-center items-center justify-between justify"
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
