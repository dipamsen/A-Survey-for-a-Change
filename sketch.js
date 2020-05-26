var gameState = 0;
var surveyorCount = 0;
var database;
var form;
var Ans1 = [];
var Ans2 = [];
var Ans3 = [];
var mail = [];
var names = [];
var myFont;
function preload(){
    myFont = loadFont('ChelseaMarket-Regular.ttf')
}

function setup() {
    database = firebase.database();
    createCanvas(600, 450);
    textAlign(CENTER, CENTER);
    textFont(myFont);
    textStyle(BOLD);
    fill(0);
    textSize(30)
;    database.ref('surveyorCount').on("value", (data) => {
        surveyorCount = data.val();
    });
    database.ref('mail').on("value", (data) => {
        mail = data.val();
    });
    database.ref('answer/ans1').on("value", (data) => {
        Ans1 = data.val();
    });database.ref('answer/ans2').on("value", (data) => {
        Ans2 = data.val();
    });database.ref('answer/ans3').on("value", (data) => {
        Ans3 = data.val();
    });
    database.ref('names').on("value", (data) => {
        names = data.val();
    });
    var title = createElement('h2');
    textAlign(CENTER, CENTER);
    title.html("A Survey for a Change!");
    title.position(150, 20);
    var label1 = createElement('p', "Name:");
    label1.position(60, 70);
    var label2 = createElement('p', "Email:");
    label2.position(250, 70);
    var input = createInput();
    input.position(115, 87);
    input.style('width', '100px');
    var input2 = createInput("", 'email');
    input2.position(308, 87);
    var q1 = createElement('p', "Q1. Do you think we need to have free lunch meals in <BR> our school canteen for the kids who are very poor?");
    q1.position(60, 130);
    q1.style('color', 'red');
    var q2 = createElement('p', "Q2. Would you be willing to contribute a small amount <BR> every month for such a program?");
    q2.position(60, 210);
    q2.style('color', 'red');
    var q3 = createElement('p', "Q3. How much per month would you be willing to pay?");
    q3.position(60, 290);
    q3.style('color', 'red');
    var r1 = createRadio(); r1.option('YES', 1); r1.option('NO', 2);
    r1.position(70, 195);
    var r2 = createRadio(); r2.option('YES', 1); r2.option('NO', 2);
    r2.position(70, 275);
    var r3 = createRadio(); r3.option('Less than Rs. 500', 1); r3.option('Rs. 500 - 1000', 2); r3.option('More than Rs. 1000', 3);
    r3.position(70, 335); r3.style('width', '300px');
    var play = createButton('Submit');
    play.position(240, 400);
    play.mousePressed(() => {
        label1.hide();label2.hide();input.hide();input2.hide();q1.hide(); q2.hide(); q3.hide();
        r1.hide();r2.hide();
        r3.hide();play.hide();
        var name = input.value();
        var email = input2.value();
        var a1 = r1.value(),
            a2 = r2.value(),
            a3 = r3.value();
        Ans1.push(a1);
        Ans2.push(a2);
        Ans3.push(a3);
        mail.push(email);
        names.push(name);
        surveyorCount++;
        database.ref('/').update({
            surveyorCount: surveyorCount,
            mail: mail,
            names: names
        });
        database.ref('/answer').update({
            ans1: Ans1,
            ans2: Ans2,
            ans3: Ans3,
        })
        text("Uploaded to Database Successfully", width/2, height/2);
    });
}
