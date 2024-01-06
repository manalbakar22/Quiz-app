<template>
<div class="container mt-5">
    <h2 class="mb-3">Manage Your Quizzes</h2>

    <!-- Quiz List -->
    <div class="card mb-2" v-for="(quiz, index) in quizzes" :key="index">
      <div class="card-body d-flex justify-content-between">
        <div>
          <h5 class="card-title">{{ quiz.title }}</h5>
          <p class="card-text">{{ quiz.dateOfCreation }}</p>
        </div>
        <!-- Add more quiz details as needed -->

        <!-- Action Buttons -->
        <div class="d-flex justify-content-end">
          <!-- Update Quiz Button -->
          <button @click="previewMethod(index)"  class="btn btn-primary me-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M2 10.293L3.293 9 12 17.707V19h-1.293L2 11.293zM.854 9.146a1 1 0 0 1 0-1.415L6.436.854a1 1 0 0 1 1.415 0l8.293 8.293a1 1 0 0 1 0 1.415l-5.58 5.58a1 1 0 0 1-1.415 0L.854 10.56a1 1 0 0 1 0-1.414zM13 2h2v2h-2z"/>
            </svg>
            Previw
          </button>

          <!-- Delete Quiz Button -->
          <button class="btn btn-danger " @click="Delete(quiz)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M1.5 2.5a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zm2-2a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zm3-2a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zm9 2a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zM11 4v7.5a.5.5 0 0 1-1 0V4a.5.5 0 0 1 1 0z"/>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
    <!-- ==== delete confirmation modal ======-->
    <div class="modal fade" id="deleteConfirmationModal" ref="deleteConfirmationModal" tabindex="-1" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirm Deletion</h5>
            <button @click="cancelDeletion()" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this quiz?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancelDeletion()">Cancel</button>
            <button type="button" class="btn btn-danger" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <!-- ==== preview -->
    <div v-if="showPreview">
        <h2>Quiz Preview</h2>
        <i class="fa-solid fa-eye"></i>
        <!-- <pre>{{ quiz }}</pre> -->
        <div class="question bg-white p-3 border-bottom" v-for="(question, index) in previewQuestion" :key="index">
          <div >
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
</template>

<script>
import axios from 'axios'; 
import Cookies from 'js-cookie';
export default {
  name: "manage_comp",
  data() {
    return {
      quizzes: [],
      previewQuestion: [],
      currentUser:[],
      isLogged: false,
      quizToDelete:[],
      showPreview :false,
    };
  },
  methods: {
    // async Delete(quizId) {
    //   try {
    //     const response = await axios.delete(`http://localhost:5000/quiz/${quizId}/${this.currentUser.id}`);
    //     console.log(`Quiz with ID ${quizId} deleted. Response:`, response);
        
    //     // Optionally, you can update the quizzes array in the component to reflect the deletion
    //     this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
    //   } catch (error) {
    //     console.error(`Error deleting quiz with ID ${quizId}:`, error);
    //   }
    // },
    async Delete(quiz) {
      // Set the quiz to delete and open the confirmation modal
      this.quizToDelete = quiz;
      this.$refs.deleteConfirmationModal.classList.add('show');  // Add 'show' class to display the modal
      this.$refs.deleteConfirmationModal.style.display = 'block';  // Set display to 'block' to ensure modal is visible
    },

    async confirmDelete() {
      if (this.quizToDelete) {
        const quizId = this.quizToDelete.id;

        try {
          const response = await axios.delete(`http://localhost:5000/quiz/${quizId}/${this.currentUser.id}`);
          console.log(`Quiz with ID ${quizId} deleted. Response:`, response);
          
          // Optionally, you can update the quizzes array in the component to reflect the deletion
          this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId);
        } catch (error) {
          console.error(`Error deleting quiz with ID ${quizId}:`, error);
        } finally {
          // Close the confirmation modal and reset the quizToDelete variable
          this.$refs.deleteConfirmationModal.classList.remove('show');  // Remove 'show' class to hide the modal
          this.$refs.deleteConfirmationModal.style.display = 'none';  // Set display to 'none' to hide the modal
          this.quizToDelete = null;
        }
      }
    },

    cancelDeletion(){
      this.$refs.deleteConfirmationModal.classList.remove('show');
      this.$refs.deleteConfirmationModal.style.display = 'none';
    },

    previewMethod(index){
      console.log("index is "+index);
      this.previewQuestion =this.quizzes[index].quizData;
      console.log("previewQuestion="+this.previewQuestion);
      this.showPreview=true;
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
  },

  async mounted(){

      const currentUserCookie = Cookies.get('currentUser');

      // Parse the JSON data from the cookie and set it in the component's data
      if (currentUserCookie) {
        this.currentUser = JSON.parse(currentUserCookie);
        this.isLogged=true;
      }
      const creatorId = this.currentUser.id;
      console.log(creatorId);
      try {
        const response = await axios.get(`http://localhost:5000/quiz/creator/${creatorId}`);
        this.quizzes = response.data;
        
        // Handle the retrieved quizzes as needed
        console.log("Quizzes for Creator ID", creatorId, ":", this.quizzes);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
 
  }
}

</script>

<style>
</style>