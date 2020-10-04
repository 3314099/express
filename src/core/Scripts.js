const path = require('path')
const fs = require('fs')

class Scripts {
	constructor(script) {
		this.script = script
	}

	async getBlock() {
		try {
			let script = await this.block()
			return script
		} catch {
			console.log('Error')
		}
	}

	async block() {
		const filePath = '../scriptsPages/' + this.script
		let html = await Scripts.readFile(filePath, 'code.html')
		let htmlCode = replaceAll(html, '<', '&lt;')
		htmlCode = replaceAll(htmlCode, '>', '&gt;')
		const scss = await Scripts.readFile(filePath, 'style.scss')
		const script = await Scripts.readFile(filePath, 'scripts.js')
		return {
			id: this.script,
			html: html,
			htmlCode: htmlCode,
			scss: scss,
			script: script
		}
	}

	static readFile(filePath, filename) {
		return new Promise((resolve, reject) => {
			fs.readFile(
					path.join(__dirname, filePath, filename),
					'utf-8',
					(err, data) => {
						if (err) {
							reject(err)
						} else {
							resolve(data)
						}
					}
			)
		})

	}
}
module.exports  = Scripts

function replaceAll(string, search, replace) {
	return string.split(search).join(replace)
}
