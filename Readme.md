# React App with Youtube Data API v3

## Folder structure

📂**mocks** &rarr; contains JavaScript objects and JSON samples to aid tests

📂api &rarr; contains the main instance of axios and available services

📂assets &rarr; contains images and stylesheets available globally

📂components &rarr; contains the generic JSX components available to other components and pages;

📂features &rarr; contains components which implement specific versions of one or more components;

📂lib &rarr; contains groups of logic which could be by themselves a vendor library;

📂pages &rarr; contains the pages to be rendered by the routing mechanism;

📂shared &rarr; contains shared logic

> 📂helpers &rarr; utility functions to avoid bloating main files and generally used by multiple elements;<br />
> 📂hooks &rarr; collection of hooks to be used throughout the app;<br/>
> 📂providers &rarr; React Context API providers.

## Libraries and Packages

⚛️React 17
🗺️React Router
🌐Axios
🎇node-sass
📚Material-UI

## Design Choices

- Mobile-first
- Every component must be designed to allow testing in an isolated environment;
- Every component must be written in Typescript;
- A library must be installed if and only if its logic cannot be written easily;
- Logic that can become a hook must become a hook;
- ESLint and Prettier rules must be respected unless there's a pretty good reason to do otherwise;

## Known Flaws

- Because this is a SPA with no backend, the OAuth2 access token is being stored on local storage to persist user's session after a page refresh. This is a security vulnerability and with a backend a HttpOnly cookie should be the strategy to use;
- The initial idea was to develop an application which could fetch from multiple sources and provide a common user interface. This concept got lost in the middle of the way, so some interfaces which rely on `YoutubeVideo`, such as `IVideosGrid` should instead rely on a interface which for every source we could implement a DTO;
- The loading state only awaits for the JSON data fetching to complete. It should, however, await until the thumbnail is also loaded;
- The channels' avatars are not loaded, even though the `Card` component has a place to render it. This is because Google doesn't send the channel's avatar URL when a video resource is fetched. I would have to manually make 12 (the page size I chose throughout the app) requests just to render the avatars, which would eventually extinguish my API daily quota.
- Material-UI, which was the chosen components library, has a CSS-in-JS philosophy via methods such as `styled` and `makeStyles`. I chose however to use Sass module files to customize components;

## Screenshots

See [Pages](./docs/pages.md) docs
