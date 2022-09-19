
var stopWatch = document.getElementById("countUp"); //stopwatch button
var initTimer = document.getElementById("countDown");//timer button
var start = document.getElementById("start");//start button
var stop = document.getElementById("stop");//stop button
var reset = document.getElementById("reset");//reset button
var timer = document.getElementById("timer");//visual timer
var insertHour = document.getElementById("hour");//number input for initTimer
var insertMin = document.getElementById("minute");//number input for initTimer
var circle = document.getElementsByClassName("circle").item(0);//circle div in html
var bar = document.getElementById("bar");//div for holding animation

var setTimer;//setInterval for timer
var createCircles;//setInterval for creating circles
var updateColor;//setInterval for calling change color function
var newColor;//setInterval for changing circle color

//values used for stopwatch
var milliSec = 0;
var sec = 0;
var min = 0;

//values used for setTimer
var descHour;
var descMin ;
var descSec = 60;

var newCircle = []; //stores all circles created in animation
var size; //size of newCircle
var circleCount = 244;
var evenRound = false; //used to switch between colors of circles after each revolution
var stopWatchCalled = false;
var count = 0; //checks for initial start

//sets initial circle's properties
circle.style.animationPlayState = "paused";
circle.style.background = "transparent";
circle.style.border = "solid 1px transparent";


//creates upto 80 circle elements and appends to bar div and pushed into newcircle array
function makeCircle(){

    if(newCircle.length !== 245) {

            let newC = document.createElement("div");
            newC.className = "circle";
            newC.style.marginTop = "-19.3%";
            newCircle.push(newC);
            bar.append(newC);
            size = newCircle.length;

       }
       else{
        newCircle.forEach((item,index)=>{
            newCircle[index].style.animationPlayState = "paused";
           })
       }

}

//rotates between 2 color choices for the circles; switches colors after each revolution (1 minute)
function changeColor() {
    let colArr = ["#eef6f1","#71a98b"];
    let bordArr = ["solid 1px #939FAE","solid 1px #eef6f1"];

    if(newCircle.length == 245) {

        clearInterval(updateColor); //stops constantly calling function from start
        newColor = setInterval(() => { //new interval that constantly checks if color needs updated
            if(evenRound === false) {
                //color option 1
                newCircle[circleCount].style.background = colArr[1];
                newCircle[circleCount].style.border = bordArr[1];

            }
            else if(evenRound === true){
                //color option 2
                newCircle[circleCount].style.background = colArr[0];
                newCircle[circleCount].style.border = bordArr[0];
            }
            circleCount--;
                console.log(circleCount);
          //  if(newCircle[1].style.background === newCircle[239].style.background){ //if beginning circle and ending circle are the same color (completed a rotation)
                if(circleCount == 35){ //if every circle is counted

                    circleCount = 244; //reset count of circles for next color
                    //switch colors
                    if(evenRound === false){
                        evenRound = true;
                    }
                    else{
                        evenRound = false;
                    }
                    //reset intervals
                    clearInterval(newColor);
                    updateColor = setInterval(changeColor);
                }

         //  }
        },275)
       size = newCircle.length - 1;
    }


}
stopWatch.addEventListener("click",()=>{
    stopWatchCalled = true;
    start.style.display = "inline";
    stop.style.display = "inline";
    reset.style.display = "inline";
    insertHour.style.display = "none";
    insertMin.style.display = "none";
    start.style.marginTop = "8.3%";
    start.style.marginLeft = "0%";


})
initTimer.addEventListener("click",()=>{
    start.style.display = "inline";
    stop.style.display = "inline";
    reset.style.display = "inline";
    insertHour.style.display = "inline";
    insertMin.style.display ="inline";
    insertHour.style.position = "absolute";
    insertMin.style.position = "absolute";

    start.style.marginTop = "8.3%";
    start.style.marginLeft = "0%";

    insertHour.style.marginTop = "15%";
    insertMin.style.marginTop = "15%";

    insertHour.style.marginLeft = "-35.7%";
    insertMin.style.marginLeft = "-20%";


})
start.addEventListener("click",()=> {
    if(stopWatchCalled === true) {
        var timer = setTimeout(() =>{
        setTimer = setInterval(timerFunc, 10); //call time function for stopwatch
    },1000);
    }
    else{
            count++; //checks for inital start click (if 1 then initially clicked)
            setTimer = setInterval(descendingTimerFunc, 1000); //call time function for timer
    }
   createCircles = setInterval(makeCircle); //call function to create circles
   updateColor = setInterval(changeColor); //call function to change color if needed


})

