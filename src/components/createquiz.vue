
<template>
    <div class="container mt-5">
      <div v-if="!isStartCreating" class="d-flex justify-content-center row">
        <div class="col-md-10 col-lg-10">
          <div class="border">
            <div class="question bg-white p-3 border-bottom">
              <div class="input-group mb-3">
                <span  class="input-group-text" id="basic-addon1">Quiz title</span>
                <input v-model="title" type="text" class="form-control" placeholder="title..." aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Creator Nickname</span>
                <input v-model="creatorUserName" type="text" class="form-control" placeholder="your Nickname..." aria-label="Username" aria-describedby="basic-addon1">
              </div>
              <div class="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>start</h4>
              </div>
              <button @click="startCreating" class="mx-5 btn btn-success" >Start Creating</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isStartCreating" class="d-flex justify-content-center row">
        <div class="col-md-10 col-lg-10">
          <div class="border">
            <div class="question bg-white p-3 border-bottom">
              <div class="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>My Quiz</h4>
              </div>
            </div>
            <div class="question bg-white p-3 border-bottom">             
                <div v-if="!finished" >
                  <div class="d-flex flex-row align-items-center question-title">                  
                      <div class="input-group mb-3">
                          <span class="input-group-text" id="inputGroup-sizing-default">Question</span>
                          <input placeholder="New question" required  v-model="currentQuestion.question"  type="text" id="question" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                          <!-- <input type="file" accept="image/*" @change="handleImageUpload" /> -->
                          <label for="imageInput" class="image-upload-label mx-5 my-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
                            <input type="file" id="imageInput" accept="image/*" @change="handleImageUpload" style="display: none;" />
                            <div v-if="badge" class="badge1">1</div>
                          </label>
                          <!-- audio test -->
                          <button @click="addAudioMethod" class="icon-button ">  
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                              <path d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/>
                            </svg>
                          </button>
                      </div>
                  </div>
                  <div v-if="addAudio">
                            <Audio_comp @base64Data="handleBase64AudioData"></Audio_comp>
                  </div>
                  <div class="ans ml-2">

                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Answer :</span>
                        <input required v-model="currentAnswer.text"  type="text" id="answer" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="New answer">
                    </div>
                    <div v-if="currentQuestion.question" class="question bg-white p-3 border-bottom">
                        <h5>{{currentAnswer.text}}</h5>
                      <div class="bg-success  text-white p-3">
                        <h5>{{currentQuestion.answers.length}} answers added</h5>
                      </div>  
                    </div>


                    <div class="mt-2 mx-2 form-check form-switch">
                        <input v-model="currentAnswer.correct" class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked>
                        <label class="form-check-label" for="flexSwitchCheckChecked">this answer is correct:</label>
                    </div>
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                      <button  class="mx-5 btn btn-success" @click="addAnswer">Add Answer</button>                   
                      <button class=" mr-4 btn btn-primary border-success align-items-center btn-success" type="button" @click="addQuestion">
                        Add Question<i class="fa fa-angle-right ml-2"></i>
                      </button>
                    </div>
                    <div>
                        <h2>Quiz Preview</h2>
                        <i class="fa-solid fa-eye"></i>
                        <!-- <pre>{{ quiz }}</pre> -->
                        <div class="question bg-white p-3 border-bottom" v-for="(question, index) in preview" :key="index">
                          <div v-if="!finished">
                            <div class="d-flex flex-row align-items-center question-title">
                              <div class="input-group mb-3">
                                <span class="input-group-text bg-warning" id="inputGroup-sizing-default ">Question</span>
                                <input v-model="question.question" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" :disabled="true">
                              </div>
                              <!-- display image of question -->
                              <div v-if="question.image_base64">
                                <img :src="decodeBase64Image(question.image_base64)" alt="Question Image" style="width: 300px; height: 300px;">
                              </div>
                            </div>
                            <div v-if="question.audio_base64" class="decoding s-flex align-items-center justify-content-between py-auto "  >
                              <button class="play_audio_btn " @click="decodeBase64ToAudio(question.audio_base64, index)"  :key="index">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                              </button>
                              <audio :ref="`decodedAudioPlayer_${index}`" controls :key="index"></audio>
                            </div>
                            <div class="ans ml-2" v-for="(answer, ansIndex) in question.answers" :key="ansIndex">
                              <div class="input-group mb-3">
                                <span class="input-group-text bg-secondary text-white" id="inputGroup-sizing-default">Answer N {{ansIndex}}:</span>
                                <input v-model="answer.text" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" :disabled="true">
                                <div class="mx-3" v-if="answer.correct">
                                  <img src="../../public/img/correct.png" alt="" style="width: 20px; height: 20px;">
                                </div> 
                                <div class="mx-3" v-else>
                                  <img src="../../public/img/false.png" alt="" style="width: 20px; height: 20px;">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>         
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
              <button class="btn btn-primary d-flex align-items-center btn-danger" type="button" @click="generateQuiz">
                <i class="fa fa-angle-left mt-1 mr-1"></i>&nbsp;Submit Quiz 
              </button>
          
            </div>
            <div v-if="quizId" class="alert alert-success mt-3 p-3">
              <h5>Your quiz is created successfully!</h5>
              <h5>the ID code of your quiz : <span class="badge bg-danger" ref="quizId"> {{ quizId}}</span></h5>
              <button  class="btn btn-primary btn-sm" title="Copy to Clipboard"  >
                <i class="fas fa-copy"></i> Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script >
