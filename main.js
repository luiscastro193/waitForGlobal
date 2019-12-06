function waitForGlobal(name) {
	return new Promise(resolve => {
		if (window[name])
			return resolve();
		
		document.head.querySelector(`[meta-id=${name}]`).addEventListener('load', () => resolve());
	});
}

function appendScriptTag(url, id) {
	let script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('meta-id', id);
	script.setAttribute('async', '');
	document.head.appendChild(script);
}

function lazyLoad(url, global) {
	if (!document.head.querySelector(`[meta-id=${global}]`))
		appendScriptTag(url, global);
	
	return waitForGlobal(global);
}

async function test() {
	await lazyLoad("https://cdn.plot.ly/plotly-latest.min.js", "Plotly");
	console.log(Plotly);
	document.querySelector('p').textContent = "Library loaded";
}

test();
