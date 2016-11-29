var express = require('express');
var router = express.Router();
var braintree = require('braintree');


/* GET home page. */

router.get('/', function(req, res, next) {

  var gateway = braintree.connect({

    accessToken: 'access_token$sandbox$w6y2gkhkr9wrttvp$2bc598c5d51e6525c13d680201cc4324'

  });

  gateway.clientToken.generate({}, function (err, response) {

    res.render('index', {title: 'Express', clientToken: response.clientToken });

  });

});

router.post("/checkout", function (req, res) {

  // Use payment method nonce here

  var gateway = braintree.connect({

    accessToken: 'access_token$sandbox$w6y2gkhkr9wrttvp$2bc598c5d51e6525c13d680201cc4324'

　});

  var saleRequest = {

    amount: req.body.amount,

    merchantAccountId: "JPY",

    paymentMethodNonce: "" + req.body.payment_method_nonce,

    options: {

      submitForSettlement: true

    }

  };

  gateway.transaction.sale(saleRequest, function (err, result) {

    if (err) {

      res.send("<h1>Error:  " + err + "</h1>");

    } else if (result.success) {

      res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");

    } else {

      res.send("<h1>Error:  " + result.message + "</h1>");

    }

  });

});

module.exports = router;