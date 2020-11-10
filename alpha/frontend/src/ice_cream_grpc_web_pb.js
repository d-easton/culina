/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck
// @ts-ignore


const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./ice_cream_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.IceCreamClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.IceCreamPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.IceCreamRequest,
 *   !proto.IceCreamResponse>}
 */
const methodDescriptor_IceCream_OrderIceCream = new grpc.web.MethodDescriptor(
  '/IceCream/OrderIceCream',
  grpc.web.MethodType.UNARY,
  proto.IceCreamRequest,
  proto.IceCreamResponse,
  /**
   * @param {!proto.IceCreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.IceCreamResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.IceCreamRequest,
 *   !proto.IceCreamResponse>}
 */
const methodInfo_IceCream_OrderIceCream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.IceCreamResponse,
  /**
   * @param {!proto.IceCreamRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.IceCreamResponse.deserializeBinary
);


/**
 * @param {!proto.IceCreamRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.IceCreamResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.IceCreamResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.IceCreamClient.prototype.orderIceCream =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/IceCream/OrderIceCream',
      request,
      metadata || {},
      methodDescriptor_IceCream_OrderIceCream,
      callback);
};


/**
 * @param {!proto.IceCreamRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.IceCreamResponse>}
 *     A native promise that resolves to the response
 */
proto.IceCreamPromiseClient.prototype.orderIceCream =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/IceCream/OrderIceCream',
      request,
      metadata || {},
      methodDescriptor_IceCream_OrderIceCream);
};


module.exports = proto;

