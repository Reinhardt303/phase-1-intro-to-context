// Your code here

function createEmployeeRecord(array) {
    let recordArray = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return recordArray
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord)
}

function createRecordObj(getType, timeStamp) {
    return {type: getType, date: timeStamp.slice(0,10), hour: parseInt(timeStamp.slice(-4))}
}

function createTimeInEvent(recordObj, timeStamp) {
    recordObj.timeInEvents.push(createRecordObj("TimeIn", timeStamp))
    return recordObj
}

function createTimeOutEvent(recordObj, timeStamp){
    recordObj.timeOutEvents.push(createRecordObj("TimeOut", timeStamp))
    return recordObj
}

function hoursWorkedOnDate(recordObj, timeStamp) {
    let timeIn = recordObj.timeInEvents.find((d) => d.date === timeStamp).hour
    let timeOut = recordObj.timeOutEvents.find((d) => d.date === timeStamp).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(recordObj, timeStamp) {
    let wages = recordObj.payPerHour * hoursWorkedOnDate(recordObj, timeStamp)
    return wages 
}

function allWagesFor(recordObj) {
    let totalWages = recordObj.timeInEvents.map((day) => {return wagesEarnedOnDate(recordObj, day.date)})
    return totalWages.reduce((acc, cv) => acc + cv)
}


function calculatePayroll(arrayOfArrays) {
    let totalPay = (arrayOfArrays.map((employee) => {return allWagesFor(employee)}))
    return totalPay.reduce((acc, cv) => acc + cv)
}