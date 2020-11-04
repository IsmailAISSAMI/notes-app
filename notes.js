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

const loadNotes = function(){
	//If we don't have a notes.json, I return an empty array
	try	{
		const buffer = fs.readFileSync('notes.json')
		const notesData = JSON.parse(buffer.toString())
		return notesData
	} catch(e){
		return []
	}
}

const saveNotes = function(jsonData){
	const notes = JSON.stringify(jsonData)
	fs.writeFileSync('notes.json', notes)
}


/*
	ADD Function: add the note to JSON file 
*/


const addNote = function(title, body){
	const notes = loadNotes()
	const duplicateNote = notes.filter(function(note){
		return note.title === title
	})

	if (duplicateNote.length === 0) {
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


const removeNote = function(title){
	const notes = loadNotes()
	const notesToKeep = notes.filter(function(note){
		return note.title !== title 
	})

	if (notes.length > notesToKeep.length ){
		saveNotes(notesToKeep)
		console.log(success + " The note titled: " + title + " is removed.")
	} else {
		console.log(warning + " There is no note with this title " + title)

	}

}


module.exports = {
	addNote: addNote,
	removeNote: removeNote
}
