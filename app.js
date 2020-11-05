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
	handler: (argv) => {
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
    handler: (argv) => {
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
    handler: () => {
        notes.listNotes()
    }
})

/*
	READ command 
	$ node app.js read 
*/

yargs.command({
    command: 'read',
    describe: 'Read a note.',
	builder: {
		title: {
			describe: "Read a note.",
			demandOption: true,
			type: "string"
		}
	},
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})


/*
	console log arguments 
*/
yargs.parse()