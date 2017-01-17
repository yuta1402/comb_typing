export const readFileAsync = (filename: string, loadFinished: (data: any) => void) => {
	const req = new XMLHttpRequest();

	req.addEventListener('load', (e) => {
		loadFinished(JSON.parse(req.responseText));
	});

	req.overrideMimeType('application/json');
	req.open('GET', filename, true);
	req.send(null)
};
