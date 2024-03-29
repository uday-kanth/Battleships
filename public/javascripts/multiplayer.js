

document.addEventListener('DOMContentLoaded', () => {

  $("#exit").on('click',()=>{
    console.log('exit button')
    window.location.href = '/dashboard';
  });


  $("#sendMessageBtn").on("click",()=>{
    console.log("chat btn")

    let message=$("#message")
    console.log(message.val())

    message.val('');

  })



  $("#copyRoomCode").click(function() {
    var roomCode = $("#roomCode").text();
    var textarea = $("<textarea>")
        .val(roomCode)
        .appendTo("body")
        .select();
    document.execCommand("copy");
    textarea.remove();
    alert("Room code copied to clipboard: " + roomCode);
});






$("#sendEmailBtn").on('click',function(){
  const email = $("#emailInput").val();
  console.log(email)
  const data = {
      email,
      roomCode,
      username

    };

  fetch('/shareroom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('Email sent successfully!');
      } else {
        alert('Failed to send email.');
      }
    })
    .catch(error => {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    });


});








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
  let enemyusername='enemy'
  let winner="";
  let userconnected=true;
  let enemeyconnected=false;
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



function checkFriend(){
  console.log("temp")
  fetch(`/friends/checkFriend?enemyusername=${encodeURIComponent(enemyusername)}`)
  .then(response => {
    if (response.ok) {
      
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then((data) => {
    // Handle the data received from the server
    //console.log('Received data:', data);
    if(data.check){
      $(".addFriend").hide();
    }
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
}

 







  

  // Select Player Mode
  function startMultiPlayer() {
    const socket = io({
      query: {
          roomCode: roomCode
      }
  });

    // Get your player number
    socket.on('player-number', num => {
      if (num === -1) {
        infoDisplay.innerHTML = "Sorry, the server is full"
      } else {
        playerNum = parseInt(num)
        if(playerNum === 1) currentPlayer = "enemy"

        console.log(playerNum)

        const info1=` 
        <div class="player p1" style="font-weight: bold; color: green;">
        ${username}
        <div class="connected">Connected</div>
        <div class="ready">Ready</div>

      </div>
      
      <div class="player p2" >
        <div id="p2">${enemyusername}</div>
        <div class="connected">Connected</div>
        <div class="ready">Ready</div>
        <button type="button" class="btn btn-success addFriend">+</button>
      </div>`
      
      const info2=` 
      <div class="player p2" style="font-weight: bold; color: green;">
      ${username}
      <div class="connected">Connected</div>
      <div class="ready">Ready</div>
    </div>
      <div class="player p1">
        <div  id='p1' >${enemyusername}</div>
      <div class="connected">Connected</div>
      <div class="ready">Ready</div>
      <button type="button" class="btn btn-success addFriend">+</button>
    </div>
    `

    if(playerNum===0){
      $("#playerinfo").html(info1);
    }
    else{
      $("#playerinfo").html(info2);
      socket.emit('i-am-player-2',username);
    }
    $(".addFriend").on('click',()=>{
      console.log("addfriend")
  
  
      const data={
        enemyusername
      }
  
  
    fetch('/friends/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert('friend added successfully!');
        $(".addFriend").hide();
      } else {
        alert('Failed to send friend request.');
      }
    })
    .catch(error => {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request.');
    });
  
  
  
  
    })

        // Get other player status
        socket.emit('check-players')
        
      }
    })

    socket.on('i-am-player-2',(player2)=>{
      $("#p2").text(player2)
      console.log(player2)
      enemeyconnected=true;
      enemyusername=player2
      checkFriend();
      socket.emit('i-am-player-1',username);

    })

    socket.on('i-am-player-1',(player1)=>{
      console.log(player1)
      enemeyconnected=true;
      enemyusername=player1
      checkFriend();
      $("#p1").text(player1)
    })

    // Another player has connected or disconnected
    socket.on('player-connection', num => {
      console.log(`Player number ${num} has connected or disconnected`);
      enemeyconnected=false;
      playerConnectedOrDisconnected(num,false);
      gameOver();
      displayWinner();
    })

    // On enemy ready
    socket.on('enemy-ready', num => {
      enemyReady = true
      playerReady(num)
      if (ready) {
        playGameMulti(socket)
        setupButtons.style.display = 'none'
      }
    })

    // Check player status
    socket.on('check-players', players => {
      players.forEach((p, i) => {
        if(p.connected)
        { playerConnectedOrDisconnected(i,p.connected);
          //console.log(i+"check-player")
        }
        if(p.ready) {
          console.log(`${p} + ${p.ready}`)
          playerReady(i)
          if(i !== playerReady) enemyReady = true
        }
      })
    })
 
    // On Timeout
    socket.on('timeout', () => {
      infoDisplay.innerHTML = 'You have reached the 10 minute limit'
    })

    // Ready button click
    startButton.addEventListener('click', () => {
      if(allShipsPlaced) playGameMulti(socket)
      else infoDisplay.innerHTML = "Please place all ships"
    })

    // Setup event listeners for firing
    computerSquares.forEach(square => {
      square.addEventListener('click', () => {
        if(currentPlayer === 'user' && ready && enemyReady) {
          shotFired = square.dataset.id
          socket.emit('fire', shotFired)
        }
      })
    })
 
    // On Fire Received
    socket.on('fire', id => {
      enemyGo(id)
      const square = userSquares[id]
      socket.emit('fire-reply', square.classList)
      playGameMulti(socket)
    })

    // On Fire Reply Received
    socket.on('fire-reply', classList => {
      revealSquare(classList)
      playGameMulti(socket)
    })

    function playerConnectedOrDisconnected(num,isConnected) {
      let player = `.p${parseInt(num) + 1}`
      console.log(player+"this is conneted or disconnected function")
      const ele=document.querySelector(`${player} .connected`).classList
      if(isConnected && ele.contains('active')){}
      else{
      ele.toggle('active');
      }
      



    }
  }



  
  createBoard(userGrid, userSquares)
  createBoard(computerGrid, computerSquares) 
  startMultiPlayer()

  function createBoard(grid, squares) {
    for (let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.dataset.id = i
      grid.appendChild(square)
      squares.push(square)
    }
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
    //console.log(draggedShip)
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



  let lastPlacedShipCoordinates=[]
  let lastPlacedShip=[]




  function dragDrop() {
    //console.log("hello")
    let shipNameWithLastId = draggedShip.lastChild.id
    let shipClass = shipNameWithLastId.slice(0, -2)
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
    let shipLastId = lastShipIndex + parseInt(this.dataset.id)
    let alreadyHaveShip=this.classList.contains("taken");
   // console.log(this.dataset)
    
    //console.log(shipLastId+" "+shipClass)
    const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
    const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
    
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * 0)

    

    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))

    shipLastId = shipLastId - selectedShipIndex
    let forVerticalshipLastId=parseInt(this.dataset.id)+(10*lastShipIndex)
    let coordinates=[]
    // console.log(shipLastId)

    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)&& !alreadyHaveShip) {
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
        let squareID=parseInt(this.dataset.id) - selectedShipIndex + i
        userSquares[squareID].classList.add('taken', 'horizontal', directionClass, shipClass);
        coordinates.push(squareID);
      }
    }
    else{return;}
    //As long as the index of the ship you are dragging is not in the newNotAllowedVertical array! This means that sometimes if you drag the ship by its
    //index-1 , index-2 and so on, the ship will rebound back to the displayGrid.
    } else if (!isHorizontal && !newNotAllowedVertical.includes(forVerticalshipLastId)&& !alreadyHaveShip) {
      for (let i=0; i < draggedShipLength; i++) {
          
        alreadyHaveShip=userSquares[parseInt(this.dataset.id)+ width*i].classList.contains('taken');
        if(alreadyHaveShip!==false){
          break;
        }
      }

      if(!alreadyHaveShip){
      for (let i=0; i < draggedShipLength; i++) {
        let directionClass
        if (i === 0) directionClass = 'start'
        if (i === draggedShipLength - 1) directionClass = 'end'
        let squareID=parseInt(this.dataset.id) + width*i
        userSquares[squareID].classList.add('taken', 'vertical', directionClass, shipClass)
        coordinates.push(squareID);
      }

    }
    else{return;}

    } else return

    displayGrid.removeChild(draggedShip)
    lastPlacedShipCoordinates.push(coordinates);
    lastPlacedShip.push(draggedShip);
    //console.log(lastPlacedShipCoordinates)



    if(!displayGrid.querySelector('.ship')) allShipsPlaced = true
  }

  function dragEnd(e) {
    e.preventDefault()
    console.log('dragend')
  }

  $("#undo").on('click',()=>{

    let coordinates=lastPlacedShipCoordinates.pop();
    if(coordinates){
      
    displayGrid.appendChild(lastPlacedShip.pop());
    coordinates.forEach(coord => {
      const square = userSquares[coord]; 
      square.classList.remove('taken', 'horizontal', 'vertical', 'start', 'end');
    });

    }

    




  });


  
 

  ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
  userSquares.forEach(square => square.addEventListener('dragover', dragOver))
  userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
  userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
  userSquares.forEach(square => square.addEventListener('drop', dragDrop))
  userSquares.forEach(square => square.addEventListener('dragend', dragEnd))


  function playGameMulti(socket) {
    setupButtons.style.display = 'none'
    console.log(isGameOver)
    if(isGameOver){ 
      displayWinner()
      
      return;}
    if(!ready) {
      socket.emit('player-ready')
      ready = true
      playerReady(playerNum)
    }

    if(enemyReady) {
      if(currentPlayer === 'user') {
        turnDisplay.innerHTML = 'Your Go'
      }
      if(currentPlayer === 'enemy') {
        turnDisplay.innerHTML = "Enemy's Go"
      }
    }
  }

  function playerReady(num) {
    let player = `.p${parseInt(num) + 1}`
    console.log(`inside playerReady ${player}`)
    document.querySelector(`${player} .ready`).classList.toggle('active')
  }


  



  let destroyerCount = 0
  let submarineCount = 0
  let cruiserCount = 0
  let battleshipCount = 0
  let carrierCount = 0




  let cpuDestroyerCount = 0
  let cpuSubmarineCount = 0
  let cpuCruiserCount = 0
  let cpuBattleshipCount = 0
  let cpuCarrierCount = 0


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
  }


  function enemyGo(square) {
    //if (gameMode === 'singlePlayer') square = Math.floor(Math.random() * userSquares.length)
    if (!userSquares[square].classList.contains('boom')) {
      const hit = userSquares[square].classList.contains('taken')
      userSquares[square].classList.add(hit ? 'boom' : 'miss')
      if (userSquares[square].classList.contains('destroyer')) cpuDestroyerCount++
      if (userSquares[square].classList.contains('submarine')) cpuSubmarineCount++
      if (userSquares[square].classList.contains('cruiser')) cpuCruiserCount++
      if (userSquares[square].classList.contains('battleship')) cpuBattleshipCount++
      if (userSquares[square].classList.contains('carrier')) cpuCarrierCount++
      checkForWins()
    } 
    //else if (gameMode === 'singlePlayer') enemyGo()
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
      //console.log((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount))
    if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
      //infoDisplay.innerHTML = "YOU WIN"
      winner=username
      gameOver()
    }
    if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
      //infoDisplay.innerHTML = `${enemyusername} WINS`;
      winner=enemyusername;
      gameOver()
    }
  }

  function gameOver() {
    isGameOver = true
  }



  function displayWinner(){
    console.log(enemyusername)


    let reason=`${winner} have destroyed all the Enemy ships`
    if(((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) < 50) && !enemeyconnected){
      winner=username
      reason=`${enemyusername} has left`
    }

    const data={
      winner,
      reason

    }
    const queryString = new URLSearchParams(data).toString();
  
    window.location.href = `/winner?${queryString}`;


  }



 
 










});





