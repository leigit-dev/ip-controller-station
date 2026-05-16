@@ -0,0 +1,5 @@
export async function onRequest(context) {
  return new Response("404 Not find", { status: 666 });
}
