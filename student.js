"use strict";

var registerApi = '/api/register';
var studentApi = ({username}) => `/api/student/${username}`;

const app = Vue.createApp({

    data() {
        return {
            // models (comma separated key/value pairs)
            student: new Object(),
            signInMessage: "Please sign in to continue."
        };
    },

    mounted() {
    },

    methods: {
        // comma separated function declarations
        registerStudent() {
            // send POST request to service to create student
            axios.post(registerApi, this.student)
                    .then(() => {
                        window.location = 'index.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        signIn() {
            this.createToken(this.student.username, this.student.password);
            axios.get(studentApi({'username': this.student.username}))
                    .then(response => {
                        this.student = response.data;
                        dataStore.commit("signIn", this.student);
                        window.location = 'events.html';
                    })
                    .catch(error => {
                        this.signInMessage = 'Sign in failed. Check your username and password and try again.';
                    });
        }

        // moved staff stuff to staff.js

    },
    mixins: [BasicAccessAuthentication]

});


//import data store
import { dataStore } from './data-store.js'
        app.use(dataStore);

// import navigation  menu component
import { NavigationMenu } from './navigation.js';
app.component('navigation', NavigationMenu);

//// import authentication module
import { BasicAccessAuthentication } from './authentication.js';

// mount the page - this needs to be the last line in the file
app.mount("#content");