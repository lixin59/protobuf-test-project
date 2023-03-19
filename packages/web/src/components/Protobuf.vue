<template>
  <div style="width: 100%; height: 200px; background: #d3d3d3">
    <code>{{ messageRef }}</code>
    <button @click="sendMsg"> 发送 </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Message } from './compiled'; // 使用protobufjs-cli编译出来的包

const messageRef = ref('');
// 创建 WebSocket 连接
const ws = new WebSocket('ws://localhost:8080/');

// 监听 WebSocket 连接成功事件
ws.addEventListener('open', () => {
  console.log('WebSocket connected1!');
  // 序列化消息对象，并将其发送给服务器
  const buffer = Message.encode({ text: '客户端2连接了' }).finish();
  ws.send(buffer);
});

// 监听 WebSocket 收到服务器发送过来的消息事件
ws.addEventListener('message', async (event) => {
  // 解析二进制数据为 Protobuf 消息
  const blob: Blob = event.data;
  const buffer = await blob.arrayBuffer();
  const data = new Uint8Array(buffer);
  const message = Message.decode(data);
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
  // 序列化消息对象，并将其发送给服务器
  const buffer = Message.encode({ text: '我是客户端2' }).finish();
  ws.send(buffer);
};
</script>
