# Emerald Escapes

A responsive travel website for a fictional company offering holidays, short breaks and experiences across Ireland. Built for the NCI Web Design and Client-Side Scripting module.

## Features

- Home page introducing Emerald Escapes and its travel experiences.
- Fifteen destination cards with images, locations, descriptions, durations and prices.
- Category and price filters, with results counts and a reset button.
- Favourites saved in the browser, with an option to show saved experiences.
- Booking enquiry form with client-side validation and confirmation feedback.
- Light and dark themes with a remembered preference and an animated sun/moon control.
- Responsive layouts, a custom landscape logo and keyboard focus indicators.

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
images/
fonts/
vendor/bootstrap/
```

Built with HTML, CSS, JavaScript and Bootstrap 5.3.8. Bootstrap is bundled locally and retains its copyright and MIT licence notices.

Headings use Lora by Cyreal; body text and controls use DM Sans by Colophon Foundry. The Latin variable WOFF2 fonts are bundled from Google Fonts for offline use. Their SIL Open Font License notices are included in `fonts/lora-OFL.txt` and `fonts/dm-sans-OFL.txt`.

Company details, experiences and prices are presented for coursework purposes. This repository records the project in progress.
