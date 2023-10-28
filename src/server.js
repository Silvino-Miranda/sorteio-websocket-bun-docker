import serveStatic from "serve-static-bun";

const APP_PORT = Bun.env.PORT || 3000;

const server = Bun.serve({
  port: APP_PORT,
  fetch(req, server) {
    const success = server.upgrade(req);
    if (success) {
      // Bun automatically returns a 101 Switching Protocols
      // if the upgrade succeeds
      return undefined;
    }

    // handle HTTP request normally
    const url = new URL(req.url);

    if (url.pathname.startsWith("/public")) {
      return serveStatic("public", { stripFromPathname: "/public" })(req);
    }
    if (url.pathname === "/") {
      return new Response(Bun.file(`public/index.html`));
    }
    if (url.pathname === "/admin") {
      return new Response(Bun.file(`public/admin.html`));
    }
  },
  websocket: {
    open(ws) {
      ws.data = ws.data || {};
      clients.push(ws);
      updateAdminClientCount();
    },
    close(ws) {
      clients = clients.filter((c) => c !== ws);
      updateAdminClientCount();
    },
    async message(ws, message) {
      handleIncomingMessage(ws, message);
    },
  },
});

const ACTIONS = {
  ADMIN: "admin",
  DRAW: "draw",
  CLIENT_COUNT_UPDATE: "clientCountUpdate",
};

let clients = [];

function handleIncomingMessage(ws, msg) {
  const data = JSON.parse(msg);
  const action = data.action;

  switch (action) {
    case ACTIONS.ADMIN:
      ws.data.isAdmin = true;
      break;
    case ACTIONS.DRAW:
      handleDraw(data.code);
      break;
    default:
      console.warn("Ação desconhecida:", action);
  }
}

function handleDraw(confirmationCode) {
  let participants = clients.filter((client) => !client.data.isAdmin);
  const winner = participants[Math.floor(Math.random() * participants.length)];

  participants.forEach((client) => {
    let result = JSON.stringify({ status: "youlose" });
    if (client === winner) {
      result = JSON.stringify({ status: "youwin", code: confirmationCode });
    }
    client.send(result);
  });
}

function updateAdminClientCount() {
  const clientCount = clients.filter((client) => !client.data.isAdmin).length;

  clients.forEach((client) => {
    if (client.data.isAdmin && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          action: ACTIONS.CLIENT_COUNT_UPDATE,
          count: clientCount,
        })
      );
    }
  });
}

console.log(`Servidor ouvindo a porta ${APP_PORT}!`);
