<template>
    <div class="audio-recorder">
      <div class="controls">
        <button @click="startRecording" :disabled="isRecording">
            <i class="fas fa-microphone"></i> Start Recording
        </button>
        <button @click="stopRecording" :disabled="!isRecording">
          <i class="fas fa-stop"></i> Stop Recording
        </button>
      </div>
  
      <div class="audio-player">
        <audio ref="audioPlayer" controls></audio>
      </div>
  
      <!-- <div class="decoding">
        <button @click="decodeBase64ToAudio">
          <i class="fas fa-play"></i> Play Decoded Audio
        </button>
        <audio ref="decodedAudioPlayer" controls></audio>
      </div> -->
    </div>
  </template>
  
  <script>
  import '@fortawesome/fontawesome-free/css/all.css';
  export default {
    name: 'audio_comp',
    data() {
      return {
        isRecording: false,
        mediaRecorder: null,
        audioChunks: [],
        base64Data:null,
      };
    },
    methods: {
        async startRecording() {
            try {
            this.mediaRecorder= null;
            this.audioChunks= [];
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);
    
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                this.audioChunks.push(event.data);
                }
            };
    
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                this.$refs.audioPlayer.src = audioUrl;
                this.encodeAudioToBase64(audioBlob);
            };
    
            this.mediaRecorder.start();
            this.isRecording = true;
            } catch (error) {
            console.error('Error accessing microphone:', error);
            }
        },
        stopRecording() {
            if (this.mediaRecorder && this.isRecording) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            }
        },
        encodeAudioToBase64(audioBlob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                console.log('Base64 Audio Data:', base64Data);
                this.base64Data = base64Data;
                this.$emit('base64Data', base64Data);
            };
            reader.readAsDataURL(audioBlob);
        },

        decodeBase64ToAudio() {
            if (this.base64Data) {
                const decodedAudioPlayer = this.$refs.decodedAudioPlayer;

                // Create a new Audio element and set its source to the decoded Base64 data
                const decodedAudio = new Audio(`data:audio/mp3;base64,${this.base64Data}`);
                decodedAudioPlayer.src = decodedAudio.src;

                // Play the decoded audio
                decodedAudioPlayer.play();
            } else {
                console.log('No Base64 data available for decoding.');
            }
        },
    },
  };
  </script>
  
  <style scoped>
  .audio-recorder {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
  }
  
  .controls button, .decoding button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 5px;
  }
  
  .controls button[disabled], .decoding button[disabled] {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
  
  .audio-player, .decoding {
    margin-top: 20px;
  }
  
  .decoding audio {
    margin-top: 10px;
  }
  </style>