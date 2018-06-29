'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Definition of the content used in the view of `Activity` instances. The key
// of the returned object match the id of the activities.
//
// Each content defines the variables that are used inside the corresponding
// [`template`]{@link module soundworks/client.defaultViewTemplates}. A special
// key `globals` is accessible among all templates and can then be used to share
// variables among all the views of the application.
// These objects are used to populate the templates declared inside the
// `~/src/client/shared/viewTemplate.js` file.
exports.default = {
  // variables shared among all templates through the global namespace
  'globals': {},

  // content of the `auth` service
  'service:auth': {
    instructions: 'Login',
    send: 'Send',
    reset: 'Reset',
    rejectMessage: 'Sorry,<br/>you don\'t have access to this client',
    rejected: false
  },

  // content of the `checkin` service
  'service:checkin': {
    labelPrefix: 'Go to',
    labelPostfix: 'Touch the screen<br class="portrait-only" />when you are ready.',
    error: false,
    errorMessage: 'Sorry,<br/>no place available',
    wait: 'Please wait...',
    label: ''
  },

  // content of the `loader` service
  'service:loader': {
    loading: 'Loading sounds…'
  },

  // content of the `locator` service
  'service:locator': {
    instructions: 'Define your position in the area',
    send: 'Send',
    showBtn: false
  },

  // content of the `placer` service
  'service:placer': {
    instructions: 'Select your position',
    send: 'Send',
    reject: 'Sorry, no place is available',
    showBtn: false,
    rejected: false
  },

  // content of the `platform` service
  'service:platform': {
    isCompatible: null,
    errorMessage: 'Sorry,<br />Your device is not compatible with the application.',
    instructions: 'touch to join'
  },

  // content of the `sync` service
  'service:sync': {
    wait: 'Clock syncing,<br />stand by&hellip;'
  },

  // content of the `survey` scene
  'survey': {
    next: 'Next',
    validate: 'Validate',
    thanks: 'Thanks!',
    length: '-'
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdDb250ZW50LmpzIl0sIm5hbWVzIjpbImluc3RydWN0aW9ucyIsInNlbmQiLCJyZXNldCIsInJlamVjdE1lc3NhZ2UiLCJyZWplY3RlZCIsImxhYmVsUHJlZml4IiwibGFiZWxQb3N0Zml4IiwiZXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJ3YWl0IiwibGFiZWwiLCJsb2FkaW5nIiwic2hvd0J0biIsInJlamVjdCIsImlzQ29tcGF0aWJsZSIsIm5leHQiLCJ2YWxpZGF0ZSIsInRoYW5rcyIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7a0JBQ2U7QUFDYjtBQUNBLGFBQVcsRUFGRTs7QUFJWjtBQUNELGtCQUFnQjtBQUNkQSxrQkFBYyxPQURBO0FBRWRDLFVBQU0sTUFGUTtBQUdkQyxXQUFPLE9BSE87QUFJZEMscUVBSmM7QUFLZEMsY0FBVTtBQUxJLEdBTEg7O0FBYWI7QUFDQSxxQkFBbUI7QUFDakJDLGlCQUFhLE9BREk7QUFFakJDLGtCQUFjLGlFQUZHO0FBR2pCQyxXQUFPLEtBSFU7QUFJakJDLGtCQUFjLCtCQUpHO0FBS2pCQyxVQUFNLGdCQUxXO0FBTWpCQyxXQUFPO0FBTlUsR0FkTjs7QUF1QmI7QUFDQSxvQkFBa0I7QUFDaEJDLGFBQVM7QUFETyxHQXhCTDs7QUE0QmI7QUFDQSxxQkFBbUI7QUFDakJYLGtCQUFjLGtDQURHO0FBRWpCQyxVQUFNLE1BRlc7QUFHakJXLGFBQVM7QUFIUSxHQTdCTjs7QUFtQ2I7QUFDQSxvQkFBa0I7QUFDaEJaLGtCQUFjLHNCQURFO0FBRWhCQyxVQUFNLE1BRlU7QUFHaEJZLFlBQVEsOEJBSFE7QUFJaEJELGFBQVMsS0FKTztBQUtoQlIsY0FBVTtBQUxNLEdBcENMOztBQTRDYjtBQUNBLHNCQUFvQjtBQUNsQlUsa0JBQWMsSUFESTtBQUVsQk4sa0JBQWMsaUVBRkk7QUFHbEJSLGtCQUFjO0FBSEksR0E3Q1A7O0FBbURiO0FBQ0Esa0JBQWdCO0FBQ2RTO0FBRGMsR0FwREg7O0FBd0RiO0FBQ0EsWUFBVTtBQUNSTSxVQUFNLE1BREU7QUFFUkMsY0FBVSxVQUZGO0FBR1JDLFlBQVEsU0FIQTtBQUlSQyxZQUFRO0FBSkE7QUF6REcsQyIsImZpbGUiOiJ2aWV3Q29udGVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIERlZmluaXRpb24gb2YgdGhlIGNvbnRlbnQgdXNlZCBpbiB0aGUgdmlldyBvZiBgQWN0aXZpdHlgIGluc3RhbmNlcy4gVGhlIGtleVxuLy8gb2YgdGhlIHJldHVybmVkIG9iamVjdCBtYXRjaCB0aGUgaWQgb2YgdGhlIGFjdGl2aXRpZXMuXG4vL1xuLy8gRWFjaCBjb250ZW50IGRlZmluZXMgdGhlIHZhcmlhYmxlcyB0aGF0IGFyZSB1c2VkIGluc2lkZSB0aGUgY29ycmVzcG9uZGluZ1xuLy8gW2B0ZW1wbGF0ZWBde0BsaW5rIG1vZHVsZSBzb3VuZHdvcmtzL2NsaWVudC5kZWZhdWx0Vmlld1RlbXBsYXRlc30uIEEgc3BlY2lhbFxuLy8ga2V5IGBnbG9iYWxzYCBpcyBhY2Nlc3NpYmxlIGFtb25nIGFsbCB0ZW1wbGF0ZXMgYW5kIGNhbiB0aGVuIGJlIHVzZWQgdG8gc2hhcmVcbi8vIHZhcmlhYmxlcyBhbW9uZyBhbGwgdGhlIHZpZXdzIG9mIHRoZSBhcHBsaWNhdGlvbi5cbi8vIFRoZXNlIG9iamVjdHMgYXJlIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHRlbXBsYXRlcyBkZWNsYXJlZCBpbnNpZGUgdGhlXG4vLyBgfi9zcmMvY2xpZW50L3NoYXJlZC92aWV3VGVtcGxhdGUuanNgIGZpbGUuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIHZhcmlhYmxlcyBzaGFyZWQgYW1vbmcgYWxsIHRlbXBsYXRlcyB0aHJvdWdoIHRoZSBnbG9iYWwgbmFtZXNwYWNlXG4gICdnbG9iYWxzJzoge30sXG5cbiAgIC8vIGNvbnRlbnQgb2YgdGhlIGBhdXRoYCBzZXJ2aWNlXG4gICdzZXJ2aWNlOmF1dGgnOiB7XG4gICAgaW5zdHJ1Y3Rpb25zOiAnTG9naW4nLFxuICAgIHNlbmQ6ICdTZW5kJyxcbiAgICByZXNldDogJ1Jlc2V0JyxcbiAgICByZWplY3RNZXNzYWdlOiBgU29ycnksPGJyLz55b3UgZG9uJ3QgaGF2ZSBhY2Nlc3MgdG8gdGhpcyBjbGllbnRgLFxuICAgIHJlamVjdGVkOiBmYWxzZSxcbiAgfSxcblxuICAvLyBjb250ZW50IG9mIHRoZSBgY2hlY2tpbmAgc2VydmljZVxuICAnc2VydmljZTpjaGVja2luJzoge1xuICAgIGxhYmVsUHJlZml4OiAnR28gdG8nLFxuICAgIGxhYmVsUG9zdGZpeDogJ1RvdWNoIHRoZSBzY3JlZW48YnIgY2xhc3M9XCJwb3J0cmFpdC1vbmx5XCIgLz53aGVuIHlvdSBhcmUgcmVhZHkuJyxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgZXJyb3JNZXNzYWdlOiAnU29ycnksPGJyLz5ubyBwbGFjZSBhdmFpbGFibGUnLFxuICAgIHdhaXQ6ICdQbGVhc2Ugd2FpdC4uLicsXG4gICAgbGFiZWw6ICcnLFxuICB9LFxuXG4gIC8vIGNvbnRlbnQgb2YgdGhlIGBsb2FkZXJgIHNlcnZpY2VcbiAgJ3NlcnZpY2U6bG9hZGVyJzoge1xuICAgIGxvYWRpbmc6ICdMb2FkaW5nIHNvdW5kc+KApicsXG4gIH0sXG5cbiAgLy8gY29udGVudCBvZiB0aGUgYGxvY2F0b3JgIHNlcnZpY2VcbiAgJ3NlcnZpY2U6bG9jYXRvcic6IHtcbiAgICBpbnN0cnVjdGlvbnM6ICdEZWZpbmUgeW91ciBwb3NpdGlvbiBpbiB0aGUgYXJlYScsXG4gICAgc2VuZDogJ1NlbmQnLFxuICAgIHNob3dCdG46IGZhbHNlLFxuICB9LFxuXG4gIC8vIGNvbnRlbnQgb2YgdGhlIGBwbGFjZXJgIHNlcnZpY2VcbiAgJ3NlcnZpY2U6cGxhY2VyJzoge1xuICAgIGluc3RydWN0aW9uczogJ1NlbGVjdCB5b3VyIHBvc2l0aW9uJyxcbiAgICBzZW5kOiAnU2VuZCcsXG4gICAgcmVqZWN0OiAnU29ycnksIG5vIHBsYWNlIGlzIGF2YWlsYWJsZScsXG4gICAgc2hvd0J0bjogZmFsc2UsXG4gICAgcmVqZWN0ZWQ6IGZhbHNlLFxuICB9LFxuXG4gIC8vIGNvbnRlbnQgb2YgdGhlIGBwbGF0Zm9ybWAgc2VydmljZVxuICAnc2VydmljZTpwbGF0Zm9ybSc6IHtcbiAgICBpc0NvbXBhdGlibGU6IG51bGwsXG4gICAgZXJyb3JNZXNzYWdlOiAnU29ycnksPGJyIC8+WW91ciBkZXZpY2UgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgYXBwbGljYXRpb24uJyxcbiAgICBpbnN0cnVjdGlvbnM6ICd0b3VjaCB0byBqb2luJyxcbiAgfSxcblxuICAvLyBjb250ZW50IG9mIHRoZSBgc3luY2Agc2VydmljZVxuICAnc2VydmljZTpzeW5jJzoge1xuICAgIHdhaXQ6IGBDbG9jayBzeW5jaW5nLDxiciAvPnN0YW5kIGJ5JmhlbGxpcDtgLFxuICB9LFxuXG4gIC8vIGNvbnRlbnQgb2YgdGhlIGBzdXJ2ZXlgIHNjZW5lXG4gICdzdXJ2ZXknOiB7XG4gICAgbmV4dDogJ05leHQnLFxuICAgIHZhbGlkYXRlOiAnVmFsaWRhdGUnLFxuICAgIHRoYW5rczogJ1RoYW5rcyEnLFxuICAgIGxlbmd0aDogJy0nLFxuICB9LFxufTtcbiJdfQ==