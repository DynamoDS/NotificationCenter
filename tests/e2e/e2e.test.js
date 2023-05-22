describe('App (e2e)', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:8080');
  });

  it('should have correct title', async () => {
    await expect(page.title()).resolves.toMatch('Notifications App');
  });
});
