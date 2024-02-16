// $(document).ready(function(){



// const userGrid = $('.grid-user');
// const computerGrid = $('.grid-computer');
// const displayGrid = $('.grid-display');
// const ships = $('.ship');
// const destroyer = $('.destroyer-container');
// const submarine = $('.submarine-container');
// const cruiser = $('.cruiser-container');
// const battleship = $('.battleship-container');
// const carrier = $('.carrier-container');
// const startButton = $('#start');
// const rotateButton = $('#rotate');
// const turnDisplay = $('#whose-go');
// const infoDisplay = $('#info');
// const setupButtons = $('#setup-buttons');
// const userSquares = [];
// const computerSquares = [];
// let isHorizontal = true;
// let isGameOver = false;
// let currentPlayer = 'user';
// const width = 10;
// let playerNum = 0;
// let ready = false;
// let enemyReady = false;
// let allShipsPlaced = false;
// let shotFired = -1;


// const shipArray = [
//     {
//       name: 'destroyer',
//       directions: [
//         [0, 1],
//         [0, width]
//       ]
//     },
//     {
//       name: 'submarine',
//       directions: [
//         [0, 1, 2],
//         [0, width, width*2]
//       ]
//     },
//     {
//       name: 'cruiser',
//       directions: [
//         [0, 1, 2],
//         [0, width, width*2]
//       ]
//     },
//     {
//       name: 'battleship',
//       directions: [
//         [0, 1, 2, 3],
//         [0, width, width*2, width*3]
//       ]
//     },
//     {
//       name: 'carrier',
//       directions: [
//         [0, 1, 2, 3, 4],
//         [0, width, width*2, width*3, width*4]
//       ]
//     },
//   ]


 
  
  
//   function createBoard(grid, squares) {
//     for (let i = 0; i < width * width; i++) {
//       const square = $('<div></div>');
//       square.attr('data-id', i);
//       grid.append(square);
//       squares.push(square[0]);
//     }
//   }
  
//   createBoard(userGrid, userSquares);
//   createBoard(computerGrid, computerSquares);








  
// function generate(ship) {
//     //console.log("generator "+ship.name)
//     let randomDirection = Math.floor(Math.random() * ship.directions.length);
//     let current = ship.directions[randomDirection];
//     let direction = 0;

//     if (randomDirection === 0) direction = 1;
//     if (randomDirection === 1) direction = 10;

//     let randomStart = Math.abs(Math.floor(Math.random() * (computerSquares.length - (ship.directions[0].length * direction))));
//     //console.log("random start   " + randomStart + "   randomdirection   " + randomDirection)

//     const isBottom = randomStart >= 90 ? (randomDirection === 1 ? true : false) : false;

//     for (let i = 0; i < ship.directions[0].length; i++) {
//         const nextSquare = randomStart + i * direction;

//         // Check if the square is taken or at the right/left edge or at the bottom
//         if (
//             $(computerSquares[nextSquare]).hasClass('taken') ||
//             (direction === 1 && (nextSquare % width === width - 1 || nextSquare % width === 0)) ||
//             (isBottom && nextSquare >= 90)
//         ) {
           
//             generate(ship);
//             return;
//         }
//     }

//     // If all squares are available, mark them as taken
//     for (let i = 0; i < ship.directions[0].length; i++) {
//         const nextSquare = randomStart + i * direction;
//         $(computerSquares[nextSquare]).addClass('taken ' + ship.name);
//     }
// }

// function generateWithPromise(ship) {
//     return new Promise((resolve) => {
//         generate(ship);
//         resolve();
//     });
// }








// async function startSinglePlayer() {
//     //console.log(shipArray[0]);
    
//     await generateWithPromise(shipArray[0]);
//     await generateWithPromise(shipArray[1]);
//     await generateWithPromise(shipArray[2]);
//     await generateWithPromise(shipArray[3]);
//     await generateWithPromise(shipArray[4]);
    
//     startButton.on('click', () => {
//         setupButtons.css('display', 'none');
//         playGameSingle();
//     });



//     }
// startSinglePlayer();







