<template>
  <div style="width: 100%; height: 200px; background: darkgrey">
    <div>{{ messageRef }}</div>
    <button @click="sendMsg"> 发送 </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import protobuf from 'protobufjs';

// 定义要加载的 .proto 文件 URL
const protoUrl = '/path/to/your/message.proto';

// 定义响应消息的状态
const messageRef = ref('');
const response = await fetch(protoUrl);
const content = await response.text();
// 解析 .proto 文件中的消息结构
const root = await protobuf.parse(content).root;
const MyMessage = root.lookupType('Message');

// 创建 WebSocket 连接
const ws = new WebSocket('ws://localhost:8080/');

// 监听 WebSocket 连接成功事件
ws.addEventListener('open', () => {
  console.log('WebSocket connected!');

  // 序列化消息对象，并将其发送给服务器
  const response = MyMessage.create({ text: '客户端1连接了' });
  // 序列化消息对象，并将其发送给服务器
  const buffer = MyMessage.encode(response).finish();
  ws.send(buffer);
});

// 监听 WebSocket 收到服务器发送过来的消息事件
ws.addEventListener('message', async (event) => {
  // 解析二进制数据为 Protobuf 消息
  const blob: Blob = event.data;
  const buffer = await blob.arrayBuffer();
  const data = new Uint8Array(buffer);
  const message = MyMessage.decode(data);
  console.log(`Receive message from server: ${JSON.stringify(message)}`);

  // 更新视图显示收到的消息内容
  messageRef.value = message.text;
});

// 监听 WebSocket 出错事件
ws.addEventListener('error', (event) => {
  console.error(event);
});

// 监听 WebSocket 关闭事件
ws.addEventListener('close', (event) => {
  console.warn(event);
});

const sendMsg = () => {
  const message = MyMessage.create({ text: '我是客户端1' });
  // 序列化消息对象，并将其发送给服务器
  const buffer = MyMessage.encode(message).finish();
  ws.send(buffer);
};
</script>
