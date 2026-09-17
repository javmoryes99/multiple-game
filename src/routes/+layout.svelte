<script lang="ts">
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import { ModeWatcher, mode } from 'mode-watcher';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import Header from '$lib/components/layout/Header.svelte';

    let { children } = $props();

    $effect(() => {
        document.documentElement.setAttribute('data-theme', mode.current ?? 'light');
    });
</script>

<svelte:head><link rel="icon" href={favicon} /><title>Dividi2</title></svelte:head>

<ModeWatcher />
<Header />
{@render children()}