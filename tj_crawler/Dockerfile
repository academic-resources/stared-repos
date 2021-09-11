FROM python:3.8-alpine as base

WORKDIR  /opt/code

RUN apk add --update --no-cache \
    g++ \
    gcc \
    libxslt-dev \
    libxml2-dev

FROM base

ADD requirements/ /opt/code/requirements

RUN pip install -r requirements/dev.txt