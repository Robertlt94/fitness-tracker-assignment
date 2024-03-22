// Define an array to store exercise logs, with each session being an object that includes properties for the exercise type, name, and performance metrics (e.g., sets, reps, duration).
// Stretch Goal: 
// Optionally, include a structure to track daily or weekly goals and accomplishments.

let currentWeekLog = [];

// **Workout Class:**
// Define a `Workout` class with properties for exercise details and a method to display a summary of the workout session. 
// This will be used to log exercise sessions.

class Workout{
    constructor(name, sets, reps, duration, difficulty, date = new Date()){
        this.workout = name;
        this.sets = sets;
        this.reps = reps;
        this.duration = duration;
        this.difficulty = difficulty;
        this.loggedOn = date;
    }
}

// Stretch Goal: Optionally, include a structure to track daily or weekly goals and accomplishments.
let lastWeekLog = [];

const monday = new Workout('Weight Lifting', '5', '10', '60', 'Hard');
const tuesday = new Workout('Weight Lifting', '5', '5', '60', 'Medium');
const wednesday = new Workout('Pushups', '10', '10', '60', 'Hard');
const thursday = new Workout('Jumping Jacks', '5', '10', '60', 'Easy');
const friday = new Workout('Pushups', '10', '10', '60', 'Hard');
const saturday = new Workout('Weight Lifting', '10', '5', '60', 'Medium');
const sunday = new Workout('Jumping Jacks', '5', '10', '60', 'Easy');

lastWeekLog.push(
    monday, tuesday, wednesday, thursday, friday, saturday, sunday
);

// function to determine if it's a new week. If week has not changed, do nothing. 
// If new week, clear data in lastWeekLog, concat currentWeekLog with lastWeekLog, clear currentWeekLog, append new info to DOM

let currentDate = new Date();
// console.log(currentDate);
let daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let currentDay = daysOfTheWeek[currentDate.getDay()];
console.log(currentDay);
// let currentWeek = currentDate.getWeekNumber();
// console.log(currentWeek);
let currentYear = currentDate.getFullYear();
console.log(currentYear)

// currently uses monday, but will need formulate a function to determine what 
// week it is within the year out of 52 and look for change between week value
function weekCheck(){
    if(currentDay === "Monday"){
        lastWeekLog = [];
        lastWeekLog = concat(currentWeekLog, lastWeekLog);
        currentWeekLog = [];
        logWorkout();
        displayInfo(lastWeekLog, 'last-week-stats');
        
    }else{
        logWorkout();
    };
}


let lifetimeStats = [];

// - Create at least two functions to calculate summaries from the exercise log data, such as total workouts completed, total duration, or calories burned (if applicable). Keep in mind these numbers will later need to be displayed.

function displayInfo(array, elementId) {
    let update = document.getElementById(elementId);
    update.innerHTML = '';
    array.forEach(arrayList => {
        let arrayListItem = document.createElement('li');
        arrayListItem.textContent = `${arrayList.workout}: I did ${arrayList.sets} sets of ${arrayList.reps} in ${arrayList.duration} minutes. Working out on ${arrayList.loggedOn} was ${arrayList.difficulty}.`;
        update.appendChild(arrayListItem);
    });
}

function displayTotals(array, elementId){
    console.log('in displayTotals')
    let update = document.getElementById(elementId);
    update.innerHTML = '';
    array.forEach(arrayList => {
        let arrayListItem = document.createElement('li');
        arrayListItem.textContent = `${arrayList.workout}: ${arrayList.total}`;
        update.appendChild(arrayListItem);
    });
}

function logWorkout() {
    let name = document.getElementById("workout-type-input").value;
    let sets = Number(document.getElementById("workout-sets-input").value);
    let reps = Number(document.getElementById("workout-reps-input").value);
    let duration = Number(document.getElementById("workout-duration-input").value);
    let difficulty;
    let date;

    function checkRadio(){
        let radioOptions = document.getElementsByName('workout-difficulty');
        for(let i=0; i<radioOptions.length; i++){
            if(radioOptions[i].checked){
                console.log(difficulty = radioOptions[i].value);
            };
        };
        console.log(difficulty);
    };
    checkRadio();
    
    // console.log(name, duration, difficulty, sets, reps);

    // let log = {
    //     name: name,
    //     duration: duration,
    //     difficulty: difficulty,
    //     sets: sets,
    //     reps: reps
    // };

    // since Workout class was introduced
    const log = new Workout(name, sets, reps, duration, difficulty, date);

    currentWeekLog.push(log);
    console.log(currentWeekLog);
    displayInfo(currentWeekLog, 'current-log');
    calculateTotals(name, sets, reps);
    console.log("fail");
}

// future function for user to add additional workouts to available selection
function addNewWorkout(){
    console.log("test");
}

// **Workout Summary Calculation:**
// Create at least two functions to calculate summaries from the exercise log data, such as total workouts completed, 
//total duration, or calories burned (if applicable). Keep in mind these numbers will later need to be displayed.

// total is not going to be inclusive of hard coded lastWeekStats since it relys on new information
// obtained from submitting new workout logs.
function calculateTotals(workout, sets, reps){
    let lifetimeLog = {
        workout: workout,
        total: sets * reps
    };
    if(lifetimeStats.length === 0){
        lifetimeStats.push(lifetimeLog);
        console.log(lifetimeStats);
    }else{
        for(i=0;i<lifetimeStats.length;i++){
            if(!(lifetimeStats[i].workout === lifetimeLog.workout)){
                lifetimeStats.push(lifetimeLog);
                console.log(lifetimeStats);
            }else if(lifetimeStats[i].workout === lifetimeLog.workout){
                lifetimeStats[i].total += lifetimeLog.total;
                console.log(lifetimeStats[i].total);
            };
        };
    };
    displayTotals(lifetimeStats, 'lifetime-totals');
};

document.addEventListener('DOMContentLoaded', () => {
    
    displayInfo(currentWeekLog, 'current-log');
    displayInfo(lastWeekLog, 'last-week-stats');
    displayTotals(lifetimeStats, 'lifetime-totals');

    document.getElementById('log-this-workout').onclick = () => {
        // weekCheck();
        logWorkout();
    };
});