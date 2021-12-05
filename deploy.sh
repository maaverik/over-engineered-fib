docker build -t maaverik1/fib-client-k8s:latest -t maaverik1/fib-client-k8s:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t maaverik1/fib-server-k8s:latest -t maaverik1/fib-server-k8s:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t maaverik1/fib-worker-k8s:latest -t maaverik1/fib-worker-k8s:$GIT_SHA -f ./worker/Dockerfile ./worker

# for ease of applying existing k8s configurations which have non-tagged images hardcoded in them
docker push maaverik1/fib-client-k8s:latest
docker push maaverik1/fib-server-k8s:latest
docker push maaverik1/fib-worker-k8s:latest

# for imperatively setting images in k8s deployments and easier debugging later
docker push maaverik1/fib-client-k8s:$GIT_SHA
docker push maaverik1/fib-server-k8s:$GIT_SHA
docker push maaverik1/fib-worker-k8s:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=maaverik1/fib-server-k8s:$GIT_SHA
kubectl set image deployments/client-deployment client=maaverik1/fib-client-k8s:$GIT_SHA
kubectl set image deployments/worker-deployment worker=maaverik1/fib-worker-k8s:$GIT_SHA