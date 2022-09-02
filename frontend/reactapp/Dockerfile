FROM node:16.16.0-alpine
WORKDIR /reactapp
ENV PATH = "./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm","start"]