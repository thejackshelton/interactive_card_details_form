# Frontend Mentor - Interactive card details form solution

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

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

## Overview

A card form that updates a live preview by using Tailwind CSS & Vanilla JS.

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

![Screenshot](https://imgur.com/vOaieyN)

### Links

- Solution URL: [Add solution URL here](https://github.com/thejackshelton/interactive_card_details_form)
- Live Site URL: [Add live site URL here](https://interactive-card-details-form-eight.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Tailwind CSS] (https://tailwindcss.com/) - CSS Framework
- Vanilla JavaScript

### What I learned

In my HTML, I learned how to use aria-describedby and aria-live in order to make my forms accessible without nesting them in a label tag. I found this important because depending on the situation, nesting everything in a label tag may not be the best option.

```html
<label for="card-number" class="my-2 mt-5 tracking-body_md_spacing text-body_md"
  >CARD NUMBER</label
>
<input
  required
  aria-describedby="cardinfo-error"
  data-cardinfo-input
  type="text"
  name="card-number"
  placeholder="e.g. 1234 5678 9123 0000"
  class="px-3 py-2 border rounded-lg border-lightGrayishViolet text-heading_lg focus:input-border-gradient focus:border outline-0 focus:outline-none caret-gradientOne"
/>

<span
  id="cardinfo-error"
  aria-live="polite"
  class="text-red text-[12px] mt-2"
></span>
```

I created a couple of my own tailwind utilities throughout this challenge. The input border gradient class is a utility I created in order to add the border gradient effect.

```css
@layer utilities {
  .input-border-gradient {
    border: double 1px transparent;
    background-image: linear-gradient(white, white), linear-gradient(to bottom, hsl(249, 99%, 64%), hsl(278, 94%, 30%));
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  .inline-size {
    inline-size: 150px;
  }

  .focus-visible {
    outline-color: transparent;
  }
}
```

I used regex several times throughout this project. Below is the input listener and custom logic for the card number input value.

Whenever the input is empty, it defaults to the standard 0's. I used the event variable in order to capture the input value.

I didn't like that someone could put in numbers any way that they wanted on the card without a space in between. To solve this, I made a variable called trimmedinfo that removes any whitespace in the input value. This then runs through a regex filter that will add a space every four characters to the trimmed string. This allows the user to add as many spaces as they like, and it wouldn't affect what appears on the card.

I used the slice method that deleted the last character a user types in both the input and inner text of the card. This was to prevent the card from getting more digits than needed, along with the input as well.

There is much more JS than this throughout the file, but this is something I thought I'd mention.

```js
cardinfoInput.addEventListener("keyup", (e) => {
  if (e.target.value === "") {
    cardinfo.innerText = "0000 0000 0000 0000";
  } else {
    //Removes any white spaces
    let trimmedinfo = e.target.value.replace(/\s+/g, "");

    //Regex for adding a space between each 4 digits on the card
    let regexFilter = trimmedinfo.match(/.{1,4}/g);

    //Uses join when there is more than white spaces
    if (trimmedinfo !== "") {
      cardinfo.innerText = regexFilter.join(" ");
    }

    //Checks if the current value contains anything other than numbers
    if (!e.target.value.match(/^[\d ]*$/)) {
      console.log("sorry, but you haven't typed a number");
      cardinfoError.classList.add("text-heading_xs");
      cardinfoError.appendChild(cardinfoErrorMessage);
    } else {
      if (cardinfoError.contains(cardinfoErrorMessage)) {
        cardinfoError.removeChild(cardinfoErrorMessage);
      }
    }

    //Prevents any trimmed number length over 16 (w/removed white space)
    let trimmedText = cardinfo.innerText.replace(/\s+/g, "");
    if (trimmedText.length > 16) {
      console.log("Sorry, but that input is too long.");
      e.target.value = e.target.value.slice(0, -1);
      cardinfo.innerText = cardinfo.innerText.slice(0, -1);
      expirationMonth.focus();
    }
  }
});
```

### Continued development

I want to continue utilizing accessibility as a standard best practice in all of my projects.

I enjoy Tailwind, but I think I will be doing the next couple of challenges using SASS.

### Useful resources

- [Figma](https://figma.com) - Due to being a pro member, I was able to access the design files. This allowed me to see the exact sizes and spacing that was used in the design.

- [Stack Overflow](https://stackoverflow.com/) - Like every other developer, I use stack overflow. Particularly to find the regex for the condition checks. Thanks to Jerry T and Tom M for helping me out with that! All credit goes to you guys.

## Author

- Twitter - [@thejackshelton](https://www.twitter.com/thejackshelton)

## Acknowledgments

Big special thanks to Grace Snow for helping me with the aria-live and aria-describedby attributes.

Thanks to Julio Cinquina for informating me that you can use the character e in an input with type="number", this is because it's a logarithm/irrational number.

Julio also recommended this article:
https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/

To solve a couple of my problems for mobile, the article covers how you can set the pattern of the input for mobile users. I found this very helpful on a couple of my inputs. For the card numbers input, it remained a text input to stay faithful to the challenge, as there's an error message for characters that aren't numbers.

```html
<input type="number" /> to
<input type="text" inputmode="numeric" pattern="[0-9]*" />
```
