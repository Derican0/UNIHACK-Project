#!/bin/bash

# Start Docker Compose
docker compose up --build &

# Wait for the backend server to start
sleep 10

# Open the backend in the browser
echo "Opening backend in browser..."
open http://localhost:8000

# Wait for the frontend server to start
sleep 10      

# Open the frontend in the browser
echo "Opening frontend in browser..."
open http://localhost:8081