<script>
  export let author;
  export let mod = false;
  export let op = false;
</script>

<a
  href="/u/{author}"
  class="font-medium fine:hover:underline
  {mod && '!text-[var(--green)]'} 
  {op && 'text-[var(--blue)]'}
  {author === 'Jonasuwu' && '!text-[var(--purple)]'}
  {author === 'spez' && '!text-[var(--red)]'}"
>
  {author}
</a>
