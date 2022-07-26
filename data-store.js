export const dataStore = Vuex.createStore({
 
    state() {
        // signed in user
        student: null;
        
        staff: null;
        
        event: null;

        research: null;

        scholarship: null;
 
        // a users joined events
        events: null;
 
        // selected event
        selectedEvent: null;

        selectedResearch: null;

        selectedScholarship: null;
 
        // basic access authentication token
        authToken: null;
        
        authStaffToken: null;
    },
 
    mutations: {
 
        // user signs in
        // two sign in mutations I commented out this one - Reuben
//        signIn(state, user) {
//            state.user = user;
//        },
 
        // user selects a event to delete (can also be used for edit and join, maybe?)
        selectEvent(state, event) {
            state.selectedEvent = event;
        },
        
        selectResearch(state, research) {
            state.selectedResearch = research;
        },
        
        selectScholarship(state, scholarship) {
            state.selectedScholarship = scholarship;
        },
 
        // user joins event
        joinEvent(state, event) {
            state.events.push(event);
            /*
            if (state.events.find(item => item.id === event.eventId)) {
                confirm("You have already joined this event.");
            } else {
                state.events.push(event);
                confirm("You have successfully joined this event!");
                window.location = 'yourEvents.html';
            } 
             * 
             */
            
             
        },
        
        removeEvent(state, event) {
            const i = state.events.map(item => item.id).indexOf(event.id);
            state.events.splice(i, 1);
        },

        removeResearch(state, research) {
            const i = state.research.map(item => item.id).indexOf(research.id);
            state.research.splice(i, 1);
        },

        removeScholarship(state, scholarship) {
            const i = state.scholarship.map(item => item.id).indexOf(scholarship.id);
            state.scholarship.splice(i, 1);
        },
 
        signIn(state, student) {
            state.student = student;
            state.events = new Array();
        },
        
        staffSignIn(state, staff) {
            state.staff = staff;
            state.events = new Array();
        },
 
        // store basic access token
        authToken(state, token) {
            state.authToken = token;
        }
    },
 
    // add local storage persistence
    plugins: [window.createPersistedState({storage: window.localStorage})]
 
});
