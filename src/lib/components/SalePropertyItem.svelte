<script lang="ts">
	import '@fontsource-variable/open-sans';
	import {
		faDoorOpen,
		faEuro,
		faLocationDot,
		faRulerCombined
	} from '@fortawesome/free-solid-svg-icons';

	import { getSmallImagePath } from '$lib/helpers';
	import type { Anhang } from '$lib/types';
	import Fa from 'svelte-fa';

	export let title: string;
	export let city: string;
	export let zip: number;
	export let price: string;
	// format property price in european style
	const price_formatted = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(parseFloat(price));

	export let squareMeter: number;
	export let roomCount: number;
	export let attachments: Anhang[];
	let currentImageIndex = 0;
</script>

<div class="mb-5 flex flex-row gap-5 rounded bg-gray-100 p-5">
	<!-- Hero image and gallery -->
	<div class="relative">
		<!-- Hero image -->
		<img
			class="h-60 rounded-md object-contain"
			src={getSmallImagePath(attachments[currentImageIndex].daten.pfad)}
			alt="Bild der Immobile"
		/>
	</div>
	<!-- Text / Info -->
	<div class="flex w-1/2 flex-col">
		<!-- Title and Tags -->
		<div class="flex flex-col">
			<!-- Title -->
			<h2 class=" mb-3 text-2xl font-bold">{title}</h2>
		</div>
		<!-- Icons with text -->
		<div class=" flex flex-col flex-wrap gap-2">
			<div class="flex flex-row items-center gap-4">
				<div class="w-5">
					<Fa icon={faLocationDot} size="lg" />
				</div>
				<h2 class="text-xl">Adresse: {zip}, {city}</h2>
			</div>
			<div class="flex flex-row items-center gap-4">
				<div class="w-5">
					<Fa icon={faDoorOpen} size="lg" />
				</div>
				<h2 class="text-xl">Zimmer: {roomCount}</h2>
			</div>
			<div class="flex flex-row items-center gap-4">
				<div class="w-5">
					<Fa icon={faRulerCombined} size="lg" />
				</div>
				<h2 class="text-xl">Fläche: {squareMeter} m²</h2>
			</div>
			<div class="flex flex-row items-center gap-4">
				<div class="w-5">
					<Fa icon={faEuro} size="lg" />
				</div>
				<h2 class="text-xl">Preis: {price_formatted}</h2>
			</div>
		</div>
	</div>
</div>
