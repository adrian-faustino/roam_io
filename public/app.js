// THIS IS THE CLIENT SIDE

const socket = io();
const miceDB = {};
const clientData = {}; // store user score here later?
let useScore = 0;

// generate circle provided by server
socket.on('generateCircle', data => {
  const newDiv = $('<div></div>')
    .addClass('circle')
    .attr('id', data.uID)
    .css(`left`, data.coord.x)
    .css('top', data.coord.y)
  $('.game-board').append(newDiv);

  // pop on click - transmit
  newDiv.on('click', () => {
    popAnimation(newDiv);
    socket.emit('delete', data.uID);
  });
});

// mouse coordinates
$('.game-board').on('mousemove', e => {
  const data = {
    x: e.pageX,
    y: e.pageY,
  };
  socket.emit('coordinate', data);
});

socket.on('drawThis', data => {
  let mouse = miceDB[data.userID];
  if (!mouse) {
    console.log('Created new!');
    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.style.pointerEvents = 'none';
    span.style.color = 'white';
    span.textContent = '🔥' + 'Anonymous';
    miceDB[data.userID] = span;
    mouse = span;
    document.body.appendChild(span);
  }

  updatePos(mouse, data.coord);
});

// pop on click - receive
socket.on('delete', data => {
  const targetDiv = $(`#${data}`);
  setTimeout(() => {
    $(targetDiv).remove();
  }, 500);
});

// delete socks that disconnected
socket.on('socket-disconnect', data => {
  miceDB[data].remove();
  delete miceDB[data];
});

// change mouse cursor name
$('.submit-button').on('click', e => {
  e.preventDefault();
  const userInput = $('#username').val();
  socket.emit('change-username', userInput);
});

socket.on('change-username', data => {
  console.log(miceDB);
  $(miceDB[data.userID])
    .text(`🔥 ${data.username}`)
    .css('color', 'white')
    .css('font-weight', 'bold')
});

// recieve game state
socket.on('game-state', data => {
  console.log('Game state: ', data);
  for (let clientID in data) {
    let li = document.getElementById(clientID);
    if (!li) {
      li = addEntry(clientID);
    }
    $(li).text(data[clientID].username);
  }
});

// helper functions
function updatePos(element, coord) {
    element.style.top = coord.y + 'px';
    element.style.left = coord.x + 'px';
}

function popAnimation(element) {
  $(element).addClass('pop');
}

function addEntry(clientID) {
  const newLi = $('<li></li>')
    .attr('id', clientID);

  $('.leaderboard').append(newLi);
  return newLi;
}