// const grpc = require('grpc');
// const messages = require('./ice_cream_pb');
// const services = require('./ice_cream_grpc_pb');

// function main() {
//   const client = new services.IceCreamClient(
//     'localhost:50051', grpc.credentials.createInsecure()
//   );

//   const iceCreamRequest = new messages.IceCreamRequest();
//   iceCreamRequest.setScoops(3);
//   iceCreamRequest.setFlavor('strawberry');

//   client.orderIceCream(iceCreamRequest, function (err, response) {
//     if (err) {
//       console.log('this thing broke!', err);
//     } else {
//       console.log('response from python:', response.getMessage());
//     }
//   })


//   const client2 = new services.IceCreamClient(
//     'localhost:8080', grpc.credentials.createInsecure()
//   );

//   client2.orderIceCream(iceCreamRequest, function (err, response) {
//     if (err) {
//       console.log('this thing broke!', err);
//     } else {
//       console.log('response from golang:', response.getMessage());
//     }
//   })


// }

// const client2 = new services.IceCreamClient(
//   'localhost:8080', grpc.credentials.createInsecure()
// );

// export default client2;

// // main();
