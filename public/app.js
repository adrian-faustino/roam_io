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

// socket.on('drawThis', data => {
//   const newDiv = $('<div></div>')
//     .addClass('circle')
//     .css(`left`, data.x)
//     .css('top', data.y);

//   $('.game-board').append(newDiv);
// });

socket.on('generateCircle', data => {
  const newDiv = $('<div></div>')
    .addClass('circle')
    .attr('id', data.uID)
    .css(`left`, data.coord.x)
    .css('top', data.coord.y)
  $('.game-board').append(newDiv);

  newDiv.on('click', () => {
    socket.emit('delete', data.uID);
  });
});

socket.on('delete', data => {
  $(`#${data}`).remove();
});