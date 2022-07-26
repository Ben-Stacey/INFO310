"use strict";

// import data store
import { dataStore } from './data-store.js'

export const NavigationMenu = {

    computed: {
        signedIn() {
            return this.student != null;
        },
        ...Vuex.mapState({
            student: 'student'
        })
    },

    template:
            `
    <nav>
        <ul class="navigation">
            
            <!--commented out nav bar that checks for signed in-->
            <!--
            <li><a class="homeActive" href=".">Home</a></li>
            <li><a class="eventsActive" href="events.html" v-if="signedIn">Events</a></li>
            <li><a class="researchActive" href="research.html" v-if="signedIn">Research Opportunities</a></li>
            <li><a class="scholarshipActive" href="scholarship.html" v-if="signedIn">Scholarships</a></li>
            <li><a class="eventsActive" href="yourEvents.html" v-if="signedIn">Your Events</a></li>
            <li><a class="createActive" href="createEvent.html" v-if="signedIn">Create Event</a></li>
            <li><a class="createActive" href="createResearch.html" v-if="signedIn">Create Research Opportunity</a></li>
            <li><a class="createActive" href="createScholarship.html" v-if="signedIn">Create Scholarship</a></li>
            <li><a class="scholarshipActive" href="applications.html" v-if="signedIn">Scholarship Applications</a></li>
            <li><a class="contactActive" href="ContactPage.html" v-if="signedIn">Contacts</a></li>
            <li><a href="#" v-if="signedIn" @click="signOut()">Sign Out</a></li>
            <li><a class="signinActive" href="signin.html" v-if="!signedIn">Student Sign In</a></li>
            <li><a class="signinActive" href="staffSignIn.html" v-if="!signedIn">Staff Sign In</a></li>
            <li><a class="signupActive" href="createAccount.html" v-if="!signedIn">Sign Up</a></li>
            <li><a href="createStaff.html">Create a new Staff Account</a></li>
            <div class="welcome" v-if="signedIn">Welcome {{student.firstName}}</div>
            
            -->
            
            
            <!-- Temp more basic nav bar without the v-ifs. Html comment cause this is html code. -->
    
            <li><a class="homeActive" href=".">Home</a></li>
            <li><a class="eventsActive" href="events.html" >Events</a></li>
            <li><a class="createActive" href="createEvent.html" >Create Event</a></li>
            <li><a class="signinActive" href="signin.html">Student Sign In</a></li>
            <li><a href="research.html" >Research Opportunities</a></li>
            <li><a class="researchActive" href="yourResearch.html" >Your Research Opportunities</a></li>
            <li><a class="createActive" href="createResearch.html" >Create Research Opportunity</a></li>
            <li><a class="signinActive" href="staffSignIn.html">Staff Sign In</a></li>
            <li><a class="scholarshipActive" href="scholarship.html" >Scholarships</a></li>
            <li><a class="createActive" href="createScholarship.html" >Create Scholarship</a></li>
            <li><a class="signupActive" href="createAccount.html">Sign Up</a></li>
            <li><a class="eventsActive" href="yourEvents.html" >Your Events</a></li>
            <li><a class="contactActive" href="ContactPage.html" >Contacts</a></li>
            <li><a href="createStaff.html">Create a new Staff Account</a></li>
            <li><a href="#"  @click="signOut()">Sign Out</a></li>
            <!-- <div class="welcome" >Welcome {{student.firstName}}</div> -->
        </ul>
    </nav>
    `,

    methods: {
        signOut() {
            localStorage.clear();
            window.location = '.';
        }
    }
};
