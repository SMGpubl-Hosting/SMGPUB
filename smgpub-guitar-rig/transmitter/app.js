let socket;
let audioContext;

document.getElementById("startBtn").onclick = start;

async function start(){
  try{
    updateStatus("Connecting...");

    socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => updateStatus("Connected ✅");
    socket.onerror = () => updateStatus("Connection Error ❌");

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });

    audioContext = new AudioContext({ latencyHint: "interactive" });

    await audioContext.audioWorklet.addModule("processor.js");

    const source = audioContext.createMediaStreamSource(stream);
    const worklet = new AudioWorkletNode(audioContext, "audio-processor");

    const gainNode = audioContext.createGain();
    const distortion = audioContext.createWaveShaper();

    function makeDistortion(amount){
      let n = 44100;
      let curve = new Float32Array(n);
      for(let i=0;i<n;i++){
        let x = i*2/n -1;
        curve[i] = (Math.PI + amount)*x/(Math.PI + amount*Math.abs(x));
      }
      return curve;
    }

    distortion.curve = makeDistortion(200);

    // UI Controls
    document.getElementById("gain").oninput = e=>{
      gainNode.gain.value = parseFloat(e.target.value);
    };

    document.getElementById("dist").oninput = e=>{
      distortion.curve = makeDistortion(parseFloat(e.target.value));
    };

    // Send audio to server
    worklet.port.onmessage = e=>{
      if(socket.readyState === 1){
        socket.send(e.data);
      }
    };

    // Chain
    source.connect(gainNode);
    gainNode.connect(distortion);
    distortion.connect(worklet);

    updateStatus("Streaming 🎸");

  } catch(err){
    console.error(err);
    updateStatus("Error starting audio ❌");
  }
}

function updateStatus(msg){
  document.getElementById("status").innerText = "Status: " + msg;
}
