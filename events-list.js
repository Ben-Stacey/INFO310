/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

"use strict";

var eventsApi = '//localhost:8080/api/events';
var categoriesApi = '//localhost:8080/api/categories';
var categoriesFilterApi = ({category}) => `//localhost:8080/api/categories/${category}`;
var datesFilterAPI = ({date}) => `//localhost:8080/api/dates/${date}`;
var datesApi = '//localhost:8080/api/dates'
var searchByIdApi = ({eventId}) => `//localhost:8080/api/events/${eventId}`;
var typesApi = `//localhost:8080/api/types`;
var typesFilterApi = ({type}) => `//localhost:8080/api/types/${type}`;
var joinedEventsApi = `//localhost:8080/api/joinedevents`;

class JoinedEvent {
    constructor(studentId, eventId, eventName, eventDate, eventTime, location, type, description) {
        this.studentId = studentId;
        this.eventId = eventId;
        this.eventName = eventName;
        this.eventDate = eventDate;
        this.eventTime = eventTime;
        this.location = location;
        this.type = type;
        this.description = description;
    }
}

const app = Vue.createApp({

    data() {
        return {
            // an array of events
            eventList: new Array(),
            joinedEvents: new Array(),
            categories: new Array(),
            welcomeMessage: "",
            types: new Array(),
            // singular event
            event: new Object(),
            dates: new Array()
        };
    },

    computed: Vuex.mapState({
        // event to edit or delete
        eventToUpdate: 'selectedEvent',
        staff: 'staff',
        student: 'student'
    }),

    mounted() {
        this.getAllEvents();
        this.getAllCategories();
        this.getAllTypes();
        this.getAllDates();
    },

    methods: {

        getAllEvents() {
            axios.get(eventsApi)
                    .then(response => {
                        this.eventList = response.data;
                        this.welcomeMessage = "Welcome user";
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        getAllCategories() {
            axios.get(categoriesApi)
                    .then(response => {
                        this.categories = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        getAllDates() {
            axios.get(datesApi)
                    .then(response => {
                        this.dates = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        getAllTypes() {
            axios.get(typesApi)
                    .then(response => {
                        this.types = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        // click handler for the category filter buttons
        filterByCategory(category) {
            axios.get(categoriesFilterApi({'category': category}))
                    .then(response => {
                        this.eventList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        filterByType(type) {
            axios.get(typesFilterApi({'type': type}))
                    .then(response => {
                        this.eventList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        filterByDate(date) {
            axios.get(datesFilterAPI({'date': date}))
                    .then(response => {
                        this.eventList = response.data;
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occurred - check the console for details.");
                    });
        },

        // click handler for submit on createEvent page
        createEvent() {
            // send POST request to service to create event
            axios.post(eventsApi, this.event)
                    .then(() => {
                        window.location = 'events.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check the console for details.");
                    });

        },

        searchById(eventId) {
            axios.get(searchByIdApi({'eventId': eventId}))
                    .then(response => {
                        this.event = response.data;
                    })
                    .catch(error => {
                        alert("An error occured -  check the console for details");
                    });
        },

        deleteEvent(eventId) {
            if (confirm("Are you sure you want to delete this Event?\nClick OK to confirm or Cancel to return to Events.") == true) {

                axios.delete(searchByIdApi({'eventId': eventId}))
                        .then(response => {
                            this.event = response.data;
                            window.location.reload();
                        })
                        .catch(error => {
                            alert("An error occured - check the console for details");
                        });
            }
        },

        goToEditEvent(event) {
            dataStore.commit("selectEvent", event);
            window.location = "editEvent.html";
        },

        editEvent() {
            axios.put(eventsApi, this.eventToUpdate)
                    .then(() => {
                        window.location = 'events.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check the console for details.");
                    });
        },

        joinEvent(event) {
            let joinedEvent = new JoinedEvent(this.student.studentId, event.eventId, event.eventName, event.eventDate, event.eventTime, event.location, event.type, event.description);
            this.joinedEvent = joinedEvent;
            axios.post(joinedEventsApi, joinedEvent)
                    .then(() => {
                        confirm("You have joined this event!");
                        window.location = 'yourEvents.html';
                    })
                    .catch(error => {
                        console.error(error);
                        alert("An error occured - check console");
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
