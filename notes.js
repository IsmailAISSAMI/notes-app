const fs = require('fs')
const yargs = require('yargs')
const chalk = require('chalk')
/*
	Variables pour chalk affichage
*/
const error   =	chalk.red.bold.inverse('-ERROR')
const warning = chalk.bold.keyword('orange').inverse('WARNING!')
const success = chalk.green.bold.inverse('+SUCCESS')

/*
	loading and saving data at JSON file 
*/

const loadNotes = () => {
	//If we don't have a notes.json, I return an empty array
	try	{
		const buffer = fs.readFileSync('notes.json')
		const notesData = JSON.parse(buffer.toString())
		return notesData
	} catch(e){
		return []
	}
}

const saveNotes = (jsonData) => {
	const notes = JSON.stringify(jsonData)
	fs.writeFileSync('notes.json', notes)
}


/*
	ADD Function: add the note to JSON file 
*/


const addNote = (title, body) => {
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
        console.log(success + "  New note added!")
	} else {
		console.log(warning + "  Note title already used!")
	}

	//return JSON.stringify(loadNotes)
}

/*
	Remove Function: Remove a specific note 
*/


const removeNote = (title) => {
	const notes = loadNotes()
	const notesToKeep = notes.filter((note) => note.title !== title)

	if (notes.length > notesToKeep.length ){
		saveNotes(notesToKeep)
		console.log(success + " The note titled: " + title + " is removed.")
	} else {
		console.log(warning + " There is no note with this title " + title)

	}

}

/*
	List Function: List titles for all the notes
*/

const listNotes = () => {
	const notes = loadNotes()
	console.log(success + '\n' + chalk.bold.cyan.inverse('\tYour Notes:'))
	
	notes.forEach((note) => {
		console.log('\t-------')
		console.log(chalk.cyan('\tTitle: ') + note.title)
	})
}

/*
	Read Function: read a note
*/
const readNote = (title) => {
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)


	if (!note) {
        console.log(warning + "  There is no note with this title!")
	} else {
		console.log(success + '\n' + chalk.bold.cyan.inverse('\n\tYour Note:'))
		console.log('\t-------')
		console.log(chalk.cyan('\tTitle: ') + note.title + chalk.cyan('\n\tContent: ') + note.body)

	}	
}

module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}
