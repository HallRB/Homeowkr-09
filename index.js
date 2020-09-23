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
      name: "install",
      message: "How do you install your repo?"
    },
    {
      type: "input",
      name: "description",
      message: "Describe in greater detail what your repo does"
    },
    {
      type: "input",
      name: "faq1",
      message: "Name one frequently asked question"
    },
    {
      type: "input",
      name: "faq2",
      message: "Name a second frequently asked question"
    },
    {
      type: "input",
      name: "faq3",
      message: "Name a third frequently asked question"
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
    <h3>How to install</h3>
       <ul class="list-group">
    <li class="list-group-item">${answers.install}</li>
    <h3>My Repo</h3>
        <ul class="list-group">
    <li class="list-group-item">${answers.description}</li>
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
