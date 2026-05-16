// 路由：/touroku?name=xxx&password=xxx
// 使用 B 端密码（固定，从环境变量或默认常量读取）
const DEFAULT_B_PASSWORD = "fixed-b-password-2025";

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  const password = url.searchParams.get("password");

  // 获取 B 端密码
  const bPassword = DEFAULT_B_PASSWORD;

  if (!name || !password) {
    return new Response("404 Not find", { status: 404 });
  }
  if (password !== bPassword) {
    return new Response("404 Not find", { status: 404 });
  }

  // 登记设备
  await env.DATA.put(`reg_${name}`, "true");
  return new Response("404 Not find", { status: 666 });
}