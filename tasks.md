# Tasks

- Work in separate branches.
- Always open a PR and do a *meaningful* code review.
- Only merge a branch if all the tests are passed.

## 1. Get familiar with the codebase

Answer the following questions:

- In which file we can found the entrypoint of the application?
- What is this `process.argv`?
- What are the main responsibilities of the `createApp` in the `app.js`?
- What kind of functions can be found in `todo.js`?
- How a new ID is generated to the todo if it is added?
- What kind of functions can be found in `validate.js`?
- Which modules are covered with tests?
- What do you think what is the advantage of extracting the file handling logic to the `file-store.js` and pass the store to the app and the underlying functions? Is this pattern familiar for you?
- Why this AppError is created? For what does it good for?

## 1.1 Check the GitHub actions

- Check the automated tests executed by GitHub actions.
- They are failing, what is the issue?
- Correct them in a new branch.


## 2. User story: Complete a TODO

As a user I can complete a todo, so my todos can be updated.

- A new command 'complete' is added to the app.
- It has one parameter, the ID of the todo. It should be numeric. If it is not numeric an an AppError with a meaningful error message should be thrown.
- If the ID is found the corresponding todo's done property must be set to true. And the updated todo should be displayed to the user.
- If the ID is not found, a new AppError should be thrown with a meaningful error message.
- The new case should be covered with tests.

## 3. User story: Find by ID

As a user I can search among my todos by ID, so I can check one todo status if I have many.

- A new command 'find-by-id' is added to the app.
- It has one parameter, the ID of the todo. It should be numeric. If it is not numeric an an AppError with a meaningful error message should be thrown.
- If the ID is found the corresponding todo should be displayed to the user.
- If the ID is not found, a new AppError should be thrown with a meaningful error message.
- The new case should be covered with tests.

## 4. User story: Find by title

As a user I can search among my todos by title, so I can find a todo if I have many, even if I do not remember the exact title.

- A new command 'find-by-title' is added to the app.
- It has one parameter, a string. It should be at least 3 characters long or a new AppError should be thrown with a meaningful error message.
- Look for the titles of all todos. Collect one or more todos if the title contains case insensitive the parameter.
- Display the todos to the user. If no todos found with this title do not show any error just a meaningful message about not found todos.
- Cover the new functionality with tests.

## 5. User story: Find by status

As a user I can filter my todos by done / not done status, 
so I can review my progress or check my remaining tasks.

- A new command 'find-by-status' is added to the app.
- It has one parameter a string "done" or "not-done". Show a meaningful error message to the user, if not one of these two strings given, or no string given.
- Display the todos with the given status only to the user, or a meaningful message (not error) if there is no todos found with that status.
- Cover the new functionality with tests.

## 6. User story: Edit title

As a user I can change the title of a todo, so I can correct my mistakes.

- A new command "update-title" is added to the app.
- It has two params, an ID and the new title as a string. The ID should be numeric and a string should be at least 1 character long or a meaningful error should be shown to the user.
- If the todo with the given ID is not found, show a meaningful Error message to the user.
- If the ID is found, change the the todo, save the changes to the store, and show the user the changed todo.
- Cover the new functionality with tests.

## 7. Refactor the todo.js

This task is initiated by your developer team. Wait for the previous task to be completed before doing this task. 

Maybe there are some code duplication now in the `todo.js`.
It unfortunately hurts the DRY and maybe the separation of concerns clean coding principles.

Refactor the `todo.js` but do not change its exported functions' signatures. Try to generalize some functionalities within `todo.js` and extract it to some 
not exported functions.

This is a refactoring task, because we have a bunch of tests we can do it safely.

Does the tests are passed?

## 8. User Story: Delete todos

As a user, I can delete a todo, so I can correct my mistakes.

- A new 'delete' command is added to the application.
- It has one parameter, an ID. If this ID is not numberic, throw a meaningful error message to the user.
- If the todo with a given ID not found, show  meaningful error message to the user.
- If the todo is found, modify the store, by removing this todo.
- Cover the new functionality with tests.

## 9. User Story: Add labels

As a user, I can add one or more label to my todo, so I can group them.

- A new 'add-label' command is added to the app.
- It has two parameters, a todo ID and a string. 
- The ID should be numeric, and a string has to be at least 1 character long or show a meaningful error message to the user.
- If the todo with a given ID not found, show  meaningful error message to the user.
- If the todo is found, use a new `labels` key of the todo object to store the label. It is an array, it can have multiple elements.
- If the key is already exists in this array, do not add it again, but this is not an error case.
- If a new todo is created, the `labels` key should be exists as an `[]` on it.
- Labels can be case sensitive, so 'pets' and 'Pets' are two different labels.
- You can delete your `todos.json` you do not need to convert between the formats. 
- Cover the new functionality with tests.


## 10. User Story: Show the labels when displaying a todo

As a user I can check the added labels when listing my todos.

- When listing the todos, or showing the modified todos
to the user add the labels to formatting of the todos.
- The format should be `<ID> - [<✅ or " ">] (<labels>) <title>`.
- For example: `4 - [ ] (household, pets) Clean the cat poo.`
- Cover the new functionality with tests.


## 11. User Story: Delete a label.

As a user I can delete a label from a todo, so I can maintain my grouping.

- Add a new 'delete-label' command to the app.
- It has two parameters an ID and a string. The ID must be numeric, the string must be at least 1 char long. Show a meaningful error message to the user, if something is failed.
- If the todo with a given ID not found, show  meaningful error message to the user.
- If the todo is found, remove the label from the `labels` key and store the changed todo. If the label is not found among the labels it is not an error case.
- Cover the new functionality with tests.

## 12. User Story: Find by label

As a user I can filter my todos by a label, so I can check my grouping easily.

- Add a new 'find-by-label' command to the app.
- It has one parameter a non-zero length string. If it is not given, show a meaningful error message to the user.
- Show the users the todos only where the given label can be found among the `labels` key array items. (exact, case sensitive match).
- If there is no todos found, it is not an error case, just notify the user with a meaningful message.

## 13. Refactor the todo.js

Another refactoring session for the `todo.js` file.