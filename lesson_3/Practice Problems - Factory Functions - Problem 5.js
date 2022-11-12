/* eslint-disable max-lines-per-function */
function createInvoice(services = {}) {
  if (services.phone === undefined) services.phone = 3000;
  if (services.internet === undefined) services.internet = 5500;

  let obj = {
    phone: services.phone,
    internet: services.internet,
    total: services.phone + services.internet,

    addPayment: function (payment) {
      this.total -= payment.amount;
    },

    addPayments: function (payment) {
      for (let obj of payment) {
        this.total -= obj.amount;
      }
    },

    amountDue: function () {
      console.log(this.total);
    },

  };

  return obj;
}

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

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
invoice.amountDue();       // this should return 0