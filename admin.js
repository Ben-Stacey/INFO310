"use strict";

var registerApi = '/api/register';
var userApi = ({username}) => `/api/user/${username}`;
//var staffApi = ({username}) => `/api/staff/${username}`;

const app = Vue.createApp({

    data() {
        return {
            // models (comma separated key/value pairs)
            user: new Object(),
            admin: new Object(),
            signInMessage: "Please sign in to continue."
        };

    },

    mounted() {
        // semicolon separated statements
    },

    methods: {
        // comma separated function declarations
        registerAdmin() {
            // send POST request to service to create student
            axios.post(registerApi, this.admin)
                    .then(() => {
                        window.location = 'index.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        signIn() {
            this.createToken(this.user.username, this.user.password);
            axios.get(userApi({'username': this.user.username}))
                    .then(response => {
                        this.admin = response.data;
                        dataStore.commit("signIn", this.user);
                        window.location = 'events.html';
                    })
                    .catch(error => {
                        this.signInMessage = 'Sign in failed.  Check your username and password and try again.';
                    });
        }
    }
});
// import data store
//import { dataStore } from './data-store.js'
//        app.use(dataStore);

// import navigation  menu component
import { NavigationMenu } from './navigation.js';
app.component('navigation', NavigationMenu);

//// import authentication module
//import { BasicAccessAuthentication } from './authentication.js';

// mount the page - this needs to be the last line in the file
app.mount("#content");








//<!--<template>
//    <div>
       // <h1>Admin</h1>
     //   <p>This page can only be accessed by administrators.</p>
   //     <div>
 //           All users from secure (admin only) api end point:
         //   <ul v-if="users.length">
              //  <li v-for="user in users" :key="user.id">
            //        {//{user.firstName + ' ' + user.lastName}}
          //      </li>
        //    </ul>
      //  </div>
    //</div>
//</template>

//<script>
//import {// authenticationService, userService } from '@/_services';
//export default {//
//    data () {
//        return {
//            user: authenticationService.currentUserValue,
//            users: []
//        };
//    },
//    created () {
//        userService.getAll().then(users => this.users = users);
//    }
//};
//</script>-->