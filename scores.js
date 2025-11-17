"use strict";

const getElement = selector => document.querySelector(selector);


let students = [];

const displayScores = scores => {   
    const scoreList = getElement("#score_list");
    const filter = parseInt(getElement("#filter").value);
    const sort = getElement("#sort").value;
    const avgSpan = getElement("#avg");

    // filter scores
    let filtered = students.filter(student => student[2] >= filter);

    // sort filtered scores
    filtered.sort((a, b) => {
        if (sort === "fname") return a[0].localeCompare(b[0]);
        if (sort === "lname") return a[1].localeCompare(b[1]);
        if (sort === "score") return b[2] - a[2];
    });

    // get total of filtered scores and build display string
    let total = 0;
    let display = "";
    for (let s of filtered) {
        total += s[2];
        display += `${s[0]} ${s[1]}: ${s[2]}\n`;
    }

    // calculate the average 
    const avg = filtered.length > 0 ? (total / filtered.length).toFixed(2) : "0.00";

    // display 
    scoreList.value = display.trim();
    avgSpan.textContent = avg;
};

document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = getElement("#first_name");
    const lastNameInput = getElement("#last_name");
    const scoreInput = getElement("#score");
    
    getElement("#add_score").addEventListener("click", () => {   
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const scoreValue = parseFloat(scoreInput.value);
        students.push([ firstName, lastName, scoreValue ]);

        firstNameInput.value = "";
        lastNameInput.value = "";
        scoreInput.value = "";
        firstNameInput.focus();
        displayScores();
    });
    
    getElement("#clear_scores").addEventListener("click", () => {
        students = [];
        getElemetn("#score_list").value = "";
        getElement("#avg").textContent = "";
        console.log("Scores cleared");
    });

    getElement("#sort").addEventListener("change", displayScores);
    
    getElement("#filter").addEventListener("change", displayScores);

    // set focus on first text box on load
    getElement("#first_name").focus();
});