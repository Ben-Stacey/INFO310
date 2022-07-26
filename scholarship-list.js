/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

"use strict";

var scholarshipApi = '//localhost:8080/api/scholarship';
var applicationsApi = '//localhost:8080/api/scholarship';
var amountApi = '//localhost:8080/api/amount';
var amountFilterApi = ({amount}) => `//localhost:8080/api/amount/${amount}`;
var providerApi = '//localhost:8080/api/provider';
var providerFilterApi = ({provider}) => `//localhost:8080/api/provider/${provider}`;
var subjectApi = '//localhost:8080/api/subjects';
var subjectFilterApi = ({subject}) => `//localhost:8080/api/subjects/${subject}`;
var durationApi = '//localhost:8080/api/duration';
var durationFilterApi = ({duration}) => `//localhost:8080/api/duration/${duration}`;
var joinedEventsApi = `//localhost:8080/api/joinedEvents`;
var searchByIdApi = ({scholarshipId}) => `//localhost:8080/api/scholarship/${scholarshipId}`;
var applyApi = '//localhost:8080/api/apply';
var yourScholarshipApi = ({studentId}) => `http://localhost:8080/api/scholarship/student/${studentId}`;

class ScholarshipInterest {
    constructor(application, student, scholarship){
        this.application = application;
        this.student = student;
        this.scholarship = scholarship;
    }
}

const app = Vue.createApp({
    data() {
        return {
            // an array of scholarships
            scholarshipList: new Array(),
            applicationsList: new Array(),
            yourScholarshipList: new Array(),
            joinedEvents: new Array(),
            amount: new Array(),
            provider: new Array(),
            subject: new Array(),
            duration: new Array(),
            welcomeMessage: "",
            
            // singular scholar ship
            scholarship: new Object()
        };
    },

    computed: Vuex.mapState({
        scholarshipToUpdate: 'selectedScholarship',

        student: 'student',
        scholarshipToApply: 'scholarshipToApply'
    }),

    mounted() {
        this.getAllScholarships();
        this.getAllYourScholarships();
        this.getAllSubject();
        this.getAllDuration();
        this.getAllAmount();
        this.getAllProvider();
    },

    methods: {

        getAllScholarships() {

            axios.get(scholarshipApi)
                    .then(response => {
                        this.scholarshipList = response.data;
                        this.welcomeMessage = "Welcome user";
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },
        getAllApplications() {
                    axios.get(applicationsApi)
                            .then(response => {
                                this.applicationsList = response.data;
                                this.welcomeMessage = "Welcome user";
                            })
                            .catch(error => {
                                console.error(error);
                                alert("An error occurred - check the console for details.");
                            });

                },
        getAllSubject() {

            axios.get(subjectApi)
                    .then(response => {
                        this.subject = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },
        getAllDuration() {

            axios.get(durationApi)
                    .then(response => {
                        this.duration = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },

        getAllAmount() {

            axios.get(amountApi)
                    .then(response => {
                        this.amount = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },

        getAllProvider() {

            axios.get(providerApi)
                    .then(response => {
                        this.provider = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },

        // click handler for the category filter buttons
        filterByAmount(amount) {
            axios.get(amountFilterApi({'amount': amount}))
                    .then(response => {
                        this.scholarshipList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        filterByProvider(provider) {
            axios.get(providerFilterApi({'provider': provider}))
                    .then(response => {
                        this.scholarshipList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        filterBySubject(subject) {
            axios.get(subjectFilterApi({'subject': subject}))
                    .then(response => {
                        this.scholarshipList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        filterByDuration(duration) {
            axios.get(durationFilterApi({'duration': duration}))
                    .then(response => {
                        this.scholarshipList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        // click handler for submit on createEvent page
        createScholarship() {
            // send POST request to service to create event
            axios.post(scholarshipApi, this.scholarship)
                    .then(() => {
                        window.location = 'scholarship.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });

        },

        searchById(scholarshipId) {
            axios.get(searchByIdApi({'scholarshipId': scholarshipId}))
                    .then(response => {
                        this.scholarship = response.data;
                    })
                    .catch(error => {
                        alert("An error occurred -  check the console for details");
                    });
        },

        deleteScholarship(scholarshipId) {
            if (confirm("Are you sure you want to delete this Scholarship?\nClick OK to confirm or Cancel to return to Scholarship.") == true) {

                axios.delete(searchByIdApi({'scholarshipId': scholarshipId}))
                        .then(response => {
                            this.scholarship = response.data;
                            window.location.reload();
                        })
                        .catch(error => {
                            alert("An error occurred - check the console for details");
                        });
            }
        },

        goToEditScholarship(scholarship) {
            dataStore.commit("selectScholarship", scholarship);
            window.location = "editScholarship.html"

        },

        goToApply(scholarship){
            dataStore.commit("selectScholarship", scholarship);
            window.location = "applyScholarship.html"
        },

        applyScholarship(application){
            let interest = new ScholarshipInterest(application, this.student, this.scholarshipToUpdate);
                    this.interest = interest;
                    axios.post(applyApi, this.interest)
                            .then(() => {
                                window.location = "applications.html"
                            })
                            .catch(error => {
                                console.error(error);
                                alert("An error occurred - check console");
                    });
        },

        getAllYourScholarships() {
                    let studentId = this.student.studentId;
                    this.studentId = studentId;
                    axios.get(yourScholarshipApi({'studentId': this.studentId}))
                            .then(response => {
                                this.yourScholarshipList = response.data;
                            })
                            .catch(error => {
                                console.error(error);
                                console.trace();
                                alert("An error occurred - check the console for details.");
                            });
                },

        editScholarship() {
            axios.put(scholarshipApi, this.scholarshipToUpdate)
                    .then(() => {
                        window.location = 'scholarship.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        // join event via data-store: working
        joinEvent(scholarship) {
            // dataStore.commit("joinEvent", new Event(event.eventId, event.eventName));
            dataStore.commit("joinEvent", scholarship);
        }

        // join event via API
        // not using this atm cause its shit
        /*
         joinEventApi(eventId) {
         axios.get(searchByIdApi({'eventId': eventId}))
         .then(response => {
         this.event = response.data;
         })
         .catch(error => {
         console.error(error);
         alert("An error occured - check the console for details.");
         });
         console.log(this.event);
         axios.post(joinedEventsApi, this.event)
         .then(() => {
         confirm("You have successfully joined this event!");
         })
         .catch(error => {
         alert("An error occured - check the console for details");
         });
         console.log(this.event);
         
         },
         *
         */


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
