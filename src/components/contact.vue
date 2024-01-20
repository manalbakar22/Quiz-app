<template>
<div class="container">
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Contact Us </h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-12">
					<div class="wrapper">
						<div class="row mb-5">
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
			        			<span class="fa fa-map-marker"></span>
			        		</div>
			        		<div class="text">
				            <p><span>Address:</span> Errachidia, Maroc</p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
			        			<span class="fa fa-phone"></span>
			        		</div>
			        		<div class="text">
				            <p><span>Phone:</span> <a href="tel://1234567920">+212 656565656</a></p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
			        			<span class="fa fa-paper-plane"></span>
			        		</div>
			        		<div class="text">
				            <p><span>Email:</span> <a href="mailto:info@yoursite.com">Fste@gmail.com</a></p>
				          </div>
			          </div>
							</div>
							<div class="col-md-3">
								<div class="dbox w-100 text-center">
			        		<div class="icon d-flex align-items-center justify-content-center">
			        			<span class="fa fa-globe"></span>
			        		</div>
			        		<div class="text">
				            <p><span>Website</span> <a href="#">quiz.com</a></p>
				          </div>
			          </div>
							</div>
						</div>
						<div class="row no-gutters">
							<div class="col-md-7">
								<div class="contact-wrap w-100 p-md-5 p-4">
									<h3 class="mb-4">Contact Us</h3>
									<div id="form-message-warning" class="mb-4"></div> 
				      		<div id="form-message-success" class="mb-4">
				            Your message was sent, thank you!
				      		</div>
									<form id="contactForm" name="contactForm" class="contactForm">
										<div class="row">
											<div class="col-md-6">
												<div class="form-group">
													<label class="label" for="name">Full Name</label>
													<input type="text" class="form-control" name="name" id="name" placeholder="Name">
												</div>
											</div>
											<div class="col-md-6"> 
												<div class="form-group">
													<label class="label" for="email">Email Address</label>
													<input type="email" class="form-control" name="email" id="email" placeholder="Email">
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label class="label" for="subject">Subject</label>
													<input type="text" class="form-control" name="subject" id="subject" placeholder="Subject">
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label class="label" for="#">Message</label>
													<textarea name="message" class="form-control" id="message" cols="30" rows="4" placeholder="Message"></textarea>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<input type="submit" value="Send Message" class="btn btn-primary">
													<div class="submitting"></div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div class="col-md-5 d-flex align-items-stretch">
								<div class="info-wrap w-100 p-5 img" style="background-image: url(../../public/img/feedback.jpg);">
			          </div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
</template>
<script>
 export default {
    name:"contact_us"
 }



</script>

<style lang="scss" scoped> 

$font-primary: 'Poppins',Arial, sans-serif;
$primary: #46b5d1;
$black: black;
$white: white;
$success: rgb(153, 247, 153);
body{
	font-family: $font-primary;
	font-size: 16px;
	line-height: 1.8;
	font-weight: normal;
	background: #fafafa;
	color: lighten($black,40%);
}
a {
	transition: .3s all ease;
	color: $primary;
	&:hover, &:focus {
		text-decoration: none !important;
		outline: none !important;
		box-shadow: none;
	}
}
h1, h2, h3, h4, h5,
.h1, .h2, .h3, .h4, .h5 {
	line-height: 1.5;
	font-weight: 400;
	font-family: $font-primary;
	color: $black;
}

.bg-primary{
	background: $primary !important;
}

.ftco-section{
	padding: 7em 0;
}

.ftco-no-pt{
	padding-top: 0;
}
.ftco-no-pb{
	padding-bottom: 0;
}
//HEADING SECTION
.heading-section{
	font-size: 28px;
	color: $black;
}

//COVER BG
.img{
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
}

.form-control {
	height: 36px;
	background: $white;
	color: rgba(0,0,0,.8);
	font-size: 14px;
	border-radius: 2px;
	box-shadow: none !important;
	border: 1px solid rgba(0,0,0,.1);
	&::-webkit-input-placeholder { /* Chrome/Opera/Safari */
	  color: rgba(0,0,0,.3) !important;
	}
	&::-moz-placeholder { /* Firefox 19+ */
	  color: rgba(0,0,0,.3) !important;
	}
	&:-ms-input-placeholder { /* IE 0+ */
	  color: rgba(0,0,0,.3) !important;
	}
	&:-moz-placeholder { /* Firefox 18- */
	  color: rgba(0,0,0,.3) !important;
	}
	&:focus, &:active {
		border-color: $primary !important;
	}
}
textarea.form-control {
	height: inherit!important;
}


.wrapper{
	width: 100%;
}
.contact-wrap{
	background: $white;
}

.info-wrap{
	// @include media-breakpoint-down(sm){
	// 	height: 400px;
	// }
}

.dbox{
	width: 100%;
	margin-bottom: 25px;
	// @include media-breakpoint-down(sm){
	// 	margin-bottom: 25px !important;
	// 	padding: 0 20px;
	// }
	p{
		margin-bottom: 0;
		span{
			font-weight: 500;
			color: $black;
		}
		a{
			color: $primary;
		}
	}
	.icon{
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background: $primary;
		margin: 0 auto;
		margin-bottom: 20px;
		span{
			font-size: 20px;
			color: $white;
		}
	}
	.text{
		width: 100%;
	}
}

.btn {
	padding: 12px 16px;
	cursor: pointer;
	border-width: 1px;
	border-radius: 5px;
	font-size: 14px;
	font-weight: 400;
	-webkit-box-shadow: 0px 10px 20px -6px rgba(0,0,0,0.12);
	-moz-box-shadow: 0px 10px 20px -6px rgba(0,0,0,0.12);
	box-shadow: 0px 10px 20px -6px rgba(0,0,0,0.12);
	position: relative;
	margin-bottom: 20px;
	// @include transition(.3s);
	// &:hover, &:active, &:focus {
	// 	outline: none !important;
	// }
	&.btn-primary {
		background: $primary !important;
		border-color: $primary !important;
		color: $white;
		&:hover,&:focus{
			border-color: darken($primary,10%) !important;
			background: darken($primary,10%) !important;
		}
	}
}

.contactForm{
	.label{
		color: $black;
		text-transform: uppercase;
		font-size: 12px;
		font-weight: 600;
	}
	.form-control{
		border: none;
		border-bottom: 1px solid rgba(0,0,0,.1);
		padding: 0;
	}
}
// Forms style
#contactForm {
	.error {
		color: red;
		font-size: 12px;
	}
	.form-control {
		font-size: 16px;
	}
}
#message {
	resize: vertical;
}
#form-message-warning, #form-message-success {
	display: none;
}
#form-message-warning {
	color: red;
}
#form-message-success {
	color: $success;
	font-size: 18px;
	font-weight: 500;
}
.submitting {
	float: left;
	width: 100%;
	padding: 10px 0;
	display: none;
	font-size: 16px;
	font-weight: bold;
}
</style>
