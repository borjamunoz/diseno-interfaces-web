var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

    context.lineWidth = 30;

    context.font = '24px Helvetica';
    context.fillText('Click en cualquier lugar para borrar', 100, 40);

    context.strokeRect(75, 100, 200, 200);
    context.fillRect(325, 100, 200, 200);

    context.canvas.onmousedown = function (e) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };