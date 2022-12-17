const currentTime = moment().format('h a')
const [currentHourString, currentAmPm] = currentTime.split(' ')
const dateDisplay = document.getElementById("currentDay").textContent = moment().format("MMM Do YY"); //Displays date
const currentHour = parseInt(currentHourString)

const nine = document.getElementById("9-am")
const ten = document.getElementById("10-am")
const eleven = document.getElementById("11-am")
const twelve = document.getElementById("12-pm")
const one = document.getElementById("1-pm")
const two = document.getElementById("2-pm")
const three = document.getElementById("3-pm")
const four = document.getElementById("4-pm")
const five = document.getElementById("5-pm")
const hourBlocks = [nine, ten, eleven, twelve, one, two, three, four, five]

const saveButtons = document.getElementsByClassName('saveBtn')

for(const saveButton of saveButtons){
    saveButton.addEventListener('click', () => {
        const inputValue = saveButton.parentElement.children[1].value
        localStorage.setItem( saveButton.parentElement.id ,inputValue)
        
    })
}


function populateNotes() {
    const keys = Object.keys(localStorage)
    keys.forEach(key => console.log(localStorage[key]))

}

function convertTo24Hr (time, isAmOrPm) {
    if(time === 12 && isAmOrPm === 'pm') {
        return time
    }
    if(time === 12 && isAmOrPm === 'am') {
        return 0
    }
    return isAmOrPm === 'pm' ? time + 12 : time
}

function applyColor() {
    hourBlocks.forEach((hourBlock) => {
        const [blockHourString, blockAmPm] = hourBlock.id.split('-')
        const blockHour = parseInt(blockHourString)

        const currentTime24Hour = convertTo24Hr(currentHour, currentAmPm)
        const blockTime24Hour = convertTo24Hr(blockHour, blockAmPm)
        
        if(currentTime24Hour === blockTime24Hour){
            hourBlock.style.backgroundColor = 'red'
        }
        if(currentTime24Hour < blockTime24Hour){
            hourBlock.style.backgroundColor = 'green'
        }
        if(currentTime24Hour > blockTime24Hour){
            hourBlock.style.backgroundColor = 'grey'
        }

    })
}

populateNotes()
applyColor()



