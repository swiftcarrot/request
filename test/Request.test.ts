import { Request, encode, compactParams } from "../src";

test("constructor", () => {
  const req = new Request("https://api.github.com");
  expect(req._base).toBe("https://api.github.com");
});

test("base", () => {
  const req = new Request();
  expect(req._base).toBe("");
  req.base("https://example.com").timeout(200);
  expect(req._base).toBe("https://example.com");
  expect(req._timeout).toBe(200);
});

test("timeout", () => {
  const req = new Request("https://api.github.com").timeout(1);
  expect(req._base).toBe("https://api.github.com");
  expect(req._timeout).toBe(1);
});

test("token", () => {
  const req = new Request();
  req.bearerToken({ token: "1" });

  expect(req.getHeaders()).toEqual({
    Authorization: "Bearer 1"
  });

  req.bearerToken(() => ({ token: "2" }));
  expect(req.getHeaders()).toEqual({
    Authorization: "Bearer 2"
  });
});

test("headers", () => {
  const req = new Request();
  req.headers(() => ({
    locale: "zh"
  }));

  expect(req.getHeaders()).toEqual({
    locale: "zh"
  });

  req.headers({ locale: "en" });
  expect(req.getHeaders()).toEqual({
    locale: "en"
  });
});

test("compactParams", () => {
  expect(compactParams({ a: 1, b: null })).toEqual({ a: 1 });
});

test("encode", () => {
  expect(encode({ a: 12 })).toBe("a=12");
});

test("compactParams", () => {
  expect(compactParams({ a: null, b: 0, c: true, d: "test" })).toEqual({
    b: 0,
    d: "test",
    c: true
  });
});
