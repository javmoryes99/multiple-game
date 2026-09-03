<script lang="ts">
	import DarkModeRoundedIcon from '@iconify-svelte/material-symbols/dark-mode-rounded';
	import LightModeRoundedIcon from '@iconify-svelte/material-symbols/light-mode-rounded';

	let theme = 'light';
	function toggleTheme() {
		theme = theme === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<label class="swap swap-rotate text-neutral-content">
	<input type="checkbox" checked={theme === 'dark'} onchange={toggleTheme} />
	<LightModeRoundedIcon class="h-8 w-8 swap-off" />
	<DarkModeRoundedIcon class="h-8 w-8 swap-on" />
</label>
