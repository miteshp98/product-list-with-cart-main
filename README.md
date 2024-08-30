# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- Add items to the cart and remove them
- Increase/decrease the number of items in the cart
- See an order confirmation modal when they click "Confirm Order"
- Reset their selections when they click "Start New Order"
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid

**Note: These are just examples. Delete this note and replace the list above with your own choices**

### What I learned

In this project, I focused on fetching data from a JSON file using the fetch API and dynamically updating the DOM with product information. I learned how to handle asynchronous data fetching using async/await, manage errors effectively, and manipulate the DOM to load and display product details, including images and pricing. I also implemented a shopping cart functionality, allowing users to add items, update quantities, and remove products, which helped me understand how to maintain state within an application.

Efficient DOM Manipulation: I learned how to efficiently manipulate the DOM by creating, updating, and removing elements dynamically. This improved my understanding of how to handle real-time updates in the user interface.

State Management with JavaScript Objects: By using objects to store cart items and their quantities, I learned how to manage the state of the application effectively. This approach helps keep track of user actions and updates the UI accordingly.

Event Handling: I enhanced my skills in handling various user events such as button clicks for adding and removing items from the cart. This helped me understand how to trigger specific functions based on user interactions.

Reusable Code through Functions: I learned the importance of creating reusable functions like queryElements, checkAndUpdateCart, and updateCountValue. This practice helped in reducing code duplication and making the codebase more maintainable.

Error Handling in Fetch Requests: By implementing error handling in fetch requests, I learned how to manage potential issues with network requests and ensure that the application remains robust and user-friendly.

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
async function fetchProductData() {
  const url = "data.json";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status ${response.status}`);
    }

    const apiResponse = await response.json();

    return apiResponse;
  } catch (error) {
    console.error(error);
  }
}

// Load  Products
async function loadProducts() {
  const productData = await fetchProductData();
  updateProductList(productData);
}
```

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Moving forward, I plan to dive deeper into data fetching techniques, especially focusing on more complex use cases such as handling paginated data, making concurrent API requests, and optimizing the performance of data-heavy applications. I also want to explore different ways to manage state in JavaScript applications, such as using state management libraries or integrating back-end services to persist cart data.

Advanced Data Fetching Techniques: I want to explore advanced data fetching techniques, such as using async/await with error handling, retry mechanisms, and managing multiple fetch requests concurrently. This will help in building more resilient and efficient data-driven applications.

Performance Optimization: I aim to dive deeper into performance optimization techniques, especially related to DOM manipulation and data fetching. This includes understanding the best practices for minimizing reflows, using virtual DOMs, and optimizing fetch requests to reduce loading times.

Integrating APIs: I plan to integrate external APIs into my projects, which will involve handling more complex data structures, pagination, and authentication. This will give me experience with real-world API consumption and integration.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

## Author

- Website - [Mitesh Panchal](https://miteshp98.github.io/portfolio-website/)
- Frontend Mentor - [@miteshp98](https://www.frontendmentor.io/profile/miteshp98)
- Linkedin - [@Mitesh Panchal](https://www.linkedin.com/in/mitesh-panchal-356558126/)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

Thanks to the challenge provider for creating this opportunity to apply and improve my frontend development skills.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
