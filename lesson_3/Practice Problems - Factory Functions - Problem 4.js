function createPayment(services = {}) {
  if (services.internet === undefined) services.internet = 0;
  if (services.phone === undefined) services.phone = 0;
  if (services.amount === undefined) {
    services.amount = services.internet + services.phone;
  }

  return {
    internet: services.internet,
    phone: services.phone,
    amount: services.amount,

    total: function () {
      return this.amount;
    }
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000
