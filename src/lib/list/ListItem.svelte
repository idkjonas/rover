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
    class="px-3 bg-[var(--base)] py-2 {$$restProps.class || ''}"
  >
    <slot />
  </svelte:element>
</li>
