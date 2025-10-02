<script>
    import checkMark from '$lib/assets/check_mark.png';
    import Fa from "svelte-fa";

	let {text} = $props();
</script>

<div class="flex items-center gap-3">
	<img src={checkMark} alt="check mark" class="w-10 h-10" />
	<p class="text-3xl text-neutral-500 font-bold">{text}</p>
</div>
