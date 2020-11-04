const notes = require('./notes.js')
const yargs = require('yargs')
const chalk = require('chalk')


/*
	Variables pour chalk affichage
*/
const error   =	chalk.red.bold.inverse('-ERROR')
const warning = chalk.bold.keyword('orange').inverse('WARNING!')
const success = chalk.green.bold.inverse('+SUCCESS')


/*
	ADD command 
	$ node app.js add --title="This is my title" --body="Here is my content" 
*/

yargs.command({
	command : "add",
	describe: "Add a new note.",
	builder : {
		title: {
			describe: "Give a title to your note.",
			demandOption: true,
			type: "string"
		},
		body: {
			describe: "Content of your note.",
			demandOption: true,
			type: "string"
		}
	},
	handler: function(argv){
		console.log("+++ You want to add a new note")
		console.log("Title: " + argv.title + "\nContent: " + argv.body )
	}  
})


/*
	console log arguments 
*/
yargs.parse()