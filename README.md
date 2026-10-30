# Emerald Escapes

A responsive travel website for a fictional company offering holidays, short breaks and experiences across Ireland. Built for the NCI Web Design and Client-Side Scripting module.

## Features

- Home page introducing Emerald Escapes and its travel experiences.
- Fifteen destination cards with images, locations, descriptions, durations and prices.
- Category and price filters, with results counts and a reset button.
- Favourites saved in the browser, with an option to show saved experiences.
- Booking enquiry form with client-side validation and confirmation feedback.
- Light and dark themes with a remembered preference, gentle colour transitions and a sun/moon control.
- A responsive footer with travel information and an Ireland-themed trip-planning prompt.
- Responsive layouts and a custom landscape logo.
- Simple fading navigation underlines on hover.
- A compact back-to-top tab with an orange accent and smooth scrolling.

## Run locally

Download or clone the repository and open `index.html` in a browser. All required scripts, styles and images are included; no build step or external hosting is needed.

The enquiry form is a frontend demonstration. It validates entries and shows a confirmation, but does not send messages or make bookings.

## Project structure

```text
index.html
experiences.html
contact.html
css/style.css
js/contact.js
js/filter.js
js/favourites.js
js/theme.js
js/back-to-top.js
images/
fonts/
vendor/bootstrap/
```

Built with HTML, CSS, JavaScript and Bootstrap 5.3.8. Bootstrap is bundled locally and retains its copyright and MIT licence notices.

The site uses official [Bootstrap Icons 1.13.2](https://icons.getbootstrap.com/) for theme controls, navigation arrows, favourite hearts and the enquiry confirmation. Its stylesheet, icon fonts and MIT licence are included in `vendor/bootstrap-icons/` for offline use.

Headings use Lora by Cyreal; body text and controls use DM Sans by Colophon Foundry. The Latin variable WOFF2 fonts are bundled from Google Fonts for offline use. Their SIL Open Font License notices are included in `fonts/lora-OFL.txt` and `fonts/dm-sans-OFL.txt`.

Company details, experiences and prices are presented for coursework purposes. This repository records the project in progress.
