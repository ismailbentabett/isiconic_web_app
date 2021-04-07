/* import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import request from 'request'
import config from './../../config/config'
import stripe from 'stripe'

const myStripe = stripe(config.stripe_test_secret_key)

module.exports.stripe_auth = (req, res, next) => {
  request({
    url: "https://connect.stripe.com/oauth/token",
    method: "POST",
    json: true,
    body: {
      client_secret: config.stripe_test_secret_key,
      code: req.body.stripe,
      grant_type: 'authorization_code'
    }
  }, (error, response, body) => {
    //update user
    if (body.error) {
      return res.status('400').json({
        error: body.error_description
      })
    }
    req.body.stripe_seller = body
    next()
  })
}

module.exports.stripeCustomer = (req, res, next) => {
  if (req.profile.stripe_customer) {
    //update stripe customer
    myStripe.customers.update(req.profile.stripe_customer, {
      source: req.body.token
    }, (err, customer) => {
      if (err) {
        return res.status(400).send({
          error: "Could not update charge details"
        })
      }
      req.body.order.payment_id = customer.id
      next()
    })
  } else {
    myStripe.customers.create({
      email: req.profile.email,
      source: req.body.token
    }).then((customer) => {
      User.update({
          '_id': req.profile._id
        }, {
          '$set': {
            'stripe_customer': customer.id
          }
        },
        (err, order) => {
          if (err) {
            return res.status(400).send({
              error: errorHandler.getErrorMessage(err)
            })
          }
          req.body.order.payment_id = customer.id
          next()
        })
    })
  }
}

module.exports.createCharge = (req, res, next) => {
  if (!req.profile.stripe_seller) {
    return res.status('400').json({
      error: "Please connect your Stripe account"
    })
  }
  myStripe.tokens.create({
    customer: req.order.payment_id,
  }, {
    stripeAccount: req.profile.stripe_seller.stripe_user_id,
  }).then((token) => {
    myStripe.charges.create({
      amount: req.body.amount * 100, //amount in cents
      currency: "usd",
      source: token.id,
    }, {
      stripeAccount: req.profile.stripe_seller.stripe_user_id,
    }).then((charge) => {
      next()
    })
  })
} */