const WebSocket = require('ws');
const protobuf = require('protobufjs');
const path = require('path');

// 加载 .proto 文件
const root = new protobuf.Root();
root.loadSync(path.join(__dirname, './message.proto'));

// 获取 Message 类型
const Message = root.lookupType('Message');

// 创建 WebSocket 服务器
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket: any) => {
    console.log('Client connected');

    // 接收客户端发送的消息
    socket.on('message', (data: Buffer) => {
        const message = Message.decode(new Uint8Array(data));
        console.log('Received message:', message);

        // 发送响应消息
        // const response = { text: 'Hello, client!'};
        // const buffer = Message.encode(Message.fromObject(response)).finish();
        // socket.send(buffer);

        const response = Message.create({ text: `服务端已收到数据: ${message.text}` });
        // 序列化消息对象，并将其发送给服务器
        const buffer = Message.encode(response).finish();
        socket.send(buffer);
    });

    // 监听连接断开事件
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});

const http = require('http');
const fs = require('fs');

// 创建 HTTP 服务器，监听客户端请求
const httpserver = http.createServer(async (req:any , res: any) => {
    console.log(`Receive request: ${req.method} ${req.url}`);

    try {
        // 如果请求的是 .proto 文件，则读取文件内容并返回给客户端
        if (req.url.endsWith('.proto')) {
            const content = await fs.promises.readFile(`${path.join(__dirname, './message.proto')}`, 'utf8');
            res.setHeader('content-type', 'text/plain');
            res.end(content);
            return;
        }

        // 如果请求的不是 .proto 文件，则返回 404 Not Found 错误
        res.statusCode = 404;
        res.end();
    } catch (err) {
        console.error(err);
        res.statusCode = 500;
        res.end();
    }
});

// 启动 HTTP 服务器
httpserver.listen(3001, () => {
    console.log('HTTP server started!');
});
