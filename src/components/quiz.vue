
<template>
  <div class="container  mt-5 mx-auto">
    <div class="row">
      <div class="col-ms-6 col-md-3 pl-5">
        <label  for="exampleInput">Quiz ID:</label>
      </div>
      <div class="col-ms-6 col-md-5">
        <input v-model="quiz_id" type="number" class="form-control" id="exampleInput" placeholder="Enter ID of your quiz ">
      </div>
      <div class="col-ms-6 col-md-4">
        <button @click="findOne" class="btn btn-primary">Pass quiz Now</button>
      </div>
    </div>
    <div class="col-md-12 col-lg-12">
        <div class="border w-100">
          <div class="question bg-white p-3 border-bottom">
            <div class="d-flex flex-row justify-content-between align-items-center mcq">
              <h4>MCQ Quiz</h4>
              <span>({{ currentQuestionIndex + 1 }} of {{ quizData.length }})</span>
            </div>
          </div>
          <div v-if="!finished && quizData.length > 0">
            <div class="xol-ms-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 question bg-white p-3 border-bottom">
              <div class="d-flex flex-row align-items-center question-title border-bottom border-light">
                  <h3 class="mx-2 text-danger">Q {{ currentQuestionIndex+1 }}  </h3>
                  
                  <div class="ml-2">
                      <h5 class="mt-1" v-if="currentQuestion">{{ currentQuestion.question }}</h5>
                      
                      <div v-if="currentQuestion && currentQuestion.image_base64">
                          <img :src="decodeBase64Image(currentQuestion.image_base64)" alt="Question Image" class="img-fluid" style="max-width: 300px; max-height: 300px;">
                      </div>
                      
                      <div v-if="currentQuestion && currentQuestion.audio_base64" class="decoding mt-2">
                          <!-- <button @click="decodeBase64ToAudio(currentQuestion.audio_base64, currentQuestionIndex)" class="btn btn-primary">
                              <i class="fas fa-play"></i> Play Audio
                          </button> -->
                          
                          <!-- <audio ref="AudioPlayer" controls></audio> -->
                          <audio ref="AudioPlayer" :src="decodeBase64ToAudio(currentQuestion.audio_base64, currentQuestionIndex)" controls></audio>
                      </div>
                  </div>
              </div>
              <div v-if="currentQuestion.answers">
                <div class="ans ml-2" v-for="(answer, ansIndex) in currentQuestion.answers" :key="ansIndex" 
                >
                  <label class="radio">
                    <input type="radio" :name="`question_${currentQuestionIndex}`" :value="answer.text" v-model="selectedAnswers[currentQuestionIndex]">
                    <span>{{ answer.text }}</span>
                  </label>
                </div>
             </div>
            </div>          
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                    <button class="btn btn-primary d-flex align-items-center btn-danger" type="button" @click="previousQuestion">
                      previous
                    </button>
                    <button class="btn btn-primary border-success align-items-center btn-success mx-5" type="button" @click="nextQuestion">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="finished">
            <h1>Your score is {{ userScore }}%</h1>
            <div class="mt-5">

            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "quiz_comp",
  data() {
    return {
      quizData: [],
      selectedAnswers: [],
      currentQuestionIndex: 0,
      finished: false,
      userScore: null,
      quiz_id:null ,
    };
  },

  // mounted() {
  //   // Make a GET request to fetch quiz data
  //   axios.get('http://localhost:5000/quiz/')
  //     .then(response => {
  //       // Extract the quizData array from the response
  //       const quizData = response.data[0].quizData;

  //       // Update the quizData property with the received data
  //       this.quizData = quizData;

  //       // Initialize selectedAnswers array with null values
  //       this.selectedAnswers = Array(quizData.length).fill(null);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching quiz data:', error);
  //     });
  // },

  methods: {
    nextQuestion() {
      if (this.currentQuestionIndex < this.quizData.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.finished = true;
        console.log(this.userScore);
      }
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    findOne() {
      console.log('Quiz ID:', this.quiz_id);
      const quizId = parseInt(this.quiz_id);
      axios.get(`http://localhost:5000/quiz/${quizId}`)
      .then(response => {
        if (response.status === 200) {
          this.quizData = Array.from(response.data.quizData);
          this.selectedAnswers = Array(response.data[0].quizData.length).fill(null);
          console.log(this.quizData);
        }
      })
       .catch(error => {
      console.error('Error fetching quiz data:', error);
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      }
    });
    },

    decodeBase64Image(base64) {
      const matches = base64.match(/^data:(.*?);base64,(.*)$/);
      
      if (!matches || matches.length !== 3) {
        // Invalid data URL
        return '';
      }

      const [, mimeType, imageData] = matches;

       return `data:${mimeType};base64,${imageData}`;
    },
    // decodeBase64Image(base64) {
    //   const matches = base64.match(/^data:(.*?);base64,(.*)$/);
      
    //   if (!matches || matches.length !== 3) {
    //     // Invalid data URL
    //     return '';
    //   }

    //   const [, mimeType, imageData] = matches;

    //    return `data:${mimeType};base64,${imageData}`;
    // },
    addAudioMethod(){
      this.addAudio = true;
    },
    handleBase64AudioData(base64Data){
      this.currentQuestion.currentAudioBase64=base64Data;
      console.log('Received base64Data in the parent:', base64Data)
    },
  
  decodeBase64ToAudio(base64Data) {
      if (base64Data) {
      const decodedAudioPlayer = this.$refs.AudioPlayer;

      this.stopDecodedAudio(decodedAudioPlayer);

      const src = `data:audio/mp3;base64,${base64Data}`;
       return src; 
      // Play the audio
      // decodedAudioPlayer.play();
    } else {
      console.log('No Base64 data available for decoding.');
    }
  },

      // Stop the currently playing audio
    stopDecodedAudio(decodedAudioPlayer) {
      if (decodedAudioPlayer) {
        decodedAudioPlayer.pause();
        decodedAudioPlayer.currentTime = 0;
      }
    },

  },

  computed: {
    totalQuestions() {
      return this.quizData.length;
    },
    correctAnswers() {
      return this.quizData.filter((question, index) => {
        return this.selectedAnswers[index] === question.answers.find((answer) => answer.correct).text;
      }).length;
    },
    currentQuestion() {
      return this.quizData.length > 0 ? this.quizData[this.currentQuestionIndex] : null;
    },
  },

  watch: {
    finished: function (newVal) {
      if (newVal) {
        // Calculate the user's score when the test is finished
        this.userScore = Math.round((this.correctAnswers / this.totalQuestions) * 100);
        console.log(this.userScore);
      }
    },
  },
};
</script>

<style scoped>
    body{
    background-color:#eee;
}

label.radio {
  cursor: pointer;
}

label.radio input {
  position: absolute;
  top: 0; 
  left: 0;
  visibility: hidden;
  pointer-events: none;
}

label.radio span {
  padding: 4px 0px;
  border: 1px solid red;
  display: inline-block;
  color: red;
  width: 300px;
  text-align: center;
  border-radius: 3px;
  margin-top: 7px;
  text-transform: uppercase;
}

label.radio input:checked + span {
  border-color: red;
  background-color: rgb(94, 83, 155);
  color: #fff;
}

.ans {
  margin-left: 36px !important;
  width:auto !important;
}

.btn:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.btn:active {
  outline: 0 !important;
  box-shadow: none !important;
}
</style>