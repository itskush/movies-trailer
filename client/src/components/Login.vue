<template>
  <div>
    <!--    <b-button type="is-dark" @click="showModal">Dark</b-button>-->
    <button class="button-30" role="button" @click="showModal">Login/Sign Up</button>
    <b-modal v-model="showForm" :width="600" scroll="keep">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <div class="main-container" id="main-container" v-bind:class="{ 'right-panel-active': showPanel }">
              <div class="form-container sign-up-container">
                <form @submit.prevent>
                  <h1>Create Account</h1>
                  <span>Use your email for registration</span>
                  <input type="email" placeholder="Email" v-model="reg_email" />
                  <input type="text" placeholder="Username" v-model="reg_username"/>
                  <input type="password" placeholder="Password" v-model="reg_password" />
                  <button @click="signmeup">Sign Up</button>
                </form>
              </div>
              <div class="form-container sign-in-container">
                <form @submit.prevent>
                  <h1>Sign in</h1>
                  <span>Use your account</span>
                  <input type="email" placeholder="Email" v-model="email" />
                  <input type="password" placeholder="Password"  v-model="password" />
                  <!--                  <a href="#">Forgot your password?</a>-->
                  <button @click="logmein">Sign In</button>
                </form>
              </div>
              <div class="overlay-container">
                <div class="overlay">
                  <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button @click="showSignUp" class="ghost" id="signIn">Sign In</button>
                  </div>
                  <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <button @click="showSignUp" class="ghost" id="signUp">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  name: "Login",
  data(){
    return {
      showForm: false,
      showPanel: false,
      username: '',
      password: '',
      reg_username: '',
      reg_password: '',
      reg_email: '',
      msg: '',
      email: ''
    }
  },
  components:{
  },
  methods:{
    showModal(){
      this.showForm = !this.showForm;
    },
    showSignUp(){
      this.showPanel = !this.showPanel
    },
    async logmein() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthService.login(credentials);
        this.msg = response.msg;
        const token = response.token;
        const user = response.user;
        await this.$store.dispatch('login', {token, user});
        this.$buefy.toast.open({
          message: this.msg,
          type: 'is-success'
        })
        this.$eventBus.emit('logRequest');
        this.$eventBus.$emit('tokenvalid');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
    async signmeup() {
      try {
        const credentials = {
          username: this.reg_username,
          password: this.reg_password,
          email: this.reg_email
        };
        const response = await AuthService.signUp(credentials);
        console.log(response)
        this.msg = response.msg;
        this.$buefy.toast.open({
          message: 'Account added!',
          type: 'is-success'
        })
        this.$eventBus.$emit('logRequest');
        this.$eventBus.$emit('tokenvalid');
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
.card, .card-content{
  background: #000;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #000;
  background-color: #000;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.main-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.main-container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.main-container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.main-container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #000;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.main-container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.main-container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.main-container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}


.card-content{
  padding: 0 !important;
}


/* CSS */
.button-30 {
  align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.button-30:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-30:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

.button-30:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}
</style>
