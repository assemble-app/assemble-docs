---
id: getting_started
title: Getting started
sidebar_label: Getting started
---
import useBaseUrl from '@docusaurus/useBaseUrl';


You can write content using [Assemble](https://www.assemble.app/).

## Basic building blocks

### Organizations

All data on the platform is partitioned by organization. An organization holds apps and environments as well as memberships and groups. When you first login with assemble you will be prompted to create an organization.

<img alt="Create org" src={useBaseUrl('img/screenshots/create-org.png')} />

### Environments
Next you will create an environment to hold your data and events. Environments are isolated meaning you cannot access data or events directly from one environment to another, you must go through the RPC functionality.

<img alt="Create environment" src={useBaseUrl('img/screenshots/create-env-prompt.png')} />

<img alt="Create environment" src={useBaseUrl('img/screenshots/create-env.png')} />


#### Public environments
Making your environment public will allow other users that are not members of groups associated with the environment to view the deployed app as well as the markdown description.

### Apps

In order to deploy code to an environment you first need an App. Continue following the in-app prompts to create an App.

<img alt="Create app" src={useBaseUrl('img/screenshots/create-app-prompt.png')} />

<img alt="Create app" src={useBaseUrl('img/screenshots/create-app.png')} />


#### Public apps
Making your app public will allow other users that are not members of groups associated with the app to fork your from public environments into their own accounts.


### Versions

Follow the prompt to create a new version from a template. This is the easiest way to quickly get started on coding.

<img alt="Create version" src={useBaseUrl('img/screenshots/create-version-prompt.png')} />

You will be taken to the code editor where you will be able to edit and preview the next version of your code. Click the "Run and show" button to get started.

<img alt="Create version" src={useBaseUrl('img/screenshots/create-version.png')} />



#### Buttons
* Run and show
    * Compile the code and run it in the browser
* Show endpoints
    * Show links to open your current code in another tab and access from the command line.
* Publish
    * Compile the current code and save it as a new version of the app for deployment

#### Cargo.toml
The in browser editor uses the following Cargo.toml file:

```toml
[package]
name = "hello-world"
version = "0.1.0"
authors = ["Bob <info@assemble.app>"]

[lib]
crate-type = ["cdylib"]

[dependencies]
assemble_app = "0.1.0"
serde = { version = "1.0.114", features = ["derive"] }
maud = "*"
chrono = "*"

[profile.release]
lto = true
opt-level = 's'
```

#### Finalize Version

When you are finish editing the code, press "Publish" to create a new version of the app. Now we are ready to deploy to an environment.

<img alt="Create version" src={useBaseUrl('img/screenshots/create-version-final.png')} />


### Deployments

With the version ready we are finally ready to deploy. Click the deploy button next to the version to start the deployment process.

<img alt="Create deployment" src={useBaseUrl('img/screenshots/create-deployment-prompt.png')} />

Select the environment you want to deploy to.

<img alt="Create deployment" src={useBaseUrl('img/screenshots/create-deployment.png')} />

Your app is now live and ready to use!