console.log('calc')

const $el = document.getElementById('calc')
if ($el) {
	const $x = $el.innerHTML
	x = replaceAll($x, '<', '&lt;')
	x = replaceAll(x, '>', '&gt;')
	$el.innerHTML = `<pre>${x}</pre>`
}

function replaceAll(string, search, replace) {
	return string.split(search).join(replace);
}




