/**
 * Creates a new HTML element with specified attributes.
 *
 * @param {string} tag - The type of element.
 * @param {Object} [attributes={}] - An object of the attributes to set on the element.
 *
 * @returns {HTMLElement} - The created element with the specified attributes.
 */
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);

  // Iterate provided attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key in element) {
      // Case #1
      // If the attribute key is a property of the element, set it.
      // i.e., properties like `value`, `checked`, `textContent`
      element[key] = value;
    } else {
      // Case #2
      // If it is not, set it as an HTML attribute.
      // i.e., attributes like `type`, `id`, `class`
      element.setAttribute(key, value);
    }
  });

  return element;
}

function getRandomId() {
  return Math.random() // Generate random number between 0 to 1.
    .toString(36) // Convert to base-36 string.
    .substring(2); // Remove leading '0.'.
}

function dispatchTaskChangeEvent(element) {
  const taskChangeEvent = new CustomEvent('taskChange', {
    bubbles: true,
  });
  element.dispatchEvent(taskChangeEvent);
}
