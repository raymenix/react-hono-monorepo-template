FROM postgres:16.1-alpine

# Copy in the load-extensions script
COPY load-extensions.sh /docker-entrypoint-initdb.d/

RUN chmod 755 /docker-entrypoint-initdb.d/load-extensions.sh