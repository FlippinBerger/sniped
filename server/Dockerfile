# FROM rust:1 as builder
FROM rustlang/rust:nightly as builder
WORKDIR /app
COPY . .
RUN cargo build
# this is for prod
# RUN cargo build --release


FROM debian:buster-slim
COPY --from=builder ./app/target/debug/rusty ./target/debug/server
# this is for prod
# COPY --from=builder /app/target/release/rusty /target/release/server
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8080
RUN apt-get update && apt-get install -y openssl && apt-get install -y ca-certificates
CMD ["./target/debug/server"]
# CMD ["/target/release/server"