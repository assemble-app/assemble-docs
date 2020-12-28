(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{108:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var o=n(0),r=n.n(o);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var p=r.a.createContext({}),s=function(e){var t=r.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return r.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),b=o,m=u["".concat(i,".").concat(b)]||u[b]||d[b]||a;return n?r.a.createElement(m,l(l({ref:t},p),{},{components:n})):r.a.createElement(m,l({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=b;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=n[p];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},111:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"a",(function(){return i}));var o=n(21),r=n(113);function a(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(o.default)();return{withBaseUrl:(n,o)=>function(e,t,n,{forcePrependBaseUrl:o=!1,absolute:a=!1}={}){if(!n)return n;if(n.startsWith("#"))return n;if(Object(r.b)(n))return n;if(o)return t+n;const i=n.startsWith(t)?n:t+n.replace(/^\//,"");return a?e+i:i}(t,e,n,o)}}function i(e,t={}){const{withBaseUrl:n}=a();return n(e,t)}},113:function(e,t,n){"use strict";function o(e){return!0===/^(\w*:|\/\/)/.test(e)}function r(e){return void 0!==e&&!o(e)}n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return r}))},82:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return p})),n.d(t,"default",(function(){return u}));var o=n(3),r=n(7),a=(n(0),n(108)),i=n(111),l={id:"local_development",title:"Local development",sidebar_label:"Local development"},c={unversionedId:"local_development",id:"local_development",isDocsHomePage:!1,title:"Local development",description:"The easiest way to get started with local development is by forking the hello world template repo and running the docker-compose file.",source:"@site/docs/local_development.md",slug:"/local_development",permalink:"/docs/local_development",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/local_development.md",version:"current",sidebar_label:"Local development",sidebar:"someSidebar",previous:{title:"Getting started",permalink:"/docs/getting_started"},next:{title:"Hello world",permalink:"/docs/hello_world"}},p=[{value:"1. Get an API key",id:"1-get-an-api-key",children:[]},{value:"2. Configure your app",id:"2-configure-your-app",children:[]}],s={toc:p};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"The easiest way to get started with local development is by forking the ",Object(a.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/assemble-app/hello-world-rust"}),"hello world template repo")," and running the docker-compose file."),Object(a.b)("p",null,"This will monitor changes to files in the project and recompile them and deploy them automatically to assemble to enable live code reloads. Your code will update instantly as soon as it uploads without needing to reload the page."),Object(a.b)("h3",{id:"1-get-an-api-key"},"1. Get an API key"),Object(a.b)("h4",{id:"a-go-to-wwwassembleappprofileedit-and-select-generate-key"},"a. Go to ",Object(a.b)("a",Object(o.a)({parentName:"h4"},{href:"http://www.assemble.app/profile/edit"}),"www.assemble.app/profile/edit"),' and select "Generate key".'),Object(a.b)("img",{alt:"Create org",src:Object(i.a)("img/screenshots/generate-api-key.png")}),Object(a.b)("h4",{id:"b-a-message-will-be-displayed-with-your-api-token-copy-down-this-in-your-password-manager-as-it-will-only-be-displayed-once"},"b. A message will be displayed with your API token. Copy down this in your password manager as it will only be displayed once."),Object(a.b)("img",{alt:"Create org",src:Object(i.a)("img/screenshots/view-api-key.png")}),Object(a.b)("h4",{id:"c-take-this-token-and-setup-your-local-environment-to-use-your-api-key"},"c. Take this token and setup your local environment to use your API key."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),'echo "ASSEMBLE_AUTH=[YOUR AUTH KEY]" >> ~/.assemble/.env\necho "export \\$(cat ~/.assemble/.env | sed \'s/#.*//g\' | xargs)" >> ~/.bash_profile\n')),Object(a.b)("h3",{id:"2-configure-your-app"},"2. Configure your app"),Object(a.b)("h4",{id:"a-the-next-thing-you-will-need-is-an-app-id-to-tell-the-local-process-where-to-upload-your-code-to-this-can-be-found-by-selecting-an-app-from-your-organization-page-and-looking-next-to-the-title"},"a. The next thing you will need is an App ID to tell the local process where to upload your code to. This can be found by selecting an app from your organization page and looking next to the title."),Object(a.b)("img",{alt:"Create org",src:Object(i.a)("img/screenshots/find-app-id.png")}),Object(a.b)("h4",{id:"b-now-we-are-ready-to-start-a-project-clone-the-boilerplate-from-github-to-quickly-get-started"},"b. Now we are ready to start a project. Clone the boilerplate from github to quickly get started."),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{className:"language-bash"}),'git clone https://github.com/assemble-app/hello-world-rust\ncd hello-world-rust\necho "ASSEMBLE_APP=[YOUR APP KEY]" >> .env\ndocker-compose --env-file ~/.assemble/.env up\n')),Object(a.b)("h4",{id:"c-you-will-then-get-some-output-that-includes-the-page-that-you-can-view-your-app-on"},"c. You will then get some output that includes the page that you can view your app on:"),Object(a.b)("pre",null,Object(a.b)("code",Object(o.a)({parentName:"pre"},{}),"15:09:47.680 [info]  Optimizing hello_world\n \n15:09:47.976 [info]  Compressing with brotli\n \n15:09:48.920 [info]  Uploading new file\n \n15:09:50.792 [info]  \nNew Version uploaded!\nCall your app:\n     https://www.assemble.app/environment/3300ee5a-26d2-4184-94d7-0097e861b2bc/rpc/\nView your app in browser:\n    https://www.assemble.app/environment/3300ee5a-26d2-4184-94d7-0097e861b2bc/view/\n")),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Every change you make to the source files of your project will cause the project to reload and hot swap the view in your browser.")),Object(a.b)("h4",{id:"d-create-a-new-version-to-deploy"},"d. Create a new version to deploy"),Object(a.b)("p",null,'In order to create a new version of your app to finalize your changes and prepare for deployment, click "Finish editing and create version" link inside the "View" link from the output described above. You can then follow the ',Object(a.b)("a",{href:Object(i.a)("docs/getting_started#deployments")},"steps for deployment"),"."))}u.isMDXComponent=!0}}]);