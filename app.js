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
		//console.log("+++ You want to add a new note")
		//console.log("Title: " + argv.title + "\nContent: " + argv.body )

		notes.addNote(argv.title, argv.body)
		
	}  
})


/*
	REMOVE command 
	$ node app.js remove --title="This is my title"
*/yargs.command({
    command: 'remove',
    describe: 'Remove a note.',
    builder: {
    	title: {
    		describe: "Search the note by title and Remove it.",
    		demandOption: true,
    		type: "string"
    	}
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

/*
	LIST command 
	$ node app.js list 
*/
yargs.command({
    command: 'list',
    describe: 'List your notes.',
    handler: function () {
        console.log(success + ' Listing out all notes.')
    }
})

/*
	READ command 
	$ node app.js read 
*/

yargs.command({
    command: 'read',
    describe: 'Read a note.',
    handler: function () {
        console.log(success + ' Reading a note.')
    }
})




/*
	console log arguments 
*/
yargs.parse()