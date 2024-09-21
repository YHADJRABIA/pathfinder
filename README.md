# Pathfinder Next.js application

## How it works:

Upload .json file (from /utils/samples) and get the shortest path returned as a coordinates array form, otherwise `null`.

- Json file has to be uploaded;
- Json file is processed by an api route;
- The API response is used to display the coordinates of the shortest path, if no path is found an appropriate error message is shown to the user.

### Project's architecture:

• Emphasis on separation of concerns & reusability:

- View is separated from logic as best as possible;
- Non-view states are handled by hooks;
- Logic is spread through hooks & utility functions;
- Components are "dumb", i.e. logic has to be passed as prop;
- Components have `className` prop whose responsibility is to handle components' external margins & dimensions;
- Props & components are named based on what they **ARE**, rather then what they **DO**;
- API errrors are handled via a utility function;
- Types are separated on their own folder;

• Tests using Jest target only the most important logic;

• Project uses TypeScript and has Prettier & Linter rules;

## Note that:

- All texts are hard-coded. In a proper production app, they would come from a locale `.json` file to facilitate their maintenance and make it easier to internationalise the application in more languages.

- Proper frontend-backend interfacing would rely on React-hook-form and Zod in modern applications, this hasn't been done here because it would be overkill (there is just one api route and one form input)

...etc
