# task-management

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

The design choice is sort of combination of task management tools like Trello or Jira, since this sort of tasks organization allows to easily track and handle tasks in the flow.
<img width="1162" alt="Screenshot 2024-08-14 at 00 22 11" src="https://github.com/user-attachments/assets/705d0f88-d523-4274-b6ab-b156c1820f31">

In terms of libraries almost everything is written from scratch. Have not picked any UI libraries, but in real world used all of existing ones and enjoy ready solutions :)
```
@vueuse/core - was picked for interaction with localStorage, but could be easily achieved with native watchers, just more code
```
