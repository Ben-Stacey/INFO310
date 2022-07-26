"use strict";
var eventApi = '/api/events';


const app = Vue.createApp({

    data() {
        return {
            // models (comma separated key/value pairs)

        };
    },

    computed: Vuex.mapState({
        event: 'selectedProduct'
    }),

    mounted() {
        // semicolon separated statements


    },

    methods: {
        // comma separated function declarations

        
        }


});

/* other component imports go here */

// import data store
import { dataStore } from './data-store.js'
        app.use(dataStore);
//
//// import navigation  menu component
//import { NavigationMenu } from './navigation.js';
//app.component('navigation', NavigationMenu);
//
//import { NumberFormatter } from './number-formatter.js';
//
//// import authentication module
//import { BasicAccessAuthentication } from './authentication.js';

// mount the page - this needs to be the last line in the file
app.mount("#content");