FROM mhart/alpine-node:latest

ENV user myuser
ENV HOME=/home/app-user

# set user right away for determinism
RUN addgroup -g 1000 -S $user \
  && adduser -u 1000 -S $user -G $user

# create directory for persistence and give our user ownership
RUN mkdir -p $HOME/app \
  && chown -R $user:$user $HOME \
  && chown -R $user:$user $HOME/app

COPY package.json $HOME/app/

WORKDIR $HOME/app
USER $user

RUN yarn
