<script>
  export let interactable = false;
  export let href = "";

  if (href !== "") {
    interactable = true;
  }
</script>

<li>
  <svelte:element
    this={href !== "" ? "a" : "div"}
    target="_blank"
    class:fine:hover:bg-[var(--gray-5)]={interactable}
    class:cursor-pointer={interactable}
    {href}
    class="bg-[var(--elevated)] items-center flex px-4 min-h-[44px] {$$restProps.class ||
      ''}"
  >
    <slot />
  </svelte:element>
</li>
