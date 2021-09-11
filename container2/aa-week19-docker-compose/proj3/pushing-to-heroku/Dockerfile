FROM node:12.18.2-alpine3.9

WORKDIR /

COPY ./wait-for ./
COPY ./backend ./

ENV NODE_ENV=production
ENV JWT_SECRET=aaa967f1-2b08-4dde-a086-5df6bc8eff91
ENV JWT_EXPIRES_IN=604800

# RUN mkdir ./public
COPY ./frontend/build/ ./public

CMD npm start
