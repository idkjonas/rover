<script>
  import { page } from "$app/stores";
  import { Home, Mail, PersonCircle, Search, Cog } from "svelte-ionicons";
</script>

<rover-tab-bar>
  <nav
    class="border-t md:border-r bg-[var(--base)] md:border-t-0 size-full border-[var(--gray-5)]"
  >
    <div
      class="h-[50px] md:flex-col px md:p-2 md:*:p-2 gap-y-2 *:rounded-md fine:[&>*:hover]:bg-[var(--gray-6)] [&>*:active]:scale-90 *:transition-transform standalone:pb-[34px] w-full text-[var(--gray-1)] flex [&>.active]:text-[var(--blue)] *:w-full *:text-[11px] *:flex *:flex-col *:items-center *:justify-center items-center justify-between"
    >
      <rover-tab-bar-item>
        <a href="/posts" class:active={$page.url.pathname === "/posts"}>
          <Home size="26" />
          Posts
        </a>
      </rover-tab-bar-item>
      <rover-tab-bar-item>
        <a href="/inbox" class:active={$page.url.pathname === "/inbox"}>
          <Mail size="26" />
          Inbox
        </a>
      </rover-tab-bar-item>
      <rover-tab-bar-item>
        <a href="/account" class:active={$page.url.pathname === "/account"}>
          <PersonCircle size="26" />
          Account
        </a>
      </rover-tab-bar-item>
      <rover-tab-bar-item>
        <a href="/search" class:active={$page.url.pathname === "/search"}>
          <Search size="26" />
          Search
        </a>
      </rover-tab-bar-item>
      <rover-tab-bar-item>
        <a href="/settings" class:active={$page.url.pathname === "/settings"}>
          <Cog size="26" />
          Settings
        </a>
      </rover-tab-bar-item>
    </div>
  </nav>
</rover-tab-bar>
