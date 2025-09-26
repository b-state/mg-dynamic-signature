<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let src: string;
	export let alt: string;
	export let imageIndex: number;

	const dispatch = createEventDispatcher();

	function onClickHandler() {
		dispatch('getIndex', { index: imageIndex });
	}
</script>

<div>
	<img
		class="rounded-md object-cover max-h-24 hover:opacity-70 transition aspect-[4/3]"
		{src}
		{alt}
		on:click={onClickHandler}
		on:keydown={onClickHandler}
		tabindex="0"
		loading="lazy"
	/>
</div>
