package ice_cream

import (
	"fmt"
	"log"

	"golang.org/x/net/context"
)

type Server struct {
}

func (s *Server) OrderIceCream(ctx context.Context, request *IceCreamRequest) (*IceCreamResponse, error) {
	log.Printf("Receive ice cream from client: %s", request)
	message := fmt.Sprintf("Receive ice cream from client: %s", request)

	// meta := grpc.Metadata()
	// meta.RegisterCodec(json.NewEncoder(), "application/grpc+proto")

	// md, _ := metadata.FromIncomingContext(ctx)
	// log.Printf("Metadata: %s", md)
	// ctx = metadata.NewOutgoingContext(context.Background(), md)
	// grpc.SendHeader(ctx, md)
	// log.Printf("New Context: %s", ctx)

	// // message.Header().Set("Content-Type", "application/grpc")
	// // header := metadata.Pairs("Content-Type", "application/grpc+proto")

	// header := metadata.Pairs("header-key", "val")
	// grpc.SendHeader(ctx, header)
	// // create and set trailer
	// trailer := metadata.Pairs("trailer-key", "val")
	// grpc.SetTrailer(ctx, trailer)

	// grpc.SetHeader(ctx, md)

	r := &IceCreamResponse{Message: message}
	// r.Header().Add("Content-Type", "application/grpc")
	return r, nil

}
