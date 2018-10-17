const base = require('./base');

console.log(base);

module.exports = Object.assign(base, {
	watch: true,
	mode: 'development'
});