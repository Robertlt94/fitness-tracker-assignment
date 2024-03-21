// Define an array to store exercise logs, with each session being an object that includes properties for the exercise type, name, and performance metrics (e.g., sets, reps, duration).
// Stretch Goal: 
// Optionally, include a structure to track daily or weekly goals and accomplishments.

let currentWeekLog = [
    // {
        // name: workoutType,
        // duration: workoutDuration,
        // intensity: workoutdifficulty
    // }
];


//Stretch Goal: Optionally, include a structure to track daily or weekly goals and accomplishments.
let lastWeekLog = [];

let lifeTimeStats = [];

// - Create at least two functions to calculate summaries from the exercise log data, such as total workouts completed, total duration, or calories burned (if applicable). Keep in mind these numbers will later need to be displayed.

function displayInfo(array, elementId) {
    let update = document.getElementById(elementId);
    update.innerHTML = '';
    array.forEach(arrayList => {
        let arrayListItem = document.createElement('li');
        arrayListItem.textContent = `${arrayList.name}: I did ${arrayList.sets} of ${arrayList.reps} in ${arrayList.duration} minutes. It was ${arrayList.difficulty}.`;
        update.appendChild(arrayListItem);
    });
}

function logWorkout() {
    let name = document.getElementById("workout-type-input").value;
    let duration = Number(document.getElementById("workout-duration-input").value);
    let difficulty;

    function findSelectedValue() {
        let radioCheck = document.getElementsByName('workout-difficulty');

        for(let i=0; i<radioCheck.length; i++){
            if(radioCheck[i].checked){
                difficulty = radioCheck[i].value;
            };
        };
    };
    findSelectedValue(difficulty);

    let sets = Number(document.getElementById("workout-sets-input").value);
    let reps = Number(document.getElementById("workout-reps-input").value);
    
    // console.log(name, duration, difficulty, sets, reps);

    let log = {
        name: name,
        duration: duration,
        difficulty: difficulty,
        sets: sets,
        reps: reps
    };

    currentWeekLog.push(log);
    // console.log(currentWeekLog);
    displayInfo(currentWeekLog, 'current-log')
}

// future function for user to add additional workouts to available selection
function addNewWorkout(){
    console.log("test");
}

// **Workout Summary Calculation:**
// Create at least two functions to calculate summaries from the exercise log data, such as total workouts completed, 
//total duration, or calories burned (if applicable). Keep in mind these numbers will later need to be displayed.

function calculateTotals(array){
    console.log(
        array.reduce((total, time) => total+time.duration, 0),
        array.reduce((total, time) => total+time.sets, 0),
        array.reduce((total, time) => total+time.reps, 0),
    );
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('log-this-workout').onclick = () => {
        logWorkout();
        calculateTotals(currentWeekLog);
    };
});