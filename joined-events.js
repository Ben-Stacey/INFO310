/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */
"use strict";

var joinedEventsApi = `//localhost:8080/api/joinedevents`;
var getJoinedEventsApi = ({studentId}) => `//localhost:8080/api/joinedevents${studentId}`;
var deleteJoinedEventsApi = ({attendId}) => `//localhost:8080/api/joinedevents${attendId}`;

const app = Vue.createApp({

    data() {
        return {
            joinedEvents: new Array(),
            event: new Object()
        };
    },

    computed: Vuex.mapState({
        events: 'events',
        student: 'student'
    }),

    mounted() {
        this.getJoinedEvents(this.student.studentId);
    },

    methods: {

        deleteJoinedEvent(attendId) {
            if (confirm("Are you sure you no longer want to attend this event?\nClick OK to confirm or Cancel to return to your events.") === true) {
                 
                axios.delete(deleteJoinedEventsApi({'attendId': attendId}))
                        .then(response => {
                            this.event = response.data;
                            window.location.reload();
                        })
                        .catch(error => {
                            alert("An error occured - check the console for details");
                        });
            }
        },

        getJoinedEvents(studentId) {
            axios.get(getJoinedEventsApi({'studentId': studentId}))
                    .then(response => {
                        this.joinedEvents = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        }
    },

    mixins: [BasicAccessAuthentication]
});

// import authentication module
import { BasicAccessAuthentication } from './authentication.js';

// import navigation  menu component
import { NavigationMenu } from './navigation.js';
app.component('navigation', NavigationMenu);

import { dataStore } from './data-store.js'
        app.use(dataStore);

app.mount("#content");