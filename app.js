// console.log('Starting app.js');

const fs = require('fs'); //Adds a new module
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js'); //Requires the additional files.

const noteTitle = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

const noteBody = {
  describe: 'Body of the Note',
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note',{
  title: noteTitle,
  body: noteBody
})
.command('list', 'List all Notes')
.command('read', 'Read a Note',{
  title: noteTitle
})
.command('remove', 'Remove a Note', {
  title: noteTitle
})
.help()
.argv;
var command = process.argv[2]; //Third position, thus index 2
// console.log('Command:', command);
// console.log('Process', process.argv);
// console.log('Yargs', argv);

if (command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if (note){
    notes.logNote(note);
  }else {
    console.log('Title taken');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes(s).`);
  allNotes.forEach((note)=> notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  if (note){
    console.log('Note found');
    notes.logNote(note);
  }else {
    console.log('Note not found');
  }
}else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized')
};


// Old code used in previous lessons:

// console.log(_.isString(true));
// console.log(_.isString('Willie'));

// var fileredArray = _.uniq(['Bill'])
// console.log(fileredArray);

// var res = notes.addNote();
// console.log(res);
//
// console.log('Result:', notes.add(5, 2));

// var user = os.userInfo();
//
// fs.appendFileSync('greetings.txt', `Hello ${user.username}! You are ${notes.age}`); //Creates a new file
