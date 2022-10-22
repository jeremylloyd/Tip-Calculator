# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX).

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![](./design/desktop-design-completed.jpg)

### Links

- Solution URL: [Github](https://github.com/jeremylloyd/Tip-Calculator)
- Live Site URL: [Github Pages](https://jeremylloyd.github.io/Tip-Calculator/)

## My process

### Built with

- HTML
- CSS (BEM)
- Vanilla JS

### What I learned

- HTML
  - Number input elements invalidate the selected number if:
    - A blank value is provided for a `required` input
    - `stepMismatch`: More decimal places are provided than the `step` attribute allows
    - `rangeUnderflow`: The number is less than the `min` attribute
- CSS
  - Using the `:hover` pseudo-class results in the effect lingering on touch devices. To prevent this lingering, use the `@media (hover: hover)` media query to only apply hover effects when using a hoverable input
- JS
  - Remove the need to use `this` in event listener functions by passing the element to the function:
    ```button.addEventListener("click", () => selectTipButton(button));```
