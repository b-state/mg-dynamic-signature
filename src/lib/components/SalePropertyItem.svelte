<script lang="ts">
	import type { OfferTypes } from '$lib/types/offerTypes.type';
	import '@fontsource-variable/open-sans';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faDoorOpen,
		faEuro,
		faLocationDot,
		faRulerCombined,
		faXmark
	} from '@fortawesome/free-solid-svg-icons';
	import ImageWithCover from './ImageWithCover.svelte';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { getSmallImagePath } from '$lib/helpers';
	import type { Anhang } from '$lib/types';
	import type { ActionData } from '../../../.svelte-kit/types/src/routes/$types';

	export let id: number;
	export let externalId: number;
	export let title: string;
	export let city: string;
	export let zip: number;
	export let price: string;
	// format property price in european style
	const price_formatted = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'EUR'
	}).format(parseFloat(price));

	// used for the label text
	export let offerTypeObject: OfferTypes;
	let offerType = 'offerType';

	if (offerTypeObject.atr_KAUF === 'true') {
		offerType = 'Zu verkaufen';
	}
	if (offerTypeObject.atr_MIETE_PACHT === 'true') {
		offerType = 'Zu vermieten';
	}
	if (offerTypeObject.atr_ERBPACHT === 'true') {
		offerType = 'Zur Pacht';
	}
	if (offerTypeObject.atr_LEASING === 'true') {
		offerType = 'Zum leasen';
	}

	export let squareMeter: number;
	export let roomCount: number;
	export let attachments: Anhang[];
	export let objectDescription: string;
	export let formData: ActionData = {};
	let currentImageIndex = 0;

	function setHeroImage(event: CustomEvent) {
		currentImageIndex = event.detail.index;
	}

	let modalActive = false;
	// We use this to hide the div where the dispatch status messasge will be displayed. Without it, if a user would click submitt in one submission form, the status message would appear in all submission forms.
	let displayDispatchMessage = false;

	let screenWidth: number;

	// used to display an X or 'Zurück zum Expose'
	function updateScreenWidth() {
		screenWidth = window.innerWidth;
	}

	// scrolls to to top of the div from which the modal was triggered
	function scrollToElement(elementId: string) {
		if (screenWidth < 1024) {
			let el = document.getElementById(elementId);
			el?.scrollIntoView({ behavior: 'smooth' });
		}
	}
</script>

	<div class="mb-5 flex w-[800px] flex-row gap-5 rounded bg-gray-100 p-5">
		<!-- Hero image and gallery -->
		<div class="relative  w-1/2">
			<!-- Hero image -->
			<img
				class="rounded-md object-contain"
				src={getSmallImagePath(attachments[currentImageIndex].daten.pfad)}
				alt="Bild der Immobile"
			/>
		</div>
		<!-- Text / Info -->
		<div class="flex flex-col w-1/2">
			<!-- Title and Tags -->
			<div class="flex flex-col">
				<!-- Title -->
				<h2 class=" mb-3 text-2xl font-bold">{title}</h2>
			</div>
			<!-- Icons with text -->
			<div class=" flex flex-col flex-wrap gap-5">
				<div class="flex flex-row items-center gap-2">
					<div class="w-5">
						<Fa icon={faLocationDot} />
					</div>
					<h3>Adresse: {zip}, {city}</h3>
				</div>
				<div class="flex flex-row items-center gap-2">
					<div class="w-5">
						<Fa icon={faDoorOpen} />
					</div>
					<h3>Zimmer: {roomCount}</h3>
				</div>
				<div class="flex flex-row items-center gap-2">
					<div class="w-5">
						<Fa icon={faRulerCombined} />
					</div>
					<h3>Fläche: {squareMeter} m²</h3>
				</div>
				<div class="flex flex-row items-center gap-2">
					<div class="w-5">
						<Fa icon={faEuro} />
					</div>
					<h3>Preis: {price_formatted}</h3>
				</div>
			</div>
		</div>
	</div>
