// THIS IS THE CLIENT SIDE

const socket = io();

// mouse coordinates
$('.game-board').on('mousemove', e => {
  const data = {
    x: e.pageX,
    y: e.pageY,
  };
  socket.emit('coordinate', data);
});

socket.on('drawThis', data => {
  const newDiv = $('<div></div>')
    .addClass('circle')
    .css(`left`, data.x)
    .css('top', data.y);

  $('.game-board').append(newDiv);
});