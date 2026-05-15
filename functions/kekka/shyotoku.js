// 路由：/kekka/shyotoku?target=xxx&password=xxx
// A 端获取结果，使用 A 端密码，取出后删除结果（一次性）
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
  const password = url.searchParams.get("password");

  if (!target || !password) {
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

  const resKey = `res_${target}`;
  const result = await env.DATA.get(resKey);
  if (result === null) {
    return new Response("404 Not find", { status: 404 });
  }

  await env.DATA.delete(resKey);
  return new Response(result, { status: 666 });
}