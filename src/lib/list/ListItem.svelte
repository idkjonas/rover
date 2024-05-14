<script>
  export let interactable = false;
  export let href = undefined;

  if (href !== "") {
    interactable = true;
  }
</script>

<li>
  <svelte:element
    this={href !== "" ? "a" : "div"}
    class:hover:bg-[var(--gray-5)]={interactable}
    {href}
    class="bg-[var(--base)] px-4 h-[44px] {$$restProps.class || ''}"
  >
    <slot />
  </svelte:element>
</li>
