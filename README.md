##### 
## :heart: Star :heart: the repo to support the project or :smile:[Follow Me](https://github.com/kanchan0).Thanks!

# Stripe_createCharge_Capture_Refund
A express app to check the implementation of Stripe's basic functionality

#### IMPORTANT :- you must have a account on Stripe
##### make your account https://dashboard.stripe.com/login
##### Get secret_key from home->Get your test API keys
##### copy secret_key and paste in the palce of secret_code in this line of server.js
#####  stripe=require('stripe')('secret_code');
##### After every api hit you can check in development what was the status and what was the response.

#### To setup the app in your system
##### 1.clone this repository in your system using 'git clone git@github.com:kanchan0/Stripe_createCharge_Capture_Refund.git'
##### 2.run "npm install" to download all the dependencies from the repository folder
##### 3.There you go. TO run it use "node server.js" or "nodemon server.js"

### Following features are implemented
##### 1. Creating a customer and adding a card to it using token generated while adding card.
##### 2. Creating charges.
##### 3. capturing the charges.
##### 4. refunding partial or full amount.
