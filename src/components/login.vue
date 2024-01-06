<template>
    <section  style="background-color: #9A616D;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="../../public/img/QCM.jpeg"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form v-if="login">

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <img src="../../public/img/soutien.jpg" alt="safer image" class="mx-3 img-fluid" style="height: 60px;">
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example17">Email address</label>
                    <input v-model="loginData.email" type="email" id="form2Example17" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example27">Password</label>
                    <input v-model="loginData.password" type="password" id="form2Example27" class="form-control form-control-lg" />
                  </div>

                  <div v-if="loginError" class="bg-danger  text-white p-3">
                        <h5>Invalid Email or Password !</h5>
                  </div>

                  <div class="pt-1 mb-4">
                    <button @click="loginMethod" class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                  </div>
                  
                  

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a @click="toggleLogin" href="#!"
                      style="color: #393f81; ">Register here</a></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

                <form v-else>
                  <h1>you are now in Register page </h1>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <img src="../../public/safer.png" alt="safer image" class="mx-3 img-fluid" style="height: 60px;">
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="form2Example17">Name :</label>
                    <input v-model="userData.name" type="text" id="name" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="Profession">Profession :</label>
                    <input v-model="userData.profession" type="text" id="Profession" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="country">Country :</label>
                    <input v-model="userData.country" type="text" id="country" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="age">Age :</label>
                    <input v-model="userData.age" type="number" id="age" class="form-control form-control-lg" />
                  </div>

                  <div class="form-outline mb-4">
                    <label class="form-label" for="role">Role : </label>
                    <select v-model="userData.role" id="role" name="role">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div class="form-outline mb-4">
                    <input  v-model="userData.email" type="email" id="form2Example17" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input v-model="userData.password" type="password" id="form2Example27" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button @click="registerUser" class="btn btn-dark btn-lg btn-block" type="button">Register</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="#!"
                      style="color: #393f81;">Register here</a></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';
import { useUserStore } from '@/stores/modules/auth';
import Cookies from 'js-cookie';
export default{
  name: "login_comp",
  data(){
    return{

        login: true,
        userData: {
          name: "",
          email: "",
          password: "",
          profession: "",
          country: "",
          age: null,
          role: "user"
        },
        loginData:{
          email: "",
          password: ""
        },
        loginError: false,       
    }
  },
  methods:{
    ...mapActions(useUserStore, ['logingIn']),
    toggleLogin(){
      this.login = !this.login;
    },
    show(){
      console.log(this.userData);
    },
    registerUser() {
      // Send the userData object to the server using Axios
      axios.post('http://localhost:5000/auth/register', this.userData)
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          // Handle errors if the registration fails
          console.error('Registration failed:', error.response.data);
        });
    },
    loginMethod(){
      axios.post('http://localhost:5000/auth/login', this.loginData)
      .then(response =>{
        const userData = response.data;
        // Set the "currentUser" cookie with the user data
        Cookies.set('currentUser', JSON.stringify(userData));
        this.logingIn();   
        this.$router.push('/');
      })        
      .catch(error => {
          // Handle errors if the registration fails
          this.loginError=true;
          console.error('Registration failed:', error.response.data);
      });

    }

  }
}
</script>

<style>
</style>