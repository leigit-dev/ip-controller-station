// 路由：/henkou?np=新密码
// 修改 A 端密码（存储在 KV 中）
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const np = url.searchParams.get("np");

  if (!np) {
    return new Response("404 Not find", { status: 404 });
  }

  // 更新 A 端密码
  await env.DATA.put("a_password", np);
  return new Response("404 Not find", { status: 666 });
}