//     function rotate() {
//         if (isHorizontal) {
//             $('.destroyer-container').toggleClass('destroyer-container-vertical');
//             $('.submarine-container').toggleClass('submarine-container-vertical');
//             $('.cruiser-container').toggleClass('cruiser-container-vertical');
//             $('.battleship-container').toggleClass('battleship-container-vertical');
//             $('.carrier-container').toggleClass('carrier-container-vertical');
//             isHorizontal = false;
//         } else {
//             $('.destroyer-container').toggleClass('destroyer-container-vertical');
//             $('.submarine-container').toggleClass('submarine-container-vertical');
//             $('.cruiser-container').toggleClass('cruiser-container-vertical');
//             $('.battleship-container').toggleClass('battleship-container-vertical');
//             $('.carrier-container').toggleClass('carrier-container-vertical');
//             isHorizontal = true;
//         }
//     }
//     $('#rotate').on('click', rotate);

//     let selectedShipNameWithIndex;
//     let draggedShip;
//     let draggedShipLength;

//     ships.on('dragstart', dragStart);
//     userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
//     userSquares.forEach(square => square.addEventListener('dragover', dragOver))
//     userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
//     userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
//     userSquares.forEach(square => square.addEventListener('drop', dragDrop))
//     userSquares.forEach(square => square.addEventListener('dragend', dragEnd))


// ships.on('mousedown', function(e) {
//     selectedShipNameWithIndex = e.target.id;
//    // console.log(e.target)
//   console.log(selectedShipNameWithIndex)
// });

// function dragStart() {
//   draggedShip = $(this);
//   draggedShipLength = $(this).children().length;
//  console.log(draggedShipLength)
// }

// function dragOver(e) {

//   e.preventDefault();
//   //console.log("over")
// }

// function dragEnter(e) {
//   e.preventDefault();
//   ///console.log("enter")
// }

// function dragLeave() {
//   // console.log('drag leave')
// }
// function dragEnd() {
//   // console.log('drag leave')
// }


// function dragDrop() {
//     console.log(draggedShip)
//     let shipNameWithLastId = draggedShip.lastChild.id
//     let shipClass = shipNameWithLastId.slice(0, -2)
//      console.log(shipClass)
//     let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
//     let shipLastId = lastShipIndex + parseInt(this.dataset.id)
//     console.log(shipLastId)
//     const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
//     const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
    
//     let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
//     let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)

//     selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

//     shipLastId = shipLastId - selectedShipIndex
//     // console.log(shipLastId)

//     if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
//       for (let i=0; i < draggedShipLength; i++) {
//         let directionClass
//         if (i === 0) directionClass = 'start'
//         if (i === draggedShipLength - 1) directionClass = 'end'
//         userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
//       }
//     //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
//     //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
//     } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
//       for (let i=0; i < draggedShipLength; i++) {
//         let directionClass
//         if (i === 0) directionClass = 'start'
//         if (i === draggedShipLength - 1) directionClass = 'end'
//         userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
//       }
//     } else return

//     displayGrid.removeChild(draggedShip)
//     if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
//   }





    
    
//     console.log("hello")









 

    
//   });



 

