class AudioProcessor extends AudioWorkletProcessor {

  process(inputs){
    const input = inputs[0];

    if(input.length > 0){
      const channel = input[0];

      // Convert Float32 → Int16 (efficient streaming)
      const int16Buffer = new Int16Array(channel.length);

      for(let i = 0; i < channel.length; i++){
        int16Buffer[i] = Math.max(-1, Math.min(1, channel[i])) * 32767;
      }

      this.port.postMessage(int16Buffer.buffer, [int16Buffer.buffer]);
    }

    return true;
  }
}

registerProcessor("audio-processor", AudioProcessor);
