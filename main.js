//select the start button
document.querySelector(".control-buttons span").onclick = function () {
  //prompt window to ask for name
  let yourName = prompt("What Is Your Name?");
  //if name is empty
  if (yourName == null || yourName == "") {
    //set name to un known
    document.querySelector(".name span").innerHTML = "UnKnown";
  } else {
    //set name ro name
    document.querySelector(".name span").innerHTML = yourName;
  }
  //remove the prompt window
  document.querySelector(".control-buttons").remove();
};
//effect duration
let duration = 2000;

//select blocks container
let blocksContainer = document.querySelector(".memory-game-block");

//creat array from game blocks
let blocks = Array.from(blocksContainer.children);

//creat range fo keys
let orderRange = [...Array(blocks.length).keys()];

shaffle(orderRange);

//add order css property to game blocks
blocks.forEach((block, index) => {
  //add css order property
  block.style.order = orderRange[index];

  //add click event
  block.addEventListener("click", function () {
    //trigger the flipped function
    flipblock(block);
  });
});

//flipped function
function flipblock(selectedBlock) {
  //add class is-flipped
  selectedBlock.classList.add("is-flipped");

  //collect all flipped card
  let allflippedcards = blocks.filter((flippedblock) =>
    flippedblock.classList.contains("is-flipped")
  );

  //if thear is two selected blocks
  if (allflippedcards.length === 2) {
    //stop clicking function
    stopclicking();

    checkmachedblocks(allflippedcards[0], allflippedcards[1]);
  }
}

//stop clicking function
function stopclicking() {
  //add class no-clicking on blockscontainer
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    //remove no-clicking class from blockscontainer
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

//check mached blocks function
function checkmachedblocks(firstblock, secondblock) {
  let trieselement = document.querySelector(".tries span");

  if (firstblock.dataset.technology === secondblock.dataset.technology) {
    firstblock.classList.remove("is-flipped");
    secondblock.classList.remove("is-flipped");

    firstblock.classList.add("has-match");
    secondblock.classList.add("has-match");
  } else {
    trieselement.innerHTML = parseInt(trieselement.innerHTML) + 1;
    setTimeout(() => {
      firstblock.classList.remove("is-flipped");
      secondblock.classList.remove("is-flipped");
    }, duration);
  }
}
// shaffle function
function shaffle(Array) {
  let current = Array.length,
    temp,
    random;

  while (current > 0) {
    //get random number
    random = Math.floor(Math.random() * current);
    //decrease length by one
    current--;
    //save current element in stash
    temp = Array[current];
    //current element = random element
    Array[current] = Array[random];
    //random element = get element from stash
    Array[random] = temp;
  }
  return Array;
}
//the end
