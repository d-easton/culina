package main

import (
	"fmt"
	"log"
	"net"

	chat "./chat"
	ice_cream "./ice_cream"

	"google.golang.org/grpc"
)

func main() {

	// opt := option.WithCredentialsFile("./culina-sdk-admin.json")
	// _, err := firebase.NewApp(context.Background(), nil, opt)
	// if err != nil {
	// 	log.Fatalf("Failed to connect with Firestore with credentials: %v", err)
	// }

	// router := mux.NewRouter()
	// const firePort string = ":1010"
	// router.HandleFunc("/", func(response http.ResponseWriter, request *http.Request) {
	// 	fmt.Fprintln(response, "Firestore aspect up and running...")
	// })
	// router.HandleFunc("/recipes", getRecipes).Methods("GET")
	// router.HandleFunc("/recipe", addRecipe).Methods("POST")
	// log.Println("Server listening on port", firePort)
	// log.Fatalln(http.ListenAndServe(firePort, router))

	port := 50053
	fmt.Println("Listening to server, ", port)

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	} else {
		fmt.Println("GFRPC up and running...")
	}

	s := chat.Server{}
	i := ice_cream.Server{}

	grpcServer := grpc.NewServer()
	// grpcServer.RegisterCodec(baseCodec.NewCodec(), "application/grpc")

	chat.RegisterChatServiceServer(grpcServer, &s)
	ice_cream.RegisterIceCreamServer(grpcServer, &i)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %s", err)
	} else {
		fmt.Println("GFRPC served data...")
	}
}
