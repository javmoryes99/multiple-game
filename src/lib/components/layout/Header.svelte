<script lang="ts">
	import ThemeController from "./ThemeController.svelte";


</script>

  <header class="sticky top-0 bg-neutral">
  <div class="navbar shadow-sm">
    <div class="navbar-start">
      <button class="btn btn-ghost text-xl text-neutral-content border-none hover:bg-transparent hover:opacity-100">
        <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" class="h-8 w-auto" />
        <span>Diviguessr</span>
      </button>
    </div>
    <div class="navbar-center hidden lg:flex">
    </div>
    <div class="navbar-end pr-5">
      <ThemeController />
    </div>
  </div>
</header>