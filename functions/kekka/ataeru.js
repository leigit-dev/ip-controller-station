// 路由：/kekka/ataeru?target=xxx&result=xxx&password=xxx
// B 端上报结果，使用 B 端密码
const DEFAULT_B_PASSWORD = "fixed-b-password-2025";

async function isTargetRegistered(env, target) {
  const reg = await env.DATA.get(`reg_${target}`);
  return reg !== null;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("target");
  const result = url.searchParams.get("result");
  const password = url.searchParams.get("password");

  const bPassword = DEFAULT_B_PASSWORD;

  if (!target || !result || !password) {
    return new Response("404 Not find", { status: 404 });
  }
  if (password !== bPassword) {
    return new Response("404 Not find", { status: 404 });
  }

  const registered = await isTargetRegistered(env, target);
  if (!registered) {
    return new Response("404 Not find", { status: 404 });
  }

  // 储存结果（覆盖）
  await env.DATA.put(`res_${target}`, result);
  return new Response("404 Not find", { status: 666 });
}