.PHONY: server
server:
	cargo run --manifest-path ./server/Cargo.toml

.PHONY: clean
clean:
	docker-compose down
	docker rmi sniped-server
	docker rmi sniped-web

.PHONY: server-up
server-up:
	docker-compose build --pull --no-cache server
	docker-compose start server

# this needs more work. almost working.
.PHONY: restart-server
restart-server:
	docker-compose stop server
	docker-compose rm -f server
	docker rmi sniped-server
	docker-compose build --pull --no-cache server
	docker-compose up -d server

.PHONY: web-up
web-up:
	docker-compose build --pull --no-cache web
	docker-compose start web

# TODO update this to mirror restart-server once that is working
# maybe I should've tested with this one since it's faster... idiot
.PHONY: restart-web
restart-web:
	docker-compose stop web
	docker-compose rm -f web
	docker rmi sniped-web
	docker-compose build --pull --no-cache web
	docker-compose up -d web

.PHONY: down
down:
	docker-compose down

.PHONY: up
up:
	docker-compose up -d

.PHONY: test-with-output
test-with-output:
	cargo test --manifest-path ./server/Cargo.toml -- --nocapture
