// the list that will have our jquery
// START HERE
// Get the variables list element using jQuery
const list = $('#variables-list');

// Create an array of variables
const variables = [
  { name: "Riso" },
  { name: "Margarita" },
  { name: "Pescador" }
];

// Get the formula input element using jQuery
const $formula = $('#finance-option-formula');
// Get the formula input element
const formula = document.querySelector('#finance-option-formula');

// Create an empty array to store added variables
let addedVariables = [];

// Keep track of the caret position in the formula input element
let caretPosition = 0;

// Loop through the variables and create a new list item for each
$.each(variables, (index, { name }) => {
  const li = $('<li>', {
    class: "variable-element text-center",
    text: name,
    id: name,
    click: () => { addVariable(name) },
  }).appendTo(list);
});

// Add an event listener to the formula input element that will track the caret position
// and update added variable positions accordingly
formula.addEventListener('input', ({ target }) => {
  caretPosition = getCaretIndex(target);
  const inputIs = formulaInputLength > target.innerHTML.length ? 'removing' : 'adding';
  addedVariables.map((variable) => {
    if (caretPosition < variable['caret']) {
      variable['caret'] += inputIs == 'adding' ? 1 : -1;
    }
  });
  formulaInputLength = target.innerHTML.length;
});

// Add an event listener to the formula input element that will update the caret position when it is clicked
formula.addEventListener('click', ({ target }) => {
  caretPosition = getCaretIndex(target);
});

// Add an event listener to the document that will handle removing added variables from the formula input element
$(document).on("click", "#remove-variable", function (e) {
  const parent = e.target.parentElement;
  for (const [index, variable] of addedVariables.entries()) {
    if (variable._id === parent.id) {
      caretPosition = variable['caret'];
      const copy = addedVariables.slice((index + 1), addedVariables.length);
      copy.map((var_, index) => {
        var_['caret'] -= (variable['name'].length + 1);
      });
      addedVariables.splice(index, 1);
    };
  }
  parent.remove();
});

// Define a function to create a new span element to represent an added variable
const newSpan = (content, _id) => /*html*/`<span class="inserted-variable" id="${_id}" contenteditable="false">${content}<b id="remove-variable">✕</b></span>`

// Define a function to add a variable to the formula input element
function addVariable(variable) {
  // Generate a random ID for the variable
  const _id = 'content-' + Math.floor(10000000 + Math.random() * 900000);
  // Define a function to insert a string at a given position in another string
  const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;
  // Create a new span element for the added variable
  const span = newSpan(variable, _id);
  // Get the current value of the formula input element
  const value = formula.innerHTML;
  // Set the position to insert the new span element
  let insertPosition = caretPosition;
  // Update the insert position to account for previously