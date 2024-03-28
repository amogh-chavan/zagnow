# Use official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=zagnow

# Install dependencies
RUN apt-get update && apt-get install -y \
    wget \
    gnupg2 \
    curl \
    sudo \
    && apt-get clean

# Expose the PostgreSQL port
EXPOSE 5433

# Start PostgreSQL service (using default entrypoint)
CMD ["postgres"]

