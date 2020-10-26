# Contribution Guidelines
Follow these guidelines to contribute to this project. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request. 

## Pull request process
### 1. Create an issue 
Discuss the change you wish to make to the project e.g a bug fix, adding a new feature, etc, by creating an issue on the Project's issue tracker board.

### 2. Create a branch
After creating an issue, set up the project on your machine (if you haven't already) by following the instructions in the projects [README](). Before adding your changes,
switch to the `develop` branch. The develop branch serves as an integration branch for features. Switch to the develop branch by typing `git checkout develop`. 
Then create your new branch off develop. To create your new branch, use the following branching conventions:
- Branches created should be named using the following format:  `{story type}-{2-3 word summary}`.  
- A story type indicates the type of contribution you are adding. A story type can be one of the following:
  - ft: A new feature
  - fix: A bug fix
  - ch: Development changes related to the build system (involving scripts, configurations or tools) and package dependencies. No major production code change.
  - docs: An update to the project's documentation e.g the README

Example branch: `ft-search-filters`.  
**Remember, never add your changes directly to the master or develop branches**

### 3. Commit your changes
After adding your changes, create a commit. Use the following conventions for your commit messages.
- Your commit messages should be structured as follows: `<type>[optional scope]: <description>- `
- `<type>` can be one of the following.
  - feat (A feature)
  - fix (A bug fix)
  - chore
  - release
  - refactor
  - docs
  - test (Adding tests)
- A scope is an optional information (attached to the prefix) that represents the context of the change. Example: `docs(readme)`. Here, readme is the scope of 
this commit, this means that the change affects the project's README.
- `<description>` Keep your commit descriptions short and clear. When writing commit descriptions,
  - Use the present tense ("Add xyz endpoint" not "Added xyz endpoint")
  - Make it at most 72 characters.
  - You can reference issues the commit solves (e.g ticket number) to provide more information
  
### 4. Document all your changes
Always update the documentation after making any change (this also includes adding adequate comments to your code). This is very important as it informs other developers on the team (even future developers that will work on 
this project) of the changes you have made and helps them understand your changes. Documenting every change you make is very key to the maintainability of this project.

### 5. Quality checks
After making your changes, run existing tests to ensure that nothing was broken. Make sure you write additional tests for all the changes you made. Also, ensure that 
your code conforms to the project's style guide.

### 6. Create a pull request
Push your changes, and create a Pull request to the develop branch (i.e set the base branch of the PR to develop). Ensure you fill all the necessary information specified in the PR template. After creating a
pull request, verify that all the CI checks are passing and there is no merge conflict with the base branch. If you discover a merge conflict, please resolve the conflict locally.

### 7. Request a review
After successfully creating a PR, request a review from another developer, so your changes can be merged.

### 8. Deployment
Any code change on the master branch or develop branch triggers a Github workflow that deploys the app to production and staging environments respectively. Currently, deployments are hosted on heroku. If the need to migrate the app to another cloud hosting service arises, edit the `deploy_to_staging` and  `deploy_to_production` jobs in the CICD workflow.

