# Variables
PORT ?= 8080
CONTAINER_NAME = static-website

# Run locally with live reload
.PHONY: dev
dev:
	npx live-server --port=$(PORT) --watch=.

# Build Docker image
.PHONY: docker-build
docker-build:
	docker build -t $(CONTAINER_NAME) .

# Run Docker container (production)
.PHONY: docker-run
docker-run:
	docker run --rm -p $(PORT):80 --name $(CONTAINER_NAME) $(CONTAINER_NAME)

# Stop Docker container
.PHONY: docker-stop
docker-stop:
	docker stop $(CONTAINER_NAME) || true

# Clean Docker image
.PHONY: docker-clean
docker-clean:
	docker rmi $(CONTAINER_NAME) || true

