## Installations

brew install go and npm (if you don't have either of them)

1.  npm install -g request
2.  npm config set unsafe-perm true
3.  npm install protoc-gen-grpc -g
4.  npm install grpc google-protobuf @grpc/proto-loader
5.  go get -u github.com/golang/protobuf/protoc-gen-go
6.

should be done from proto folder 5. python -m grpc_tools.protoc -I. --python_out=../server/hi/ --grpc_python_out=../server/hi/ \*

6.  protoc-gen-grpc --js_out=../client/hi/ --grpc_out=../client/hi _
    or protoc-gen-grpc --js_out=import_style=commonjs,binary:../client/hi/ --grpc_out=../client/hi _

7.  protoc --go_out=plugins=grpc:../go_server/ \*

protoc ice_cream.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.

docker run -d -v "$(pwd)"/proxy/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8082:8082 -p 8090:8090 envoyproxy/envoy:v1.14.1
docker run -d -v "$(pwd)"/proxy/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8080:8080 -p 9901:9901 envoyproxy/envoy:v1.14.1
docker run -d -v "$(pwd)"/proxy/envoy.yaml:/etc/envoy/envoy.yaml:ro -p 8087:8087 -p 8090:8090 envoyproxy/envoy:v1.14.1

docker ps
export PATH=$PATH:/usr/local/go/bin
sudo chmod 666 /var/run/docker.sock

https://askubuntu.com/questions/8653/how-to-keep-processes-running-after-ending-ssh-session

to get most updated version live on site
cd frontend
npm run build
upload build folder to bucket
open cloud shell
gsutil rsync -r gs://culina-e7a1d.appspot.com ./app
cd app
gcloud config set project culina-e7a1d
gcloud app deploy

lsof -i :8085
