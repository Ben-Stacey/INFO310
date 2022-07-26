/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

"use strict";

var staffApi = '//localhost:8080/api/staff';

const app = Vue.createApp({

    data() {
        return {
            // models (comma separated key/value pairs)
            staff: new Array(),
        };
    },

    mounted() {
        // semicolon separated statements
        this.getAllStaff();
    },

    // mixins:[NumberFormatter],

    methods: {
        // comma separated function declarations
        getAllStaff() {
            axios.get(staffApi)
                    .then(response => {
                        this.staff = response.data;
                        this.welcomeMessage = "Welcome user";
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        }
    }

});

// import navigation  menu component
import { NavigationMenu } from './navigation.js';
app.component('navigation', NavigationMenu);

import { dataStore } from './data-store.js'
        app.use(dataStore);

app.mount("#content");