// 捕获所有其他未定义路由，返回 404
export async function onRequest(context) {
  return new Response("404 Not find", { status: 404 });
}