stop.addEventListener("click",()=>{

    //stops timer
    clearInterval(setTimer);
    //stops producing circles
    clearInterval(createCircles);
    //stops checking for color change
    clearInterval(newColor);

    //pauses animation for all circles
    newCircle.forEach((item,index)=>{
        newCircle[index].style.animationPlayState = "paused";
    })
})

reset.addEventListener("click",()=>{
    //reloads the page
    document.location.reload();

    // clearInterval(setTimer);
    // clearInterval(createCircles);
    // clearInterval(newColor);
    // clearInterval(updateColor);
    //
    // newCircle.forEach((item,index)=>{
    //     bar.removeChild(document.getElementsByClassName("circle").item(0));
    //     newCircle[index].style.animation = "none";
    //     setTimeout(()=>{
    //         if(circleCount >= index)
    //         newCircle[index].style.animation = "circle";
    //     })
    //     milliSec = 0;
    //     sec = 0;
    //     min = 0;
    //     timer.innerHTML = "00:00:00";
    // })
    // newCircle.forEach((item,index)=>{
    //     newCircle.splice(index);
    // })

})
//time function for Timer button
function descendingTimerFunc() {
    console.log(descHour, " ", descMin, " ", descSec, "\n");
    //when timer is finished, stop everything
    if (descSec === 0 && descMin === 0) {
        clearInterval(setTimer);
        clearInterval(createCircles);
        clearInterval(newColor);

        newCircle.forEach((item, index) => {
            newCircle[index].style.animationPlayState = "paused";
        })
    }

    //if start button is initially clicked, get input values and decrement where necessary (starts timer)
    if (count === 1) {
        descHour = insertHour.value;
        descMin = insertMin.value;

        descMin--;

        if (descMin === -1 && descHour > 0) {
            descMin = 59;
            descHour--;
        }
        count++; //ensures if statement isn't repeated
    }
    descSec--;

    if (descSec === 0 && descMin > 0) {
        descSec = 59;
        descMin--;
    }
    if (descSec === 0 && descMin === 0) {
        if (descHour > 0) {
            descSec = 59;
            descMin = 59;
            descHour--;
        }
    }

    //display time onto page

    if(descHour < 9 && descMin < 9 && descSec < 9) {
        timer.innerHTML = "0" + descHour + ":0" + descMin + ":0" + descSec;
    }
    else if(descHour < 9 && descMin < 9 && descSec > 9){
        timer.innerHTML = "0" + descHour + ":0" + descMin + ":" + descSec;
    }
    else if(descHour < 9 && descMin > 9 && descSec < 9) {
        timer.innerHTML = "0" + descHour + ":" + descMin + ":0" + descSec;
    }
    else if(descHour < 9 && descMin > 9 && descSec > 9){
        timer.innerHTML = "0" + descHour + ":" + descMin + ":" + descSec;
    }
    else if(descHour > 9 && descMin < 9 && descSec < 9) {
        timer.innerHTML = "" + descHour + ":0" + descMin + ":0" + descSec;
    }
    else if(descHour > 9 && descMin < 9 && descSec > 9){
        timer.innerHTML = "" + descHour + ":0" + descMin + ":" + descSec;
    }
    else if(descHour > 9 && descMin > 9 && descSec < 9) {
        timer.innerHTML = "" + descHour + ":" + descMin + ":0" + descSec;
    }
    else if(descHour > 9 && descMin > 9 && descSec > 9) {
        timer.innerHTML = "" + descHour + ":" + descMin + ":" + descSec;
    }




}
//time function for stopwatch button
function timerFunc(){
    milliSec++;

    timer.innerHTML = "0" + min + ":0" + sec + ":0" +milliSec;

    if(milliSec > 9){
        timer.innerHTML = "0" + min + ":0" + sec + ":" +milliSec;
    }
    if(sec > 9){
        timer.innerHTML = "0" + min + ":" + sec + ":0" +milliSec;
        if(milliSec > 9){
            timer.innerHTML = "0" + min + ":" + sec + ":" +milliSec;
        }

    }
    if(min > 9){
        timer.innerHTML = min + ":0" + sec + ":0" +milliSec;
        if(sec > 9){
            timer.innerHTML = min + ":" + sec + ":0" + milliSec;
        }
        if(milliSec > 9){
            timer.innerHTML = min + ":" + sec + ":" + milliSec;
        }
    }

    if(milliSec === 99){
        milliSec = 0;
        sec++;
    }
    if(sec === 60){
        sec = 0;
        min++;
    }


}
