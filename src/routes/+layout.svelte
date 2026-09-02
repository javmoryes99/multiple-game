<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { getNumberAndMultiples } from '$lib/functions/numberCalculation';
	import Header from '$lib/components/layout/Header.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /><title>Diviguessr</title></svelte:head>

<Header />
{@render children()}