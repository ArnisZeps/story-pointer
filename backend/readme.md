docker compose build --no-cache
curl http://localhost:4000/all                  
docker compose up -d

1. curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"userName":"Another","sessionId":"663a921ceadc44850b20328f"}' \
  http://localhost:4000/session/user

2. curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"sessionId":"123", "userName": "Product Owner"}' \
  http://localhost:4000/session

3. curl --header "Content-Type: application/json" \
  --request DELETE \
  http://localhost:4000/collection  

4. curl http://localhost:4000/all        