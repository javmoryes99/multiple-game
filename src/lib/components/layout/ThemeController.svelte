<script lang="ts">
    import { toggleMode, mode } from 'mode-watcher';
    import DarkModeRoundedIcon from '@iconify-svelte/material-symbols/dark-mode-rounded';
    import LightModeRoundedIcon from '@iconify-svelte/material-symbols/light-mode-rounded';

    let checked = $state(mode.current === 'dark');

    $effect(() => {
        checked = mode.current === 'dark';
    });

    function handleChange() {
        checked = !checked;
        setTimeout(toggleMode, 100);
    }
</script>

<label class="swap swap-rotate text-neutral-content">
    <input type="checkbox" {checked} onchange={handleChange} />
    <LightModeRoundedIcon class="h-8 w-8 swap-off" />
    <DarkModeRoundedIcon class="h-8 w-8 swap-on" />
</label>