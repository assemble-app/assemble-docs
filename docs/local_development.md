---
id: local_development
title: Local development
sidebar_label: Local development
---

import useBaseUrl from '@docusaurus/useBaseUrl';


The easiest way to get started with local development is by forking the [hello world template repo](https://github.com/assemble-app/hello-world-rust) and running the docker-compose file.

This will monitor changes to files in the project and recompile them and deploy them automatically to assemble to enable live code reloads. Your code will update instantly as soon as it uploads without needing to reload the page.


### 1. Get an API key

#### a. Go to [www.assemble.app/profile/edit](http://www.assemble.app/profile/edit) and select "Generate key". 

<img alt="Create org" src={useBaseUrl('img/screenshots/generate-api-key.png')} />


#### b. A message will be displayed with your API token. Copy down this in your password manager as it will only be displayed once. 

<img alt="Create org" src={useBaseUrl('img/screenshots/view-api-key.png')} />


#### c. Take this token and setup your local environment to use your API key.

```bash
echo "ASSEMBLE_AUTH=[YOUR AUTH KEY]" >> ~/.assemble/.env
echo "export \$(cat ~/.assemble/.env | sed 's/#.*//g' | xargs)" >> ~/.bash_profile
```

### 2. Configure your app

#### a. The next thing you will need is an App ID to tell the local process where to upload your code to. This can be found by selecting an app from your organization page and looking next to the title.

<img alt="Create org" src={useBaseUrl('img/screenshots/find-app-id.png')} />


#### b. Now we are ready to start a project. Clone the boilerplate from github to quickly get started.


```bash
git clone https://github.com/assemble-app/hello-world-rust
cd hello-world-rust
echo "ASSEMBLE_APP=[YOUR APP KEY]" >> .env
docker-compose --env-file ~/.assemble/.env up
```

#### c. You will then get some output that includes the page that you can view your app on:

```
15:09:47.680 [info]  Optimizing hello_world
 
15:09:47.976 [info]  Compressing with brotli
 
15:09:48.920 [info]  Uploading new file
 
15:09:50.792 [info]  
New Version uploaded!
Call your app:
     https://www.assemble.app/environment/3300ee5a-26d2-4184-94d7-0097e861b2bc/rpc/
View your app in browser:
    https://www.assemble.app/environment/3300ee5a-26d2-4184-94d7-0097e861b2bc/view/
```

*Every change you make to the source files of your project will cause the project to reload and hot swap the view in your browser.*

#### d. Create a new version to deploy

In order to create a new version of your app to finalize your changes and prepare for deployment, click "Finish editing and create version" link inside the "View" link from the output described above. You can then follow the <a href={useBaseUrl('docs/getting_started#deployments')}>steps for deployment</a>.

