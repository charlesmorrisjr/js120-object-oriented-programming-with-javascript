function createInvoice(services = {}) {
  if (services.phone === undefined) services.phone = 3000;
  if (services.internet === undefined) services.internet = 5500;

  let obj = {
    phone: services.phone,
    internet: services.internet,

    total: function () {
      return this.phone + this.internet;
    }
  };

  return obj;
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000