import axios from 'axios';
import Audio_comp from '../components/audio.vue';
import Cookies from 'js-cookie';
export default{
  name: "createQuiz",
  components:{
    Audio_comp,
  },
     data(){
        
        return {
            currentUser: [],
            currentQuestion: { question: '', 
            answers: [], currentImage: null ,currentAudioBase64:null, },
            currentAnswer: { text: '', correct: false },
            isStartCreating:false,
            preview: [],
            title: '',
            creatorUserName: '',
            full_quiz_data: {
              quizData: [],
              creatorUserName: '',
              title: '',
              studentsList: [],
              creator_id:0,
            },
            quizId: 0,
            addAudio:false,
            decodedAudio: null,
            badge: false,
            
        }
    
    },
  methods:{

    addAnswer() {
      this.currentQuestion.answers.push({ ...this.currentAnswer });
      this.currentAnswer.text = '';
      this.currentAnswer.correct = false;
    },
    addQuestion() {
      const newQuestion = { ...this.currentQuestion, answers: [...this.currentQuestion.answers], image_base64: this.currentQuestion.currentImage, audio_base64: this.currentQuestion.currentAudioBase64 };
      this.preview.push(newQuestion);
      this.full_quiz_data.quizData.push({ ...newQuestion });
      this.currentQuestion.question = "";
      this.currentQuestion.answers = [];
      this.currentQuestion.currentImage = null;
      this.currentQuestion.currentAudioBase64 = null;
      console.log("full_quiz_data.quizData ="+ this.full_quiz_data.quizData);
      this.addAudio=false;
      this.badge=false;
    },
    generateQuiz() {
      this.full_quiz_data.title = this.title;
      this.full_quiz_data.creatorUserName = this.creatorUserName;
      this.full_quiz_data.studentsList = ["student1", "student2", "student3"];
      this.full_quiz_data.creator_id= this.currentUser.id;
      // You may want to remove any unnecessary properties in the final quiz_data
      this.full_quiz_data.quizData = this.full_quiz_data.quizData.map(({ question, answers, image_base64, audio_base64 }) => ({
        question,
        answers: answers.map(({ text, correct }) => ({ text, correct })), image_base64, audio_base64
      }));
      console.log(JSON.stringify(this.full_quiz_data, null, 2));

      axios.post('http://localhost:5000/quiz', this.full_quiz_data)
        .then(response => {
          console.log('Quiz submitted successfully:', response.data);
          this.quizId= response.data.id ;
        })
        .catch(error => {
          console.error('Error submitting quiz:', error);
          // Handle the error as needed
        });

    },

    startCreating(){
      this.isStartCreating=true;
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.currentQuestion.currentImage = e.target.result;
          console.log("image"+this.currentQuestion.currentImage);
        };
        reader.readAsDataURL(file);
        this.badge= true;
      }
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
    addAudioMethod(){
      this.addAudio = true;
    },
    handleBase64AudioData(base64Data){
      this.currentQuestion.currentAudioBase64=base64Data;
      console.log('Received base64Data in the parent:', base64Data)
    },
  
    decodeBase64ToAudio(base64Data, index) {
      if (base64Data) {
        const decodedAudioPlayer = this.$refs[`decodedAudioPlayer_${index}`][0];

        // Stop the currently playing audio before playing a new one
        this.stopDecodedAudio(decodedAudioPlayer);

        // Create a new Audio element and set its source to the decoded Base64 data
        const decodedAudio = new Audio(`data:audio/mp3;base64,${base64Data}`);
        decodedAudioPlayer.src = decodedAudio.src;

      
        decodedAudioPlayer.play();

        // Save the decoded audio element for later use
        this.decodedAudio = decodedAudio;
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

  mounted(){
       // Retrieve the "currentUser" cookie
       const currentUserCookie = Cookies.get('currentUser');

      // Parse the JSON data from the cookie and set it in the component's data
      if (currentUserCookie) {
        this.currentUser = JSON.parse(currentUserCookie);
        this.isLogged=true;
    }
  },

}
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
  margin-top: 10px;
}

.decoding audio {
  margin-top: 12px !important;
}
.icon-button {
    border: none;
    background: none;
    transform: scale(2);
    transition: transform 0.3s ease;
  }
.icon-button:hover{
  fill: blue;
}
.image-upload-label{
  transform: scale(2);
  transition: transform 0.3s ease;
}
.image-upload-label:hover{
  fill: blue;
  cursor: pointer;
}

.image-upload-label {
    position: relative;
    display: inline-block;
  }

  .badge1 {
    position: absolute;
    top: -50%;
    right: 50%;
    background-color: red; /* Choose your badge background color */
    color: white;
    border-radius: 50%;
    padding: 4px 8px;
    font-size: 12px;
  }
  .play_audio_btn{
    margin : 0 auto;
  }
</style>