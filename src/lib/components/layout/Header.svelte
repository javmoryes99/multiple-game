<script lang="ts">
	import ThemeController from "./ThemeController.svelte";


</script>

  <header class="bg-gray-900">
  <div class="navbar shadow-sm">
    <div class="navbar-start">
      <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="" class="h-8 w-auto" />
      <a class="btn btn-ghost text-xl">Diviguessr</a>
    </div>
    <div class="navbar-center hidden lg:flex">
    </div>
    <div class="navbar-end">
      <ThemeController />
    </div>
  </div>
</header>