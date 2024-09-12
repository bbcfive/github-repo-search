# GitHub Repo Search

A Vue.js application for searching GitHub repositories.

## Preview
https://github-repo-search-plum.vercel.app/

## How to Start the Project

1. Clone the repository:
   ```
   git clone https://github.com/bbcfive/github-repo-search.git
   cd github-repo-search
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Start the development server:
   ```
   yarn serve
   ```

4. Open `http://localhost:8080` in your browser to view the application.

## Other Commands

- Compile and minify for production:
  ```
  yarn build
  ```

- Lint and fix files:
  ```
  yarn lint
  ```

## Directory Structure
```
  github-repo-search/
  ├── public/
  │ └── index.html
  ├── src/
  │ ├── assets/
  │ ├── components/
  │ │ ├── RepositorySearch.vue
  │ │ ├── RepositoryItem.vue
  │ │ ├── LanguageFilter.vue
  │ │ ├── StarFilter.vue
  │ │ ├── DateRangeFilter.vue
  │ │ └── RepositoryList.vue
  │ ├── services/
  │ │ └── github-api.js
  │ ├── stores/
  │ │ └── search-store.js
  │ ├── MainPage.vue
  │ └── main.js
  ├── .gitignore
  ├── babel.config.js
  ├── package.json
  └── README.md
```


## Component Introduction

1. `MainPage.vue`: The main component of the application, containing the overall layout.

2. `RepositorySearch.vue`: Search component that allows users to input keywords to search for GitHub repositories.

3. `RepositoryList.vue`: List component that displays search results, showing basic information about the repositories.

4. `RepositoryItem.vue`: Item component that displays a single repository's information.

5. `LanguageFilter.vue`: Filter component that allows users to filter repositories by language.

6. `StarFilter.vue`: Filter component that allows users to filter repositories by stars.

7. `DateRangeFilter.vue`: Filter component that allows users to filter repositories by date range.

8. `search-store.js`: Store component that allows users to filter repositories by date range.

9. `github-api.js`: API component that allows users to filter repositories by date range.

## Custom Configuration

See [Configuration Reference](https://cli.vuejs.org/config/) for more configuration options.

## Contributing

Issues and pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)