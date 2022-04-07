const button5 = document.getElementById('button5');
const canvas = document.getElementById('canvas1');
canvas.width= window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

c = 0;
button5.addEventListener('click', function(){
    c++;
    audio1.volume=0.5;
    if(c == 1){
        const audio1 = document.getElementById('audio1');
        audio1.src = 'audio/J. Cole - p r i d e . i s . t h e . d e v i l  feat. Lil Baby (Official Audio).mp3';
        const audioContext = new AudioContext();
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
            for(let i=0; i < bufferLenght; i++){
                barHeight = dataArray[i];
                ctx.fillStyle = 'greenyellow';
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth;
            }
            requestAnimationFrame(animate);
        }
        animate();
    }else {
        audio1.pause();
        button5.innerHTML="Attiva Musica"
        c = 0;
    }

});




