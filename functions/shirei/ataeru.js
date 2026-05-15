// 路由：/shirei/ataeru?target=xxx&commend=xxx&password=xxx
// A 端下发指令，使用 A 端密码（从 KV 读取）
const DEFAULT_B_PASSWORD = "fixed-b-password-2025";

async function isTargetRegistered(env, target) {
  const reg = await env.DATA.get(`reg_${target}`);
  return reg !== null;
}

async function getAPassword(env) {
  let aPass = await env.DATA.get("a_password");
  if (aPass === null) {
    aPass = "default-a-password";
    await env.DATA.put("a_password", aPass);
  }
  return aPass;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const target = url.searchParams.get("target");
  const commend = url.searchParams.get("commend");
  const password = url.searchParams.get("password");

  if (!target || !commend || !password) {
    return new Response("404 Not find", { status: 404 });
  }

  const aPassword = await getAPassword(env);
  if (password !== aPassword) {
    return new Response("404 Not find", { status: 404 });
  }

  const registered = await isTargetRegistered(env, target);
  if (!registered) {
    return new Response("404 Not find", { status: 404 });
  }

  // 储存指令（覆盖）
  await env.DATA.put(`cmd_${target}`, commend);
  return new Response("404 Not find", { status: 666 });
}