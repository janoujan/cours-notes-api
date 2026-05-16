// Import de Supertest
// Supertest permet de simuler des requêtes HTTP vers une application Express
// sans démarrer réellement le serveur sur un port.
import request from "supertest";

// Import de l'application Express
// On importe "app" et non "server.js" pour éviter de lancer app.listen()
// Cela permet de tester l'application en mémoire.
import app from "../app.js";

// Bloc de test principal
// describe regroupe plusieurs tests liés à une même fonctionnalité.
describe("API Notes Markdown", () => {
  // Premier test
  // Vérifie que la route racine "/" fonctionne correctement.
  test("GET / doit répondre 200", async () => {
    // Supertest envoie une requête GET à l'application
    // request(app) simule un client HTTP
    const res = await request(app).get("/");

    // Vérifie que le code HTTP retourné est 200 (succès)
    expect(res.statusCode).toBe(200);
  });

  // Deuxième test
  // Vérifie que la route /notes fonctionne correctement.
  test("GET /notes doit répondre 200", async () => {
    const res = await request(app).get("/notes");

    // Vérifie que la requête réussit
    expect(res.statusCode).toBe(200);

    // Vérifie que la réponse est bien un tableau JSON
    // Cela confirme que l'API retourne une liste de notes
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Troisième test
  // Vérifie la gestion des erreurs pour une note inexistante.
  test("GET /notes/inconnue doit répondre 404", async () => {
    const res = await request(app).get("/notes/inconnue");

    // Vérifie que l'API retourne bien un code 404
    // Cela confirme que la gestion d'erreur est correcte
    expect(res.statusCode).toBe(404);
  });
});
