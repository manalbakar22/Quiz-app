<template>
  <div class="row home" >
    <div class="col-ms-8 col-md-8 col-lg-6 col-xl-6 mx-auto text-center" >
      <h1>Create an awesome quiz in minutes!</h1>
      <h3 class="mb-2">Quiz Maker is the easiest way to make quizzes FREE</h3> 
      <router-link
                  class=""
                  :to="{ name: 'quiz' }"
                  ><button class="button-28 mt-5" role="button">Get started</button>
      </router-link>
       
    </div>
  </div>
</template>

<script>
   import Cookies from 'js-cookie';
  export default {
      name: "home_comp",
      data(){
        return{
          isLogged:false,
          currentUser: [],
        }
      },

      methods:{

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

<style  scoped>
.home{
  background: linear-gradient(to bottom, #2323cf, #8A8AFF);
   color: white;
   height :70dvh;
}
.button-28 {
  appearance: none;
  background-color: transparent;
  border: 2px solid #1A1A1A;
  border-radius: 15px;
  box-sizing: border-box;
  color: #080808;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 60px;
  min-width: 0;
  outline: none;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button-28:disabled {
  pointer-events: none;
}

.button-28:hover {
  color: #fff;
  background-color: #1A1A1A;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}
/* test */
.home {
  background: linear-gradient(to bottom, #2323cf, #8A8AFF);
  color: white;
  height: 70vh;
  opacity: 0; /* Set initial opacity to 0 */
  animation: fadeIn 1.5s forwards; /* Apply the fadeIn animation */
}

@keyframes fadeIn {
  to {
    opacity: 1; /* Set opacity to 1 at the end of the animation */
  }
}
</style>
