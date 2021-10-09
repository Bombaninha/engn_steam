export const suspend = async (ms: number) => {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}