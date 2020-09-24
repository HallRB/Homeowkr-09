const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "repotitle",
      message: "What is your Repository Name?"
    },
    {
      type: "input",
      name: "summary",
      message: "What is a single sentance summary of your repo?"
    },
    {
      type: "input",
      name: "description",
      message: "Insert full description of your repo here:"
    },
    {
      type: "input",
      name: "TOC",
      message: "Insert your table of contents for your repo here:"
    },
    {
      type: "input",
      name: "install",
      message: "Insert full description of how to install your repo here:"
    },
    {
      type: "input",
      name: "Usage",
      message: "Insert usage instructions here:"
    },
    {
      type: "input",
      name: "License",
      message: "Insert licensing information here:"
    },
    {
      type: "input",
      name: "Contributing",
      message: "Insert contributing instructions here:"
    },
    {
      type: "input",
      name: "Tests",
      message: "Insert information on tests here:"
    },
    {
      type: "input",
      name: "faq1",
      message: "Name one frequently asked question"
    },
    {
      type: "input",
      name: "faq2",
      message: "Name a second frequently asked question (skip if none)"
    },
    {
      type: "input",
      name: "faq3",
      message: "Name a third frequently asked question (skip if none)"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4"> ${answers.repotitle}</h1>
    <p class="lead">${answers.summary}.</p>
    <h3>Description</h3>
        <ul class="list-group">
    <li class="list-group-item">${answers.description}</li>
    <h3>Table of Contents</h3>
       <ul class="list-group">
    <li class="list-group-item">${answers.TOC}</li>
    <h3>Installation</h3>
       <ul class="list-group">
    <li class="list-group-item">${answers.install}</li>
    <h3>Usage</h3>
    <ul class="list-group">
    <li class="list-group-item">${answers.Usage}</li>
    <h3>License</h3>
    <ul class="list-group">
    <li class="list-group-item">${answers.License}</li>
    <h3>Contributing</h3>
    <ul class="list-group">
    <li class="list-group-item">${answers.Contributing}</li>
    <h3>Tests</h3>
    <ul class="list-group">
    <li class="list-group-item">${answers.Usage}</li>
    <h3>Frequently Asked Questions</h3>
        <ul class="list-group">
    <li class="list-group-item">${answers.faq1}</li>
    <li class="list-group-item">${answers.faq2}</li>
    <li class="list-group-item">${answers.faq3}</li>
    <h3>Contact Info</h3>
        <ul class="list-group">
    <li class="list-group-item">${answers.email}</li>
    <li class="list-group-item">${answers.github}</li>
    <li class="list-group-item">${answers.linkedin}</li>
    <li class="list-group-item">
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });
