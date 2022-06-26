<p align="center">
  <a href="https://github.com/mocker-nicholas/stripes">
    <img src="https://res.cloudinary.com/dtk2pykqu/image/upload/v1655166745/favicon_l3icig.png" alt="Logo" width=72 height=72>
  </a>

  <h3 align="center">Authy!</h3>

  <p align="center">
    Authy is an application built with React, and calls an API I built with NodeJS and Express. It utilizes react router for the front end navigation, and Redux is used to manage any app wide state. Authy's content is dependent on the responses from the authNetServer API, which talks to an authorize.net sandbox account via it's API. I will post a link to to the authNetServer API's repository below. The primary purpose of Authy is to serve as a more modern and more mobile friendly version of the authorize.net UI for some of authorize.net's core functionality.
    <br>
    <a href="https://github.com/mocker-nicholas/authy/issues">Report bug</a>
    ·
    <a href="https://github.com/mocker-nicholas/authy/issues">Request feature</a>
    .
    <a href="https://github.com/mocker-nicholas/authNetServer">authNetServer API</a>
  </p>
</p>

## Live Demo

- [Live Demo of the Project Here](https://main--benevolent-scone-9283d1.netlify.app/)

## Table of contents

- [Quick start](#quick-start)
- [Status](#status)
- [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Creators](#creators)
- [Thanks](#thanks)

## Quick start

To check out Authy, you can clone a copy for yourself, or you can go [here]('https://main--benevolent-scone-9283d1.netlify.app/')

## IMPORTANT NOTE!

- Authy is for demo purposes only. Created customers will have dummy card data added as a payment method on the backend, and the redirect transaction workflow will accept fake card data that can be found [here under the test card numbers section](https://developer.authorize.net/hello_world/testing_guide.html)

## Core Functionality

- Feel free to start exploring Authy! There is no login or private credentials required to test it out.
- Authy features:

  - Some basic reporting functionality on the home page. This data is pulled in by custom endpoints I built on the backend. Based on industry experience, the daily transaction amounts and totals are commonly requested feature of payment gateways, so they are featured front and center here. The homepage also features a graph built with the transaction totals for the previous week of transaction processing. The data comes from another custom endpoint on the backend, and the chart itself is generated with [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2)

  - Run transactions! You can either generate a random transaction just to get a feel for the transaction workflow, or you can create your own transaction utilizing the authorize.net accept-suite redirect workflow that has been built into Authy. The purpose of this workflow is to keep credit card data away from Authy's and authNetServer's infrastructure to minimize PCI scope. This functionality mimic's real organizational concerns when dealing with credit card data. Some randomly transactions will decline. This is intended behavior to showcase what a user might see if a card declines.

  - Create and charge customers. You can view some demo customers that have already been randomly generated, or you can create your own. You can charge a customer by navigating to their customer profile.

  - View transaction history. Authy has a module to search transactions both past and present. The results are paginated at 20 results per page. You can click the information Icon to view the transaction details page. Based on the transaction's status, you are allowed to void or refund existing transactions!

## Status

- COMPLETED 6/20/2022 - I will be adding the ability to generate a link that can be sent out and used to make a payment from any device. The link will utilize the authorize.net accept hosted redirect workflow.

- Coming soon!: Sort functionality for customer and invoice tables!

## Bugs and feature requests

Have a bug or a feature request? Please search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/mocker-nicholas/authy/issues).

## Creators

**Nicholas Orth**

- <https://github.com/mocker-nicholas>

## Thanks

For looking! A shoutout is in order to Maximilian Schwarzmüller. I built this project after partially completing his React Course which can be found on [Udemy here](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).