document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user')
    const computerGrid = document.querySelector('.grid-computer')
    const displayGrid = document.querySelector('.grid-display')
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')
    const startButton = document.querySelector('#start')
    const rotateButton = document.querySelector('#rotate')
    const turnDisplay = document.querySelector('#whose-go')
    const infoDisplay = document.querySelector('#info')
    const setupButtons = document.getElementById('setup-buttons')
    const userSquares = []
    const computerSquares = []
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'user'
    const width = 10
    let playerNum = 0
    let ready = false
    let enemyReady = false
    let allShipsPlaced = false
    let shotFired = -1
    //Ships
    const shipArray = [
      {
        name: 'destroyer',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'submarine',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'cruiser',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'battleship',
        directions: [
          [0, 1, 2, 3],
          [0, width, width*2, width*3]
        ]
      },
      {
        name: 'carrier',
        directions: [
          [0, 1, 2, 3, 4],
          [0, width, width*2, width*3, width*4]
        ]
      },
    ]
  
    
  
    // Select Player Mode
    
    function startSinglePlayer() {
      generate(shipArray[0])
      generate(shipArray[1])
      generate(shipArray[2])
      generate(shipArray[3])
      generate(shipArray[4])
  
      startButton.addEventListener('click', () => {
        setupButtons.style.display = 'none'
        playGameSingle()
      })
    }



    
    createBoard(userGrid, userSquares)
    createBoard(computerGrid, computerSquares)
    startSinglePlayer()
  
   
 
    function createBoard(grid, squares) {
      for (let i = 0; i < width*width; i++) {
        const square = document.createElement('div')



        //square.textContent=i






        square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)
      }
    }
  
    function generate(ship) {
      let randomDirection = Math.floor(Math.random() * ship.directions.length)
      let current = ship.directions[randomDirection]
      if (randomDirection === 0) direction = 1
      if (randomDirection === 1) direction = 10
      let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))
  
      const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'))
      const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
      const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)
  
      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name))
  
      else generate(ship)
    }
    
  
    //Rotate the ships
    function rotate() {
      if (isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = false
        // console.log(isHorizontal)
        return
      }
      if (!isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = true
        // console.log(isHorizontal)
        return
      }
    }
    rotateButton.addEventListener('click', rotate)
 
    $("#exit").on('click',()=>{
      console.log('exit button')
      window.location.href = '/dashboard';
    })
  
    //move around user ship
    
  
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength
  
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
      selectedShipNameWithIndex = e.target.id
      // console.log(selectedShipNameWithIndex)
    }))
  
    function dragStart() {
      draggedShip = this
      draggedShipLength = this.childNodes.length
      console.log(draggedShip)
    }
  
    function dragOver(e) {
      e.preventDefault()
      //console.log("over")
    }
  
    function dragEnter(e) {
      e.preventDefault()
      //console.log("enter")
    }
  
    function dragLeave(e) {
      e.preventDefault();
     // console.log('drag leave')
    }
  
    function dragDrop() {
      //console.log("hello")
      let shipNameWithLastId = draggedShip.lastChild.id
      let shipClass = shipNameWithLastId.slice(0, -2)
      let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
      let shipLastId = lastShipIndex + parseInt(this.dataset.id)
      let alreadyHaveShip=this.classList.contains("taken");
      //console.log(this) 
      //console.log(alreadyHaveShip)

      


      
      console.log(shipLastId+" "+shipClass)
      const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
      const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
      
      let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
      let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
  
      selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
  
      shipLastId = shipLastId - selectedShipIndex
      // console.log(shipLastId)
  
      if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {



        for (let i=0; i < draggedShipLength; i++) {
          alreadyHaveShip=userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.contains('taken');
          if(alreadyHaveShip){
            break;
          }
        }


        if(!alreadyHaveShip){


        for (let i=0; i < draggedShipLength; i++) {
          let directionClass
          if (i === 0) directionClass = 'start'
          if (i === draggedShipLength - 1) directionClass = 'end'
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', 'horizontal', directionClass, shipClass)
        }
      }
      else{return;}
      //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
      //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
      } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId) && !alreadyHaveShip) {

        for (let i=0; i < draggedShipLength; i++) {
          
          alreadyHaveShip=userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.contains('taken');
          if(alreadyHaveShip){
            break;
          }
        }



        if(!alreadyHaveShip){
        for (let i=0; i < draggedShipLength; i++) {
          let directionClass
          if (i === 0) directionClass = 'start'
          if (i === draggedShipLength - 1) directionClass = 'end'
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', 'vertical', directionClass, shipClass)
        }

      }
      else{return;}





      } else return
  
      displayGrid.removeChild(draggedShip)
      if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
    }
  
    function dragEnd(e) {
      e.preventDefault()
      console.log('dragend')
    }




    
   

    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))


  
    // Game Logic for Single Player
    function playGameSingle() {
      if (isGameOver) return
      if (currentPlayer === 'user') {
        turnDisplay.innerHTML = 'Your Go'
        computerSquares.forEach(square => square.addEventListener('click', function(e) {
          if(currentPlayer==='user'){
          shotFired = square.dataset.id
          revealSquare(square.classList)
          }
        }))
      }
      if (currentPlayer === 'enemy') {
        turnDisplay.innerHTML = 'Computers Go'
        setTimeout(enemyGo, 1000)
      }
    }
  
    let destroyerCount = 0
    let submarineCount = 0
    let cruiserCount = 0
    let battleshipCount = 0
    let carrierCount = 0
  
    function revealSquare(classList) {
      const enemySquare = computerGrid.querySelector(`div[data-id='${shotFired}']`)
      const obj = Object.values(classList)
      if (!enemySquare.classList.contains('boom') && currentPlayer === 'user' && !isGameOver) {
        if (obj.includes('destroyer')) destroyerCount++
        if (obj.includes('submarine')) submarineCount++
        if (obj.includes('cruiser')) cruiserCount++
        if (obj.includes('battleship')) battleshipCount++
        if (obj.includes('carrier')) carrierCount++
      }
      if (obj.includes('taken')) {
        enemySquare.classList.add('boom')
      } else {
        enemySquare.classList.add('miss')
      }
      checkForWins()
      currentPlayer = 'enemy'
      playGameSingle()
    }
  
    let cpuDestroyerCount = 0
    let cpuSubmarineCount = 0
    let cpuCruiserCount = 0
    let cpuBattleshipCount = 0
    let cpuCarrierCount = 0
  
  
    function enemyGo(square) {
      if (gameMode === 'singlePlayer') square = Math.floor(Math.random() * userSquares.length)
      if (!userSquares[square].classList.contains('boom')) {
        const hit = userSquares[square].classList.contains('taken')
        userSquares[square].classList.add(hit ? 'boom' : 'miss')
        if (userSquares[square].classList.contains('destroyer')) cpuDestroyerCount++
        if (userSquares[square].classList.contains('submarine')) cpuSubmarineCount++
        if (userSquares[square].classList.contains('cruiser')) cpuCruiserCount++
        if (userSquares[square].classList.contains('battleship')) cpuBattleshipCount++
        if (userSquares[square].classList.contains('carrier')) cpuCarrierCount++
        checkForWins()
      } else if (gameMode === 'singlePlayer') enemyGo()
      currentPlayer = 'user'
      turnDisplay.innerHTML = 'Your Go'
    }
  
    function checkForWins() {
      let enemy = 'computer'
      if(gameMode === 'multiPlayer') enemy = 'enemy'
      if (destroyerCount === 2) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s destroyer`
        destroyerCount = 10
      }
      if (submarineCount === 3) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s submarine`
        submarineCount = 10
      }
      if (cruiserCount === 3) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s cruiser`
        cruiserCount = 10
      }
      if (battleshipCount === 4) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s battleship`
        battleshipCount = 10
      }
      if (carrierCount === 5) {
        infoDisplay.innerHTML = `You sunk the ${enemy}'s carrier`
        carrierCount = 10
      }
      if (cpuDestroyerCount === 2) {
        infoDisplay.innerHTML = `${enemy} sunk your destroyer`
        cpuDestroyerCount = 10
      }
      if (cpuSubmarineCount === 3) {
        infoDisplay.innerHTML = `${enemy} sunk your submarine`
        cpuSubmarineCount = 10
      }
      if (cpuCruiserCount === 3) {
        infoDisplay.innerHTML = `${enemy} sunk your cruiser`
        cpuCruiserCount = 10
      }
      if (cpuBattleshipCount === 4) {
        infoDisplay.innerHTML = `${enemy} sunk your battleship`
        cpuBattleshipCount = 10
      }
      if (cpuCarrierCount === 5) {
        infoDisplay.innerHTML = `${enemy} sunk your carrier`
        cpuCarrierCount = 10
      }
        console.log((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount))
      if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "YOU WIN"
        gameOver()
      }
      if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
        infoDisplay.innerHTML = `${enemy.toUpperCase()} WINS`
        gameOver()
      }
    }
  
    function gameOver() {
      isGameOver = true
      startButton.removeEventListener('click', playGameSingle)
    }


    
    
    //console.log(ships)
    //console.log("this is usersquare" +userSquares)



  })
  




