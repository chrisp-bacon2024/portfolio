const speedButton = document.getElementById('speedButton');
speedButton.addEventListener('click', ()=>{
    const speeds = [1,2,4,6,8, 10]
    let speed = parseInt(speedButton.textContent);
    speedButton.textContent = `${speeds[(speeds.indexOf(speed)+1)%speeds.length]}x`;
})