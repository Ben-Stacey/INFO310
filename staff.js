"use strict";

var staffApi = '/api/newStaff';
var loginApi = ({username}) => `/api/staff/${username}`;

const app = Vue.createApp({

    data() {
        return {
            // models (comma separated key/value pairs)
            staff: new Object(),
            signInMessage: "Please sign in to continue."
        };
    },

    mounted() {
    },

    methods: {
        // comma separated function declarations       
        registerStaff() {
                    // send POST request to service to create stadd
                    axios.post(staffApi, this.staff)
                            .then(() => {
                                window.location = 'index.html';
                            })
                            .catch(error => {
                                console.error(error);
                                alert("An error occurred - check the console for details.");
                            });
        },
        
        signIn() {
            this.createToken(this.staff.username, this.staff.password);
            axios.get(loginApi({'username': this.staff.username}))
                    .then(response => {
                        this.staff = response.data;
                        dataStore.commit("staffSignIn", this.staff);
                        window.location = 'events.html';
                    })
                    .catch(error => {
                        this.signInMessage = 'Sign in failed.  Check your username and password and try again.';
                    });
        }
        

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