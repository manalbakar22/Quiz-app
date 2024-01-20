<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">
    <img src="../../public/img/soutien.jpg" alt="safer image" class="mx-3 img-fluid" style="height: 45px;">
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="mx-2 nav-item active">
        <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'home' }"
                  >HOME
          </router-link>
      </li>
      <li @click="logOut" v-if="isLogged" class="mx-2 nav-item">
          <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'logout' }"
                  >LOG OUT
          </router-link>
      </li>   
      <li v-if="!isLogged" class="mx-2 nav-item">
          <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'login' }"
                  >LOGIN
          </router-link>
      </li>
      <li class="mx-2 nav-item">
          <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'quiz' }"
                  >TAKE QUIZ
          </router-link>
      </li>
      <li class="mx-2 nav-item">
          <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'createquiz' }"
                  >CREATE
          </router-link>
      </li>

      <li class="mx-2 nav-item">
        <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'manage' }"
                  >MANAGE
          </router-link>
      </li>
      <li class="mx-2 nav-item">
        <router-link
                  class="nav-link abril whitespace-nowrap"
                  :to="{ name: 'contact' }"
                  >CONTACT US
          </router-link>
      </li>
    </ul>

    
  </div>
</nav>

</div>
</template>

<script >
  import { useUserStore } from '@/stores/modules/auth';
  import { mapActions } from 'pinia';
  import axios from 'axios';
  import Cookies from 'js-cookie';

  export default{
  name: "Nav_bar",
  data(){
    return{ 
      isAdmin: false,
      userData: null,
      currentUser: [],
      isLogged: false,
    }

  },
  methods:{
    ...mapActions(useUserStore, ['signOut']),
    logOut(){
      axios.post('http://localhost:5000/auth/logout')
      .then(response =>{
        Cookies.remove('currentUser');
        console.log('Response:', response.data);
        this.signOut();
        this.$router.push('/login');
      })        
      .catch(error => {
          // Handle errors if the registration fails
          console.error('Registration failed:', error.response.data);
      });
    },

    async fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5000/auth/user', {
          withCredentials: true,
        });
        this.userData = response.data;
        console.log(this.userData);
      } catch (error) {
        console.error('Error in fetchUserData:', error);
      }
    }
  }, 

  mounted(){
       const currentUserCookie = Cookies.get('currentUser');

      // Parse the JSON data from the cookie and set it in the component's data
      if (currentUserCookie) {
        this.currentUser = JSON.parse(currentUserCookie);
        this.isLogged=true;
        console.log(this.isLogged);
    }
  },
}

</script>

<style scoped>
@font-face {
  font-family: "Abril";
  src: url("../essets/fonts/AbrilFatface-Regular.ttf") format("ttf");
  /* Add additional font formats if needed */
  font-weight: normal;
  font-style: normal;
}

.abril{
  font-family: "Abril", sans-serif;
}



/* Add specific styles for the SECURITY link */
.nav-item .nav-link.abril {
  color: #000; /* Set the desired color for the text */
}

/* If you have a hover effect on regular links, add it to router-links */
.nav-item .nav-link.abril:hover {
  text-decoration: underline; /* Set the desired hover effect */
}
</style>