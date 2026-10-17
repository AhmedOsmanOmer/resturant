# Saffron & Olive

A single-page website for Saffron & Olive, a fictional Mediterranean restaurant in Berlin. Built for a web development course with plain HTML5 and CSS3.

## Features

- Sticky header with navigation that scrolls smoothly to each section
- Hero section with a background photo, a soft dark gradient and two calls to action
- About section with the restaurant story, three key facts and a kitchen photo
- Menu with starters, mains and desserts, four dishes each with description and price
- Reservation form with labeled fields and built-in browser validation (no backend)
- Footer with opening hours, address and contact details
- Hover and keyboard focus states on links, buttons, cards and form fields
- Mobile-first, responsive layout with no horizontal scroll from 360px up

## Tech used

- HTML5 with semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`, `address`
- CSS3 with custom properties (variables) for all colors and fonts
- Flexbox for the header, hero buttons, menu items and footer bar
- CSS Grid for the about section, facts, menu cards, form and footer
- Google Fonts: Playfair Display for headings and Inter for body text
- No JavaScript, no frameworks, no libraries

## Folder structure

```
.
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── hero.jpg
│   ├── about.jpg
│   ├── starters.jpg
│   ├── mains.jpg
│   └── desserts.jpg
├── README.md
└── .gitignore
```

## How to run

Download or clone the repository and open `index.html` in any modern browser. No build step or server is needed.

## Responsive breakpoints

| Width | Layout |
| --- | --- |
| Below 640px | Mobile: one column everywhere, full-width form button |
| 640px and up | Tablet: about, form and footer in two columns |
| 960px and up | Desktop: menu and footer in three columns, larger hero and more spacing |

## What I learned

- How to structure a page with semantic HTML so it is clear for browsers, search engines and screen readers
- Writing CSS mobile first and adding `min-width` media queries for larger screens
- When to use Flexbox (one direction) and when to use Grid (rows and columns)
- Using CSS variables to keep colors and fonts consistent in one place
- Making images responsive with `object-fit`, `aspect-ratio`, `width` and `height` attributes and lazy loading
- Adding visible `focus-visible` states so the site works with a keyboard
- Committing work in small, clear steps with Git

## Photo credits

All photos come from Wikimedia Commons. They were resized and compressed for the web.

| File | Photo | Author | License |
| --- | --- | --- | --- |
| `images/hero.jpg` | [11 Depot St, Concord, United States (Unsplash)](https://commons.wikimedia.org/wiki/File:11_Depot_St,_Concord,_United_States_(Unsplash).jpg) | Michael Browning | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `images/about.jpg` | [Kokos Fusion - Eggplant bayildi 7](https://commons.wikimedia.org/wiki/File:Kokos_Fusion_-_Eggplant_bayildi_7.jpg) | Journalistgm | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `images/starters.jpg` | [Hummus dish on a plate](https://commons.wikimedia.org/wiki/File:Hummus_dish_on_a_plate.jpg) | Bykim2012 | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `images/mains.jpg` | [Seabass (levrek) and a grilled potato](https://commons.wikimedia.org/wiki/File:Seabass_(levrek)_and_a_grilled_potato.jpg) | E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `images/desserts.jpg` | [Fıstıklı Baklava](https://commons.wikimedia.org/wiki/File:F%C4%B1st%C4%B1kl%C4%B1_Baklava.jpg) | Garrett Ziegler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

The resized versions of the CC BY-SA photos are shared under the same CC BY-SA 4.0 license.

## AI assistance

AI tools (Claude) were used to help build this project.

## Author

Ahmed Osman, Team 1, Group D
