// Time slot set-up
var daySchedule = [
    {
        id: "0",
        hour: "09:00",
        time: "09",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "1",
        hour: "10:00",
        time: "10",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "2",
        hour: "11:00",
        time: "11",
        meridiem: "AM",
        reminder: ""
    },
    {
        id: "3",
        hour: "12:00",
        time: "12",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "4",
        hour: "01:00",
        time: "13",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "5",
        hour: "02:00",
        time: "14",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "6",
        hour: "03:00",
        time: "15",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "7",
        hour: "04:00",
        time: "16",
        meridiem: "PM",
        reminder: ""
    },
    {
        id: "8",
        hour: "05:00",
        time: "17",
        meridiem: "PM",
        reminder: ""
    },
    
]

// Gets the data for the header
function headerDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentDate);
}

// Loads header date
headerDate();

// Creates the body 
daySchedule.forEach(function(currentHour) {
    
    // Creates the rows for the time blocks 
    var hourColumn = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourColumn);

    // Creates the time field
    var hourField = $("<div>")
        .text(`${currentHour.hour}${currentHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // Main Scheduler Function
    var hourSchedule = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var inputData = $("<textarea>");
    hourSchedule.append(inputData);
    inputData.attr("id", currentHour.id);
    if (currentHour.time < moment().format("HH")) {
        inputData.attr ({
            "class": "past", 
        })
    } else if (currentHour.time === moment().format("HH")) {
        inputData.attr({
            "class": "present"
        })
    } else if (currentHour.time > moment().format("HH")) {
        inputData.attr({
            "class": "future"
        })
    }

    // Creates the save button 
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var saveInput = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    saveInput.append(saveButton);
    hourColumn.append(hourField, hourSchedule, saveInput);
})


// localStorage Portion of The Code //

// Saves data to browser's localStorage
function saveReminders() {
    localStorage.setItem("daySchedule", JSON.stringify(daySchedule));
}

// Sets any saved data in localStorage to the current view
function displayReminders() {
    daySchedule.forEach(function (currentHour_2) {
        $(`#${currentHour_2.id}`).val(currentHour_2.reminder);
    })
}

// Views existing localStorage data 
function init() {
    var dayData = JSON.parse(localStorage.getItem("daySchedule"));

    if (dayData) {
        daySchedule = dayData;
    }

    saveReminders();
    displayReminders();
}

// Loads any existing localStorage elements
init();


// Saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".past, .present, .future").attr("id");
    daySchedule[saveIndex].reminder = $(this).siblings(".description").children(".past, .present, .future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})
