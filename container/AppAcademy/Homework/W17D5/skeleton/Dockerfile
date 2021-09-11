# This shows how we can extend an existing official image from Docker Hub

FROM nginx:1.15-alpine
# Always pin a version. It'll make development so much easier. 

# Change our working directory to the root of nginx webhost
# using WORKDIR is preferred to using 'RUN cd /some/path'
WORKDIR /usr/share/nginx/html

# Copy in the file!
COPY index.html index.html
# Don't have to specify EXPOSE or CMD because they're in my FROM
