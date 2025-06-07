# Stage 1: Use Nginx to serve static content
FROM nginx:alpine

# Copy website files to Nginx web root
COPY public /usr/share/nginx/html
COPY index.html /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY main.js /usr/share/nginx/html

# Optional: Custom Nginx config
# COPY nginx.conf /etc/nginx/nginx.conf

