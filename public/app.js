// THIS IS THE CLIENT SIDE

const socket = io();
const miceDB = {};

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
    span.textContent = '🔥' + data.userID;
    miceDB[data.userID] = span;
    mouse = span;
    document.body.appendChild(span);
  }

  updatePos(mouse, data.coord);
});

// pop on click - receive
socket.on('delete', data => {
  $(`#${data}`).remove();
});

// delete socks that disconnected
socket.on('socket-disconnect', data => {
  miceDB[data].remove();
  delete miceDB[data];
});

function updatePos(element, coord) {
  element.style.top = coord.y + 'px';
  element.style.left = coord.x + 'px';
}