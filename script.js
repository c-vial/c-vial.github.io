/*
Author: Horace Vial
Date: 05/08/2026
Purpose: Display portfolio projects dynamically
*/

"use strict";

// modal window
document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("welcomeModal").style.display = "none";
});

// skills
var skills = ["HTML", "CSS", "JavaScript", "PHP", "SQL", "Java"];
var list = document.getElementById("skillsList");

for (var i = 0; i < skills.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = skills[i];
    list.appendChild(li);
}

// create custom project objects
var project1 = {
    title: "Digital Rolodex",
    summary: "A contact management project used to store and organize contact information.",
    image: "images/rolodex.jpg",
    link: "https://github.com/c-vial/DigitalRolodex"
};

var project2 = {
    title: "PHP Management System",
    summary: "A PHP project that uses pages and forms to manage information for a web application.",
    image: "images/php.jpg",
    link: "https://github.com/LawSwan/PHP-Management-System"
};

var project3 = {
    title: "PC Store Project",
    summary: "A shopping cart style project for viewing computer products and store information.",
    image: "images/shoppingcart.jpg",
    link: "https://github.com/c-vial/chases_pc_store"
};

var projectArray = [project1, project2, project3];

// store project objects in session storage
function storeProjectInfo() {
    sessionStorage.setItem("projects", JSON.stringify(projectArray));
}

// get project objects from session storage
function getProjectInfo() {
    var storedProjects = sessionStorage.getItem("projects");

    if (storedProjects) {
        return JSON.parse(storedProjects);
    }
    else {
        storeProjectInfo();
        return projectArray;
    }
}

// display project objects on the page
function renderProjects() {
    var projects = getProjectInfo();
    var projectSection = document.getElementById("projectSection");

    projectSection.innerHTML = "";
    document.getElementById("projectMessage").innerHTML = "";

    for (var j = 0; j < projects.length; j++) {
        var projectBox = document.createElement("div");
        var projectTitle = document.createElement("h3");
        var projectSummary = document.createElement("p");
        var projectLink = document.createElement("a");
        var projectImage = document.createElement("img");

        projectBox.className = "projectBox";
        projectTitle.innerHTML = projects[j].title;
        projectSummary.innerHTML = projects[j].summary;
        projectLink.href = projects[j].link;
        projectLink.target = "_blank";
        projectImage.src = projects[j].image;
        projectImage.alt = projects[j].title;

        projectLink.appendChild(projectImage);
        projectBox.appendChild(projectTitle);
        projectBox.appendChild(projectSummary);
        projectBox.appendChild(projectLink);
        projectSection.appendChild(projectBox);
    }
}

renderProjects();

// projects visibility
var projectCount = getProjectInfo().length;

if (projectCount < 3) {
    document.getElementById("university").style.display = "block";
}
else {
    document.getElementById("university").style.display = "none";
}

// modify existing elements
document.querySelector("#about").style.borderBottom = "2px solid gray";
document.getElementById("aboutText").style.fontSize = "18px";

// dark mode
var darkModeToggle = document.getElementById("darkMode");

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", function () {
    if (darkModeToggle.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", "enabled");
    }
    else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "disabled");
    }
});

// form submit with validation
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var messageText = document.getElementById("message").value;
    var message = document.getElementById("formMessage");

    // check empty fields
    if (name === "" || email === "" || subject === "" || messageText === "") {
        message.textContent = "Please fill out all fields.";
        return;
    }

    message.textContent = "Sending message...";

    setTimeout(function () {
        message.textContent = "Thank you, " + name + ", your message has been sent!";
    }, 2000);
});
