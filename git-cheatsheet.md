# Git Cheat Sheet

## Creating a feature branch

```sh
git checkout main
git branch <your branch name>
git checkout <your branch name>

```

Shorter version:

```sh
git checkout main
git checkout -b <your branch name>
```

## Adding new content

Add new commits to your local branch (just a recall): 

 ```sh
git add .
git commit -m "<your commit message>"
```

Push to GitHub (remote) for the first time:

```sh
git push --set-upstream origin <your brance name>
```

Push to Github (remote), if the branch is already pushed:

```sh
git push
```

## Getting changes from others

Update your branch (main or feature).

```sh
git pull
```

## Updating your feature branch with the main/development

1. Change to main.
2. Pull main.
3. Change to your feature branch.
4. Merge main to your feature branch.

```sh
git checkout main
git pull
git checkout <your feature branch>
git merge main
```

A shorter version:

1. Change / stay on your feature branch.
2. Fetch the changes from GitHub (remote).
3. Merge **origin/main** to your feature branch

```sh
git checkout <your feature branch>
git fetch
git merge origin/main
```

## Listing remote repositories

```sh
git remote -v
```

## Background materials

- [Atlassian's introduction to git](https://www.atlassian.com/git/tutorials/what-is-version-control)
- [Atlassian: Saving changes](https://www.atlassian.com/git/tutorials/saving-changes)
- [Atlassian: Syncing](https://www.atlassian.com/git/tutorials/syncing)
- [Atlassian: Making a pull request](https://www.atlassian.com/git/tutorials/making-a-pull-request)
  - This material refer's to Bitbucket's (similar to GitHub) user interface, but the explanation's are correct for GitHub too.
- [Atlassian: Using branches](https://www.atlassian.com/git/tutorials/using-branches)% 