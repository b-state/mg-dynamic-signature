export interface dynamoItem {
	property_id: string,
	property_data: xml_json,
	timestamp: number,
	property_marketing_type: string;
}


export interface xml_json {
	"?xml": Xml
	openimmo: Openimmo
}

export interface Xml {
	atr_encoding: string
	atr_version: string
}

export interface Openimmo {
	anbieter: Anbieter
	uebertragung: Uebertragung
}

export interface Anbieter {
	anbieternr: string
	firma: string
	immobilie: Immobilie
	impressum: string
	openimmo_anid: string
}

export interface Immobilie {
	anhaenge: Anhaenge
	ausstattung: Ausstattung
	flaechen: Flaechen
	freitexte: Freitexte
	geo: Geo
	infrastruktur: Infrastruktur
	kontaktperson: Kontaktperson
	objektkategorie: Objektkategorie
	preise: Preise
	verwaltung_objekt: VerwaltungObjekt
	verwaltung_techn: VerwaltungTechn
	zustand_angaben: ZustandAngaben
}

export interface Anhaenge {
	anhang: Anhang[]
}

export interface Anhang {
	anhangtitel: string
	atr_gruppe: string
	atr_location: string
	daten: Daten
	format: string
}

export interface Daten {
	pfad: string
}

export interface Ausstattung {
	abstellraum: boolean
	bad: Bad
	befeuerung: Befeuerung
	boden: Boden
	gaestewc: boolean
	gartennutzung: boolean
	heizungsart: Heizungsart
	kamin: boolean
	kueche: Kueche
	stellplatzart: Stellplatzart
	unterkellert: Unterkellert
}

export interface Bad {
	atr_DUSCHE: string
	atr_FENSTER: string
	atr_WANNE: string
}

export interface Befeuerung {
	atr_OEL: string
}

export interface Boden {
	atr_FLIESEN: string
	atr_MARMOR: string
	atr_PARKETT: string
	atr_TEPPICH: string
}

export interface Heizungsart {
	atr_ZENTRAL: string
}

export interface Kueche {
	atr_EBK: string
	atr_OFFEN: string
	atr_PANTRY: string
}

export interface Stellplatzart {
	atr_CARPORT: string
	atr_DUPLEX: string
	atr_FREIPLATZ: string
	atr_GARAGE: string
	atr_PARKHAUS: string
	atr_TIEFGARAGE: string
}

export interface Unterkellert {
	atr_keller: string
}

export interface Flaechen {
	anzahl_badezimmer: number
	anzahl_balkone: number
	anzahl_schlafzimmer: number
	anzahl_stellplaetze: number
	anzahl_zimmer: number
	grundstuecksflaeche: number
	nutzflaeche: number
	wohnflaeche: number
}

export interface Freitexte {
	ausstatt_beschr: string
	lage: string
	objektbeschreibung: string
	objekttitel: string
	sonstige_angaben: string
}

export interface Geo {
	bundesland: string
	geokoordinaten: Geokoordinaten
	hausnummer: number
	land: Land
	ort: string
	plz: number
	strasse: string
}

export interface Geokoordinaten {
	atr_breitengrad: string
	atr_laengengrad: string
}

export interface Land {
	atr_iso_land: string
}

export interface Infrastruktur {
	distanzen: Distanzen[]
}

export interface Distanzen {
	"#text": number
	atr_distanz_zu: string
}

export interface Kontaktperson {
	anrede: string
	email_zentrale: string
	firma: string
	foto: Foto
	hausnummer: number
	land: Land2
	name: string
	ort: string
	plz: number
	position: string
	strasse: string
	tel_handy: number
	tel_zentrale: string
	url: string
	vorname: string
}

export interface Foto {
	atr_location: string
	daten: Daten2
	format: string
}

export interface Daten2 {
	pfad: string
}

export interface Land2 {
	atr_iso_land: string
}

export interface Objektkategorie {
	nutzungsart: Nutzungsart
	objektart: Objektart
	vermarktungsart: Vermarktungsart
}

export interface Nutzungsart {
	atr_ANLAGE: string
	atr_GEWERBE: string
	atr_WAZ: string
	atr_WOHNEN: string
}

export interface Objektart {
	haus: string
}

export interface Vermarktungsart {
	atr_ERBPACHT: string
	atr_KAUF: string
	atr_LEASING: string
	atr_MIETE_PACHT: string
}

export interface Preise {
	aussen_courtage: string
	courtage_hinweis: string
	kaufpreis: Kaufpreis
	provisionspflichtig: number
	stp_garage: StpGarage
	waehrung: Waehrung
	kaltmiete: string;
	nebenkosten: string;
	kaution_text: string;
}

export interface Kaufpreis {
	"#text": number
	atr_auf_anfrage: string
}

export interface StpGarage {
	atr_anzahl: string
}

export interface Waehrung {
	atr_iso_waehrung: string
}

export interface VerwaltungObjekt {
	objektadresse_freigeben: boolean
	verfuegbar_ab: string
}

export interface VerwaltungTechn {
	aktion: Aktion
	kennung_ursprung: string
	objektnr_extern: number
	objektnr_intern: number
	openimmo_obid: string
	sprache: string
	stand_vom: string
	user_defined_simplefield: UserDefinedSimplefield[]
	weitergabe_generell: boolean
}

export interface Aktion {
	atr_aktionart: string
}

export interface UserDefinedSimplefield {
	"#text": string
	atr_feldname: string
}

export interface ZustandAngaben {
	baujahr: number
	energiepass: Energiepass
	user_defined_simplefield: UserDefinedSimplefield2
	zustand: Zustand
}

export interface Energiepass {
	ausstelldatum: string
	energieverbrauchkennwert: string
	epart: string
	gebaeudeart: string
	gueltig_bis: string
	jahrgang: number
	mitwarmwasser: boolean
	primaerenergietraeger: string
	wertklasse: string
}

export interface UserDefinedSimplefield2 {
	"#text": number
	atr_feldname: string
}

export interface Zustand {
	atr_zustand_art: string
}

export interface Uebertragung {
	atr_art: string
	atr_modus: string
	atr_sendersoftware: string
	atr_senderversion: string
	atr_techn_email: string
	atr_timestamp: string
	atr_umfang: string
	atr_version: string
}


