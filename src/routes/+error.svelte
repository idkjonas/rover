<script>
  import { page } from "$app/stores";

  $: if ($page) {
    console.log($page);
  }
</script>

<section class="p-4">
  <h1 class="text-3xl font-medium">Page not found</h1>
</section>
