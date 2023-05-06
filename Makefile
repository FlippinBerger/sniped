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

.PHONY: restart-server
restart-server:
	docker-compose stop server
	docker-compose rm -f server
	docker rmi sniped-server
	docker-compose build --pull --no-cache server
	docker-compose start server

.PHONY: web-up
web-up:
	docker-compose build --pull --no-cache web
	docker-compose start web

.PHONY: restart-web
restart-web:
	docker-compose down 
	docker rmi sniped-web
	docker-compose build --pull --no-cache web
	docker-compose start web


.PHONY: down
down:
	docker-compose down

.PHONY: up
up:
	docker-compose up -d

.PHONY: fup
	docker-compose build --pull --no-cache
	docker-compose up