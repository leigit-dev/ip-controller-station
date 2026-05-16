// 路由：/api/iru （实际访问路径为 /iru，见下方说明）
export async function onRequest(context) {
  // 返回 "404 Not find"，状态码 666
  return new Response("404 Not find", { status: 666 });
}