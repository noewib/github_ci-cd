import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("API E2E Tests", () => {
    it("GET / should return status ok", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("ok");
    });

    it("GET /health should return healthy", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    it("POST /generate should return 400 without prompt", async () => {
        const response = await request(app)
            .post("/generate")
            .send({})
            .set("Content-Type", "application/json");
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Prompt is required");
    });
});
