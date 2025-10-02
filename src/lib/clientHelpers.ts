export function getSmallImagePath(imagePath:string) {
	return imagePath.replace(/(\/)([^\/]+\.jpg)/gi, '$1big_$2');
}
