FROM node:alpine

WORKDIR /usr/src/app/

# 复制文件
COPY ./ ./
# 修改国内源
RUN npm config set registry https://registry.npm.taobao.org/
RUN npm install


EXPOSE 9999

CMD ["node", "src/app.js"]
