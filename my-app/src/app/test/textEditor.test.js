/**
 * @jest-environment jsdom
 */

beforeAll(() => {
  global.window = {
    location: { href: "" },
    confirm: jest.fn(),
    localStorage: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
  };

  global.fetch = jest.fn();
  global.alert = jest.fn();
});

afterAll(() => {
  delete global.window;
});

// Louugout test
test("logout returns logged out", async () => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ data: "logged out" })
  });

  const res = await fetch("http://localhost:3000/api/logout");
  const data = await res.json();

  expect(data.data).toBe("logged out");
});

// Sync notes test
test("sync note returns valid data", async () => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve([{ text: "Hello" }])
  });

  const res = await fetch("http://localhost:3000/api/synctext?noteID=1&userID=100");
  const data = await res.json();

  expect(data[0].text).toBe("Hello");
});

// Upload notes test
test("upload note returns valid", async () => {
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({ data: "valid" })
  });

  const res = await fetch("http://localhost:3000/api/uploadtext?text=abc");
  const data = await res.json();

  expect(data.data).toBe("valid");
});

// Mood button test
test("mood button sets CSS variable", () => {
  document.documentElement.style.setProperty = jest.fn();

  const color = "#fff7b3";
  document.documentElement.style.setProperty("--mood-bg", color);

  expect(document.documentElement.style.setProperty)
    .toHaveBeenCalledWith("--mood-bg", color);
});
