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
    class:hover:bg-[var(--gray-5)]={interactable}
    {href}
    class="bg-[var(--elevated)] flex px-4 min-h-[44px] {$$restProps.class ||
      ''}"
  >
    <slot />
  </svelte:element>
</li>
