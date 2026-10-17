# Saffron & Olive

A single-page website for Saffron & Olive, a fictional Mediterranean restaurant in Berlin. It was first built for a web development course with plain HTML and CSS (Assignment 1). This version rebuilds it with Vite, React and Tailwind CSS (Assignment 2), and keeps the same content, photos and look.

## What changed in Assignment 2

- The page is now a React app built with Vite instead of a static `index.html` and `css/style.css`
- The page is split into small components: header, hero, about, menu, reservation and footer
- All 12 dishes now live in one data file, `src/data/menu.js`, and the menu is rendered from it with `map`
- New: a category filter (All, Starters, Mains, Desserts) built with `useState`
- New: a quantity stepper on every dish and an order summary with item count and total in €
- All styling is done with Tailwind utility classes. Colors and fonts are set as theme tokens in `src/index.css`
- The photos moved from `images/` to `public/images/`

## Tech used

- [Vite](https://vite.dev/) for the dev server and build
- [React](https://react.dev/) with function components, props and `useState`
- [Tailwind CSS](https://tailwindcss.com/) v4 with the official Vite plugin
- Google Fonts: Playfair Display for headings and Inter for body text
- Plain JavaScript (no TypeScript) and no other libraries

## How to run

You need [Node.js](https://nodejs.org/) installed.

```bash
npm install
npm run dev
```

Then open the address shown in the terminal (usually http://localhost:5173).

To make a production build in the `dist/` folder:

```bash
npm run build
```

## Folder structure

```
.
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/
│       ├── hero.jpg
│       ├── about.jpg
│       ├── starters.jpg
│       ├── mains.jpg
│       └── desserts.jpg
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── menu.js
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Menu.jsx
        ├── MenuItem.jsx
        ├── QuantityStepper.jsx
        ├── Reservation.jsx
        └── Footer.jsx
```

## How the menu works

### Category filter with useState

`Menu.jsx` keeps the selected category in state:

```jsx
const [category, setCategory] = useState('All')
```

Each filter button calls `setCategory` with its own name when it is clicked. React then renders `Menu` again with the new value. On every render the component builds the list to show: all dishes when the category is `All`, otherwise `menu.filter((item) => item.category === category)`. The active button gets different colors and `aria-pressed="true"`, so screen readers know which filter is on.

### Controlled QuantityStepper

`QuantityStepper` has no state of its own. It gets its number from the `value` prop and reports a click by calling the `onChange` prop with the new number (`value - 1` or `value + 1`). The minus button is disabled at `min` and the plus button at `max`. Each button has an `aria-label` such as "Add one Hummus trio".

The quantities live in the parent, `Menu.jsx`, in one state object keyed by dish id:

```jsx
const [quantities, setQuantities] = useState({})
```

Keeping the state in `Menu` means it can add up every quantity for the order summary, and the numbers stay the same when you switch categories.

## Responsive design

The layout is mobile first. Classes without a prefix are for phones, and `sm:` (640px) and `lg:` (1024px) only add changes for bigger screens. There is no horizontal scroll at 360px, 768px or 1280px.

## Photo credits

All photos come from Wikimedia Commons. They were resized and compressed for the web.

| File | Photo | Author | License |
| --- | --- | --- | --- |
| `public/images/hero.jpg` | [11 Depot St, Concord, United States (Unsplash)](https://commons.wikimedia.org/wiki/File:11_Depot_St,_Concord,_United_States_(Unsplash).jpg) | Michael Browning | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `public/images/about.jpg` | [Kokos Fusion - Eggplant bayildi 7](https://commons.wikimedia.org/wiki/File:Kokos_Fusion_-_Eggplant_bayildi_7.jpg) | Journalistgm | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `public/images/starters.jpg` | [Hummus dish on a plate](https://commons.wikimedia.org/wiki/File:Hummus_dish_on_a_plate.jpg) | Bykim2012 | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `public/images/mains.jpg` | [Seabass (levrek) and a grilled potato](https://commons.wikimedia.org/wiki/File:Seabass_(levrek)_and_a_grilled_potato.jpg) | E4024 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `public/images/desserts.jpg` | [Fıstıklı Baklava](https://commons.wikimedia.org/wiki/File:F%C4%B1st%C4%B1kl%C4%B1_Baklava.jpg) | Garrett Ziegler | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

The resized versions of the CC BY-SA photos are shared under the same CC BY-SA 4.0 license.

## AI assistance

AI tools (Claude) were used to help build this project.

## Author

Ahmed Osman, Team 1, Group D
