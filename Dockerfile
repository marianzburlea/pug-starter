FROM --platform=amd64 node:14.16.0
WORKDIR /app
COPY gulp /app/
# COPY CHANGELOG.md /app/
# COPY README.md /app/
COPY npm-shrinkwrap.json /app/
# COPY yarn.lock /app/
# COPY Dockerfile /app/
COPY package.json /app/
# COPY LICENSE /app/
COPY gulpfile.babel.js /app/
COPY src /app/

RUN yarn
CMD [ "yarn", "start" ]
