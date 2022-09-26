FROM mhart/alpine-node:16

ADD package.json yarn.lock /
RUN yarn
ADD index.js /
RUN chmod +x /index.js

ENTRYPOINT ["node", "/index.js"]
