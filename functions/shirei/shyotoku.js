// 路由：/shirei/shyotoku?target=xxx&password=xxx
// B 端索取指令，使用 B 端密码，取出后删除指令（一次性）
const DEFAULT_B_PASSWORD = "fixed-b-password-2025";

async function isTargetRegistered(env, target) {
  const reg = await env.DATA.get(`reg_${target}`);
  return reg !== null;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("target");
  const password = url.searchParams.get("password");

  // 获取 B 端密码（优先环境变量，否则默认）
  const bPassword = DEFAULT_B_PASSWORD;

  if (!target || !password) {
    return new Response("404 Not find", { status: 404 });
  }

  // 验证 B 端密码
  if (password !== bPassword) {
    return new Response("404 Not find", { status: 404 });
  }

  const registered = await isTargetRegistered(env, target);
  if (!registered) {
    return new Response("404 Not find", { status: 404 });
  }

  const cmdKey = `cmd_${target}`;
  const commend = await env.DATA.get(cmdKey);
  if (commend === null) {
    return new Response("404 Not find", { status: 404 });
  }

  // 删除指令（一次性）
  await env.DATA.delete(cmdKey);
  return new Response(commend, { status: 666 });
}