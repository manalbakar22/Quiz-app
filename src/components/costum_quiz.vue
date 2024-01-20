<template>
    <div class="container mt-5">
        <form >
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select v-model="category" class="form-control" id="category" name="category">
                            <option value="linux">Linux</option>
                            <option value="DevOps">DevOps</option>
                            <option value="programming">Programming (PHP, JS, Python, etc.)</option>
                            <option value="cloud">Cloud</option>
                            <option value="docker">Docker</option>
                            <option value="kubernetes">Kubernetes</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="difficulty">Difficulty</label>
                        <select v-model="difficulty" class="form-control" id="difficulty" name="difficulty">
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <label for="numberOfQuestions">Number of Questions</label>
                        <input v-model="limit" type="number" class="form-control" id="numberOfQuestions" name="numberOfQuestions" placeholder="Enter the number of questions">
                    </div>
                </div>
            </div>
            <button @click.prevent="getQuiz()" class="btn btn-primary my-3">Get Quiz</button>
        </form>
    </div>
    <!-- ======= show exam ========= -->
    <div class="container mt-5">


        <!-- Show exam section -->
        <div v-if="customQuiz.length >= 0 && currentQuestion !== null">
            <div class="xol-ms-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 question bg-white p-3 border-bottom">
                <div class="d-flex flex-row align-items-center question-title border-bottom border-light">
                    <h3 class="mx-2 text-danger">Q {{ currentQuestionIndex + 1 }}  </h3>
                    <div class="ml-2">
                        <h5 class="mt-1" v-if="customQuiz[currentQuestionIndex].question">{{ customQuiz[currentQuestionIndex].question }}</h5>
                    </div>
                </div>
                <div v-if="customQuiz[currentQuestionIndex].answers">
                    <!-- <div class="ans ml-2" v-for="(answer, ansIndex) in currentQuestion.answers" :key="ansIndex"> -->
                    <div class="ans ml-2" >   
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_a !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_a" v-model="answer_a">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_a }}</span>
                        </label>
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_b !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_b" v-model="answer_b">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_b }}</span>
                        </label>
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_c !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_c" v-model="answer_c">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_c }}</span>
                        </label>
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_d !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_d" v-model="answer_d">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_d }}</span>
                        </label>
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_e !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_e" v-model="answer_e">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_e }}</span>
                        </label>
                        <label v-if="customQuiz[currentQuestionIndex].answers.answer_f !== null" class="radio">
                            <input type="checkbox" :name="`question_${currentQuestionIndex}`" :value="customQuiz[currentQuestionIndex].answers.answer_f" v-model="answer_f">
                            <span>{{ customQuiz[currentQuestionIndex].answers.answer_f }}</span>
                        </label>

                    </div>

                    <!-- <div class="ans ml-2" v-for="(answer, ansIndex) in customQuiz[currentQuestionIndex].answers" :key="ansIndex">
                        <label v-if="answer" class="radio">
                            <input v-if="answer" type="radio" :name="`question_${currentQuestionIndex}`" :value="answer" >
                            <span>{{ answer }}</span>
                        </label>
                        <label v-if="answer !== null" class="checkbox">
                            <input v-if="answer !== null" type="radio" :name="`question_${currentQuestionIndex}`" :value="true" :checked="answer === true">
                            <span>True</span>
                        </label>

                        <label v-if="answer !== null" class="checkbox">
                            <input v-if="answer !== null" type="radio" :name="`question_${currentQuestionIndex}`" :value="false" :checked="answer === false">
                            <span>False</span>
                        </label>-->
                    <!-- </div>  -->
                </div>
            </div>
        </div>

        <!-- Pagination buttons -->
        <div class="container"  v-if="customQuiz.length > 0 ">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                        <button class="btn btn-primary d-flex align-items-center btn-danger" type="button" @click="previousQuestion">
                            Previous
                        </button>
                        <button class="btn btn-primary border-success align-items-center btn-success mx-5" type="button" @click="nextQuestionAndCaptureAnswers">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Display final score -->
        <div v-if="finished">
            <h1>Your score is {{ userScore }}%</h1>
            <div class="mt-5">
                <!-- Additional content or actions for when the quiz is finished -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; 
export default{
    name:"random_quiz",
    data(){
        return{
            category: 'devops',
            difficulty: 'easy',
            limit: 10,
            customQuiz: [],
            finished:false,
            currentQuestionIndex: 0,
            currentQuestion: null,
            userScore: 0,
            questionGivenAnswers: [],
            answer_a: false,
            answer_b: false,
            answer_c: false,
            answer_d: false,
            answer_e: false,
            answer_f: false,


        }
    },

    methods:{
        async getQuiz() {
            try {
                const response = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=WT6FfLKvT5Jdb4UqW7SLTtvl4tWCo1U4CSoWzd96&category=${this.category}&limit=${this.limit}&difficulty=${this.difficulty}`);
                // console.log(response.data); // Handle the response data as needed
                this.customQuiz=Array.from(response.data);
                // console.log("correct_answers[]"+ this.customQuiz[0].correct_answers);

                this.loadCurrentQuestion();
            } catch (error) {
                console.error("Error fetching quiz:", error);
               
            }
        },
        loadCurrentQuestion() {
            this.currentQuestion = this.customQuiz[this.currentQuestionIndex];
        },

        nextQuestion() {
            if (this.currentQuestionIndex < this.customQuiz.length - 1) {
                this.currentQuestionIndex++;
                this.loadCurrentQuestion();
            }else{
                this.userScore=33;
                this.finished=true;
            }
        },

        nextQuestionAndCaptureAnswers() {
            this.userScore=0;
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_a_correct);
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_b_correct);
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_c_correct);
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_d_correct);
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_e_correct);
            console.log(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_f_correct);
            console.log(this.answer_a);
            console.log(this.answer_b);
            console.log(this.answer_c);
            console.log(this.answer_d);
            console.log(this.answer_e);
            console.log(this.answer_f);
            if(this.customQuiz[this.currentQuestionIndex].correct_answers.answer_a_correct===this.answer_a 
                && this.customQuiz[this.currentQuestionIndex].correct_answers.answer_b_correct===this.answer_b
                && this.customQuiz[this.currentQuestionIndex].correct_answers.answer_c_correct===this.answer_c 
                && this.customQuiz[this.currentQuestionIndex].correct_answers.answer_d_correct===this.answer_d 
                && this.customQuiz[this.currentQuestionIndex].correct_answers.answer_e_correct===this.answer_e 
                && this.customQuiz[this.currentQuestionIndex].correct_answers.answer_f_correct===this.answer_f 
                 ){
                    console.log("Cooorrect");
                    this.userScore+=1;
                 }else{
                    console.log("oops wrong answer");
                 }

            console.log("the index is still"+this.currentQuestionIndex)     
            
            this.resetCheckboxes();
            this.nextQuestion();
        },

        previousQuestion() {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.loadCurrentQuestion();
                this.resetCheckboxes();
            }
        },

        checkAnswers() {
    
        },

        resetCheckboxes() {
            this.answer_a = false;
            this.answer_b = false;
            this.answer_c = false;
            this.answer_d = false;
            this.answer_e = false;
            this.answer_f = false;
        },

    }





}

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

.ans label {
    display: block;
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