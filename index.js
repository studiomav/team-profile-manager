//importing required packages
var inquirer = require('inquirer');
var fs = require('fs');

//initializing the html buffer
var buf = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <title>Project Team</title>
  <style>
    .member
    {
      width: auto;
      background-color: rgb(192, 255, 234);
      padding: 25px;
      margin: 50px;
      border-radius: 25px;
      box-shadow: 0px 5px 5px;
    }
    .inner
    {
      width: auto;
      background-color: white;
      padding: 25px;
      border-radius: 25px;
    }
  </style>
</head>
<body>
  <div style="width: 100%; height: auto; text-align: center; background-color: rgb(192, 255, 234);">
    <h1>My Team</h1>
  </div>
  </br>
  <div class="container">
    <div class="row">`;
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
    //adds the sole manager to the project
    console.log("Responses logged, generating HTML");
    buf +=
    `<div class="col-sm member">
        <h3>${manager.name}</h3>
        <h4>Manager</h4>
        <div class="inner">
        ID: ${manager.ID}</br>
        Email: ${manager.email}</br>
        Office Number: ${manager.office}
        </div>
    </div>`;

    //for each engineer we create an html block
    engineers.forEach(engineer =>
    {
        buf +=
        `<div class="col-sm member">
        <h3>${engineer.name}</h3>
        <h4>Engineer</h4>
        <div class="inner">
        ID: ${engineer.ID}</br>
        Email: ${engineer.email}</br>
        Office Number: ${engineer.github}
        </div>
        </div>`;
    });

    //for each intern we create an html block
    interns.forEach(intern =>
    {
        buf +=
        `<div class="col-sm member">
        <h3>${intern.name}</h3>
        <h4>Intern</h4>
        <div class="inner">
        ID: ${intern.ID}</br>
        Email: ${intern.email}</br>
        Office Number: ${intern.school}
        </div>
        </div>`;
    });

    //closing out the html tags
    buf +=
    `</div>
    </div>
    </body>
    </html>`;

    //saving our buffer to the disk
    writeToFile("output.html", buf);
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

//the function to add an engineer
function addEngineer()
{
    inquirer.prompt(engineerQuestions)
    .then((answers) =>
    {
        newEngineer = {};
        newEngineer.name = answers.name;  
        newEngineer.ID = answers.ID;
        newEngineer.email = answers.email;
        newEngineer.github = answers.github;
        engineers.push(newEngineer);
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

//the function to add an intern
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
        interns.push(newIntern);
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

//the menu for adding team members, which we loop back around to after each member
function addMenu()
{
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selection',
                message: 'Would you like to add another employee?',
                choices: ['Add an Engineer', 'Add an Intern', 'Finished'],
            }
        ]).then((response) =>
        {
            if (response.selection == 'Add an Engineer') return addEngineer();
            else if (response.selection == 'Add an Intern') return addIntern();
            else if (response.selection == 'Finished') return buildHTML();
            else return console.log(selection);
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
            console.log('prompt cannot be rendered in the current environment.');
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