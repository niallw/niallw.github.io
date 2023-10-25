// var arr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

// function getRandomImage() {
//   var index = Math.floor(Math.random() * arr.length);
//   return arr[index];
// }

// $("#div").hover(
//   function() {
//     var image = getRandomImage();
//     $("#img").attr("src", image);
//     console.log(image);
//   });

var images = [
    "img/profile-fun1.png",
    "img/profile-fun2.png",
    "img/profile-fun3.png",
    "img/profile-fun4.png",
    "img/profile-fun5.png",
    "img/profile-fun6.png",
    "img/profile-fun7.png",
    "img/profile-fun8.png",
    "img/profile-fun9.png",
    "img/profile-fun10.png",
    "img/profile-fun11.png",
    "img/profile-fun12.png",
    "img/profile-fun14.png",
    "img/profile-fun15.png",
    "img/profile-fun16.png",
    "img/profile-fun17.png",
    "img/profile-fun18.png",
    "img/profile-fun19.png"
];

function getRandomImage(event) {
    var index = Math.floor(Math.random() * images.length);
    $("#me").attr("src", images[index]);

    // return images[index];
}

function setToDefault(){
    console.log("to default");
    $("#me").attr("src", "img/profile.png");
}

$("#profile-div").hover(
function() {
    var image = getRandomImage();
    $("#img").attr("src", image);
    // $("#me").attr("src", image);
    console.log(image);
});