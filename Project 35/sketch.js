//Create variables here
var dog, happyDog, databse, foodS, foodStock;
var dogimg, dogimg1;



function preload()
{
  //load images here

  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();
  console.log(database);
  
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale = 0.3;

  foodS = 0;

  // function call to access the value of food Stock

  getFoodStock();

}

function draw() {  
  background(46, 139, 87)

  
  //add styles here
  fill("white")
  textSize(13);
  text("Note: Press the Up arrow key to feed Drago Milk!", 120,120);

  if (keyDown(UP_ARROW))
  {
    console.log("foodS:" + foodS)
    writeStock(foodS);
    dog.addImage(dogimg1);
  }

  drawSprites();
}

function getFoodStock()
{
  var foodStockRef = database.ref('Food');
  foodStockRef.on("value", function(data){
    foodS = data.val();
  });
  console.log("foodS" + foodS)
}

function writeStock(x)
{
console.log("x" + x);

  if(x<=0)
  {
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}