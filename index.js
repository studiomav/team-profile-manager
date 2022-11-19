//importing required packages
var inquirer = require('inquirer');
var fs = require('fs');
var buf = '';
var entries = {};

function init()
{

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
        if (response.begin) return init();
        else return console.log('Goodbye.');
    });