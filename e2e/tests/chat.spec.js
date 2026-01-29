import { test, expect } from "@playwright/test";

test.describe("Gemini Chat E2E Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should display the chat interface", async ({ page }) => {
        // Check header
        await expect(page.locator("h1")).toContainText("Gemini Chat");

        // Check welcome message
        await expect(page.locator(".welcome")).toContainText("Bonjour");

        // Check input field exists
        await expect(page.locator("textarea")).toBeVisible();

        // Check send button exists
        await expect(page.locator("button")).toContainText("Envoyer");
    });

    test("should show error when sending empty message", async ({ page }) => {
        const sendButton = page.locator("button");

        // Button should be disabled when input is empty
        await expect(sendButton).toBeDisabled();
    });

    test("should allow typing a message", async ({ page }) => {
        const textarea = page.locator("textarea");

        await textarea.fill("Hello Gemini!");

        await expect(textarea).toHaveValue("Hello Gemini!");

        // Button should be enabled now
        const sendButton = page.locator("button");
        await expect(sendButton).toBeEnabled();
    });

    test("should send a message and display user message", async ({ page }) => {
        const textarea = page.locator("textarea");
        const sendButton = page.locator("button");

        // Type a message
        await textarea.fill("Bonjour, comment ça va ?");

        // Send the message
        await sendButton.click();

        // User message should appear
        await expect(page.locator(".message.user")).toBeVisible();
        await expect(page.locator(".message.user .message-content")).toContainText(
            "Bonjour, comment ça va ?"
        );

        // Loading indicator should appear (or AI response)
        await expect(
            page.locator(".message.assistant").first()
        ).toBeVisible({ timeout: 10000 });
    });

    test("should receive AI response after sending message", async ({ page }) => {
        const textarea = page.locator("textarea");
        const sendButton = page.locator("button");

        // Type and send a simple question
        await textarea.fill("Dis bonjour");
        await sendButton.click();

        // Wait for AI response (not loading)
        await expect(page.locator(".message.assistant .message-content")).not.toHaveClass(
            /loading/,
            { timeout: 30000 }
        );

        // AI response should contain some text
        const aiResponse = page.locator(".message.assistant .message-content").first();
        await expect(aiResponse).not.toBeEmpty();
    });
});
