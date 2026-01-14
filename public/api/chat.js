export const config = { runtime: "edge" };

export default async function handler(req) {
  return new Response(
    JSON.stringify({ reply: "API OK – le backend fonctionne" }),
    { status: 200 }
  );
}
