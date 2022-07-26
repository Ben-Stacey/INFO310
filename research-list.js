/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

"use strict";

var researchApi = '//localhost:8080/api/research';
var subjectApi = '//localhost:8080/api/subjects';
var subjectFilterApi = ({subject}) => `//localhost:8080/api/subjects/${subject}`;
var joinedEventsApi = `//localhost:8080/api/joinedEvents`;
var searchByIdApi = ({researchId}) => `//localhost:8080/api/research/${researchId}`;
var interestApi = '//localhost:8080/api/interest';
var yourResearchApi = ({studentId}) => `http://localhost:8080/api/research/student/${studentId}`;

class ResearchInterest {
    constructor(application, student, research) {
        this.application = application;
        this.student = student;
        this.research = research; 
    }
}

const app = Vue.createApp({
    data() {
        return {
            // an array of research objects
            researchList: new Array(),
            joinedEvents: new Array(),
            welcomeMessage: "",
            subjects: new Array(),

            // a singular research for editing, creating, , etc
            research: new Object(),
            
            yourResearchList: new Array()
            // singular researchInterest object
            
        };
    },

    computed: Vuex.mapState({
        researchToUpdate: 'selectedResearch',
        
        student: 'student',
        researchToApply: 'researchToApply'
    }),

    mounted() {
        this.getAllResearch();
        this.getAllSubjects();
        this.getAllYourResearch();

    },

    methods: {
        getAllResearch() {
            axios.get(researchApi)
                    .then(response => {
                        this.researchList = response.data;
                        this.welcomeMessage = "Welcome user";
                    })
                    .catch(error => {
                        console.error(error);
                        console.trace();
                        alert("An error occurred - check the console for details.");
                    });
        },
        
        getAllSubjects() {

            axios.get(subjectApi)
                    .then(response => {
                        this.subjects = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },

        filterBySubject(subject) {
            axios.get(subjectFilterApi({'subject': subject}))
                    .then(response => {
                        this.researchList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },
        createResearch() {
            // send POST request to service to create event
            axios.post(researchApi, this.research)
                    .then(() => {
                        window.location = 'research.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check the console for details.");
                    });

        },

        searchById(researchId) {
            axios.get(searchByIdApi({'researchId': researchId}))
                    .then(response => {
                        this.research = response.data;
                    })
                    .catch(error => {
                        alert("An error occured -  check the console for details");
                    });
        },

        deleteResearch(researchId) {
            if (confirm("Are you sure you want to delete this Research Project?\nClick OK to confirm or Cancel to return to Research Projects.") == true) {

                axios.delete(searchByIdApi({'researchId': researchId}))
                        .then(response => {
                            this.research = response.data;
                            window.location.reload();
                        })
                        .catch(error => {
                            alert("An error occured - check the console for details");
                        });
            }
        },

        goToEditResearch(research) {
            dataStore.commit("selectResearch", research);
            window.location = "editResearch.html";

        },

        editResearch() {
            axios.put(researchApi, this.researchToUpdate)
                    .then(() => {
                        window.location = 'research.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check the console for details.");
                    });
        },

        // join event via data-store: working
        joinEvent(research) {
            // dataStore.commit("joinEvent", new Event(event.eventId, event.eventName));
            dataStore.commit("joinEvent", research);
        },
        
        goToApply(research) {
            dataStore.commit("selectResearch", research);
            window.location = "applyResearch.html";

        },
        applyResearch(application) {
            let interest = new ResearchInterest(application, this.student, this.researchToUpdate);
            this.interest = interest;
            axios.post(interestApi, this.interest)
                    .then(() => {
                        window.location = "yourResearch.html"
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check console");
            });
        },
        
        getAllYourResearch() {
            let studentId = this.student.studentId;
            this.studentId = studentId;
            axios.get(yourResearchApi({'studentId': this.studentId}))
                    .then(response => {
                        this.yourResearchList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        console.trace();
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