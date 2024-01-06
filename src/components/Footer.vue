<template>
    <div class="bg-dark mt-6">
    <div class="container py-4">
      <div class="text-center">
        <h5 class="textstyle text-lg font-weight-bold mb-2 text-white">Owner Contacts</h5>
      </div>

      <div class="row mt-4">
        <div class="col-12 col-sm-6 col-lg-4 d-flex  justify-content-center ">
          <a href="tel:+212666666666" class="text-decoration-none text-light d-block mb-1">
            <i class="fas fa-phone-square mr-2"></i>
            <span class="ml-3">+212666666666</span>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
          <a href="mailto:test@gmail.com" class="text-decoration-none text-light d-block mb-1">
            <i class="fas fa-at"></i>
            <span class="ml-3">test@gmail.com</span>
          </a>
        </div>

        <div class="col-12 col-sm-6 col-lg-4 d-flex  justify-content-center ">
          <a href="https://www.linkedin.com/in/zaid-baarab-398256256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" class="text-decoration-none text-light d-block mb-1">
            <i class="fab fa-linkedin"></i>
            <span class="ml-3">  FSTE GI Students</span>
          </a>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-12 col-sm-6 text-center">
          <div class="text-white">
            <span>&copy;</span>
            <span class="text-white-500 font-weight-bold text-lg mx-1">C</span>
            <span class="text-white">2023</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer_comp",
};
</script>
<style>
.textstyle {
  color: #f3e2ba;
  font-family: Charlemagne Std;
}
</style>
