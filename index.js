/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This lambda is the trigger for Alexa skill krishalunch
 * nodejs skill development kit.
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');
const cerebrum = require('./cerebrum');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.484b5901-0556-4d93-9f4f-f8dc2fd013c5';

const SKILL_NAME = 'Krisha\'s Lunch';
const HELP_MESSAGE = 'You can say what is Krisha\`s lunch today, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    let alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetLunchForDay': function () {
        const forDaySlot = this.event.request.intent.slots.forDay;
        let forDay, lunch;
        if (forDaySlot && forDaySlot.value) {
            forDay = forDaySlot.value.toLowerCase();
        }
        lunch = cerebrum.tellLunchForDay(forDay);
        const speechOutput = lunch;

        this.response.cardRenderer(SKILL_NAME, lunch);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
