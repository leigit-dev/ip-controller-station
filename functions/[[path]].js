@@ -0,0 +1,4 @@
export async function onRequest(context) {
  return new Response("404 Not find", { status: 404 });
}
