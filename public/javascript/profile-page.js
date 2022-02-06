
 //color picker
 $('#picker').on('input', () => {
    const color = $('#picker').val()
    $('body').css('background', `-webkit-linear-gradient(${color} 0%, #000000 100%)`);
    })

