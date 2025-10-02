<script lang="ts">
	import type { PageProps } from '../../.svelte-kit/types/src/routes/$types';
	import SalePropertyItem from '$lib/components/SalePropertyItem.svelte';
	import mgLogo from '$lib/assets/Logo mit Schriftzug queer.png';
	import ivdLogo from '$lib/assets/ivdLogo.png';
	import vdivLogo from '$lib/assets/vdivLogo.png';
	import scoutLogo from '$lib/assets/scoutLogo.png';
	import CheckMarkWithText from '$lib/components/CheckMarkWithText.svelte';
    import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

	let { data }: PageProps = $props();
</script>

<div class="w-[1600px] p-10 font-[Open_Sans] gap-8 flex flex-col">
    <div class="flex gap-5 items-center text-neutral-500">
        <p class="min-w-fit text-2xl">Expertise seit über 30 Jahren</p>
        <div class="bg-green-600 w-full h-[2px]"></div>
    </div>
	<div class=" flex items-center justify-between">
		<img src={mgLogo} alt="Logo" class="w-130" />
		<div class="flex flex-col gap-3">
			<CheckMarkWithText text={'Verkauf'}></CheckMarkWithText>
			<CheckMarkWithText text={'Vermietung'}></CheckMarkWithText>
			<CheckMarkWithText text={'Verwaltung'}></CheckMarkWithText>
		</div>
		<div class="flex h-40 items-center gap-4">
			<img src={scoutLogo} alt="Logo" class="h-40 object-contain" />
			<img src={ivdLogo} alt="Logo" class="h-30  object-contain" />
			<img src={vdivLogo} alt="Logo" class="h-40 object-contain" />
		</div>
	</div>
    <div class="flex flex-col gap-5">
        <div class="flex gap-5">
            {#each data.tableItems as property}
                <SalePropertyItem
                        title={property.anbieter.immobilie.freitexte.objekttitel}
                        city={property.anbieter.immobilie.geo.ort}
                        zip={property.anbieter.immobilie.geo.plz}
                        price={property.anbieter.immobilie.preise.kaufpreis['#text'].toString()}
                        squareMeter={property.anbieter.immobilie.flaechen.wohnflaeche}
                        roomCount={property.anbieter.immobilie.flaechen.anzahl_zimmer}
                        attachments={property.anbieter.immobilie.anhaenge.anhang}
                />
            {/each}
        </div>
        <button class="h-12 w-full rounded-md bg-green-600 text-2xl font-bold text-white flex flex-row items-center justify-center"
        >Zum Angebot <Fa icon={faArrowRight} class="ml-2" size="md" />
        </button
        >
    </div>
</div>
