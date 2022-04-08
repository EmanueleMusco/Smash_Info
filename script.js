const button5 = document.getElementById('button5');
const canvas = document.getElementById('canvas1');
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;
let k = 0;
let cur_time = 0;
let arr = [
    'audio/J. Cole - p r i d e . i s . t h e . d e v i l  feat. Lil Baby (Official Audio).mp3', 
    'audio/Paky - Vita Sbagliata .mp3', 
    'audio/Rhove - Cancelo.mp3'
];
c = 0;

button5.addEventListener('click', function(){
    c++;
    audio1.volume=0.5;
    if(c == 1){
        const audio1 = document.getElementById('audio1');
        let myaudio = document.getElementById("audio1")[0];
        audio1.src = play();
        const audioContext = new AudioContext();
        audio1.currentTime = cur_time;
        audio1.play();
        button5.innerHTML="Disattiva musica";
        audioSource = audioContext.createMediaElementSource(audio1);
        analyser = audioContext.createAnalyser();
        audioSource.connect(analyser);
        analyser.connect (audioContext.destination);
        analyser.fftSize = 256;
        const bufferLenght = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLenght );

        const barWidth = canvas.width/bufferLenght;
        let barHeight;
        let x;

        function animate(){
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(dataArray);
            drawVisualiser(bufferLenght, x, barWidth, barHeight, dataArray);
            requestAnimationFrame(animate);
        }
        animate();
    }else {
        audio1.pause()
        cur_time = audio1.currentTime;
        button5.innerHTML="Attiva Musica";
        c = 0;
    }

});


//funzione animazione canvas
function drawVisualiser(bufferLenght, x, barWidth, barHeight, dataArray){
for(let i = 0; i<bufferLenght; i++){
    barHeight = dataArray[i];
    const red = i * barHeight/20;
    const green = i * 6;
    const blue = barHeight/2;
    ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    x += barWidth;
    }
}

//ripetizione playlist
function play(){

    audio1.src = arr[k];
    return audio1.src
}

audio1.onended = function(){
    if(k != arr.length -1)
    {
        k++
        audio1.src = play()
        audio1.play();
    }else{
        k = 0
        audio1.src = play()
        audio1.play();
    }
};

//------------------//





