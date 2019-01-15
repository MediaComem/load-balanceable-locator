# Load Balanceable Locator

IP locator web application that can be used to demonstrate
[load balancing][lb] with a [reverse proxy][rp] such as [Apache][apache] or [nginx][nginx].

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Run in development mode](#run-in-development-mode)
  - [Run in production mode](#run-in-production-mode)
- [Configuration](#configuration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Installation

### Requirements

* [Node.js][node] 10.x

### Setup

* Clone the repository.
* Install dependencies.

  ```
  cd /path/to/repo
  npm install
  ```
* Set up environment variables for [configuration](#configuration) if needed.

### Run in development mode

```
cd /path/to/application
npm run dev
```

### Run in production mode

```
cd /path/to/application
npm start
```



## Configuration

The following environment variables can be set to customize the application's behavior:

Variable           | Default value | Description
:---               | :---          | :---
`BACKGROUND_COLOR` | `white`       | Page background color (HTML color like `red` or color code like `#ccffff`).
`BASE_URL`         | *none*        | Base URL at which the application is deployed.
`PORT`             | 3000          | Port on which to listen to.

Set the background color to visually differentiate application instances when doing load balancing.



[apache]: https://www.apache.org
[lb]: https://en.wikipedia.org/wiki/Load_balancing_(computing)
[nginx]: http://nginx.org
[rp]: https://en.wikipedia.org/wiki/Reverse_proxy
