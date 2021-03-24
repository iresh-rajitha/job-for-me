const User = require("./user.model");

class Order {
  orderID = 0;
  startDate = "";
  deadline = "";
  comment = "";
  rating = 0;
  description = "";
  to: 0;
  from: 0;
  // buyer=null;
  // seller=null;
  orderDetail: null;

  constructor(
    orderID,
    startDate,
    deadline,
    comment,
    rating,
    description,
    orderDetailID,
    to,
    from
  ) {
    this.orderID = orderID;
    this.startDate = startDate;
    this.deadline = deadline;
    this.comment = comment;
    this.rating = rating;
    this.description = description;
    this.orderDetailID = orderDetailID;
    this.to = to;
    this.from = from;
  }
}
module.exports = Order;
