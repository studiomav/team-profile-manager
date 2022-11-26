//importing required packages
var inquirer = require('inquirer');
var fs = require('fs');
var buf = '';
var team = {};

var manager = {};
var engineers = [];
var interns = [];

//validator for if an entry was left blank
const isAnswerBlank = async (input) =>
{
    if (input == '') return 'This field is required';
    else return true;
}

//for writing the buffer to disk
function writeToFile(fileName, data)
{
    fs.appendFile(('./output/'+fileName), data, function (err)
    {
        if (err) throw err;
        console.log('Saved!');
    });
}

//take all entries and builds an html page
function buildHTML()
{
    console.log("done, building html");
}

//these are the main questions that are used to generate the team manager
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your team manager?',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'ID',
        message: 'Enter the team manager\'s ID:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the team manager\'s email address:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'office',
        message: 'Enter the team manager\'s office number:',
    },
];

//these are the main questions that are used to generate the engineer team members
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your engineer?',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'ID',
        message: 'Enter the engineer\'s ID:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the engineer\'s email address:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the engineer\'s GitHub username:',
    },
];

//these are the main questions that are used to generate the intern team members
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your intern?',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'ID',
        message: 'Enter the intern\'s ID:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the intern\'s email address:',
        validate: isAnswerBlank,
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the intern\'s school name:',
    },
];

function addEngineer()
{
    inquirer.prompt(engineerQuestions)
    .then((answers) =>
    {
        newEngineer = {};
        newEngineer.name = answers.name;  
        newEngineer.ID = answers.ID;
        newEngineer.email = answers.email;
        newEngineer.office = answers.office;

        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError)
        {
            console.log('prompt cannot be rendered in the current environment.');
        } else
        {
            console.log('something went wrong.')
        }
    });
}

function addIntern()
{
    inquirer.prompt(internQuestions)
    .then((answers) =>
    {
        newIntern = {};
        newIntern.name = answers.name;  
        newIntern.ID = answers.ID;
        newIntern.email = answers.email;
        newIntern.school = answers.school;

        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError)
        {
            console.log('prompt cannot be rendered in the current environment.');
        } else
        {
            console.log('something went wrong.')
        }
    });
}

function addMenu()
{
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selection',
                message: 'Would you like to add another employee?',
                choice: ['Add an Engineer', 'Add an Intern', 'Finished'],
            }
        ]).then((response) =>
        {
            if (response.choice == 'Add an Engineer') return addEngineer();
            else if (response.choice == 'Add an Intern') return addIntern();
            else if (response.choice == 'Finished') return buildHTML();
            else return console.log('Something went very wrong.');
        });
}

//the initial function that prompts the user with the team manager questions
function addManager()
{
    inquirer.prompt(managerQuestions)
    .then((answers) =>
    {
        //manager.name = Object.values(answers)[0]; 
        manager.name = answers.name;  
        manager.ID = answers.ID;
        manager.email = answers.email;
        manager.office = answers.office;

        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError)
        {
            console.log('prompt cannot- be rendered in the current environment.');
        } else
        {
            console.log('something went wrong.')
        }
    });
}

//an introduction to the script that confirms user intent before capturing CLI focus
console.log('Welcome to the project team page generation script. This tool will generate a formatted HTML page showcasing your project\'s team members based on your parameters.');
inquirer.prompt(
    [
        {
            type: 'confirm',
            name: 'begin',
            message: 'Would you like to begin?',
        }
    ]).then((response) =>
    {
        if (response.begin) return addManager();
        else return console.log('Goodbye.');
    });