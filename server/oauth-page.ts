// The sign-in page MCP clients open while connecting a brain: email → 6-digit code → back to the client.
// Field names, element ids and the fetch calls are the contract with server/index.ts (/oauth/*).

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function renderSignInPage({ requestId, brainName, clientName }: { requestId: string; brainName: string | null; clientName: string | null }) {
  // Roundtables are already plural ("Pricing Brains"); everything else is one person.
  const what = brainName ? (brainName.endsWith(" Brains") ? escape(brainName) : `${escape(brainName)}'s brain`) : "your brain";
  const where = clientName ? ` to ${escape(clientName)}` : "";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Sign in · The Brains</title><link rel="icon" href="https://brains.ceo/assets/favicon.svg" type="image/svg+xml">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#131313" media="(prefers-color-scheme: dark)">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@400;700&display=swap">
<style>
  :root {
    --ink:#4a4a4a; --ink-strong:#2b2b2b; --muted:#6e6e6e; --faint:#b7b7b7; --line:#e8e8e8; --band:#f7f7f7;
    --bg:#ffffff; --surface:#ffffff; --pink:#ff0083; --pink-text:#d4006c; --pink-wash:#ffe8f3; --danger:#c4231b; --danger-wash:#fdeceb;
    --btn:#202020; --btn-hover:#000; --btn-ink:#fff; --shadow:0 0.875rem 2.5rem -1.25rem rgba(74,74,74,.45);
    --serif:"Merriweather",Georgia,serif; --sans:"Lato","Helvetica Neue",Arial,sans-serif; --mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;
    --ease-out:cubic-bezier(.23,1,.32,1);
    color-scheme: light;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --ink:#d9d9d9; --ink-strong:#f2f2f2; --muted:#a0a0a0; --faint:#5c5c5c; --line:#2b2b2b; --band:#1a1a1a;
      --bg:#131313; --surface:#1b1b1b; --pink:#ff2b93; --pink-text:#ff6db3; --pink-wash:#33121f; --danger:#ff8a80; --danger-wash:#3a1614;
      --btn:#f2f2f2; --btn-hover:#fff; --btn-ink:#131313; --shadow:0 0.875rem 2.5rem -1.25rem rgba(0,0,0,.8);
      color-scheme: dark;
    }
  }
  *, *::before, *::after { box-sizing:border-box; }
  body { margin:0; min-height:100vh; min-height:100dvh; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;
    padding:32px 16px calc(32px + env(safe-area-inset-bottom)); background:var(--bg); color:var(--ink);
    font:400 16px/1.55 var(--sans); -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  .brand { display:inline-flex; align-items:center; gap:10px; color:var(--ink-strong); text-decoration:none; font:700 17px/1 var(--serif); letter-spacing:-.01em; }
  .brand svg { width:28px; height:28px; }
  main { width:min(420px, 100%); padding:30px 28px 26px; border:1px solid var(--line); border-radius:20px; background:var(--surface); box-shadow:var(--shadow); }
  @media (max-width:480px) { main { padding:24px 20px 22px; border-radius:18px; } }
  section { animation:in 320ms var(--ease-out) both; }
  @keyframes in { from { opacity:0; transform:translateY(6px); } }
  h1 { margin:0 0 8px; font:400 clamp(1.35rem, 1.2rem + .7vw, 1.6rem)/1.3 var(--serif); letter-spacing:-.01em; color:var(--ink-strong); text-wrap:balance; }
  p { margin:0 0 20px; color:var(--muted); font-size:15px; text-wrap:pretty; }
  p strong { color:var(--ink-strong); font-weight:700; overflow-wrap:anywhere; }
  label { display:block; margin-bottom:7px; font:700 12.5px/1 var(--sans); color:var(--muted); }
  input { width:100%; height:48px; padding:0 14px; border:1px solid var(--line); border-radius:12px; background:var(--surface); color:var(--ink-strong);
    font:400 16px/1 var(--sans); transition:border-color 150ms ease, box-shadow 150ms ease; }
  input::placeholder { color:var(--faint); }
  input:focus { outline:none; border-color:color-mix(in srgb, var(--pink) 55%, var(--line)); box-shadow:0 0 0 4px var(--pink-wash); }
  #code { height:60px; padding:0 8px 0 calc(8px + .5em); font:600 28px/1 var(--mono); letter-spacing:.5em; text-align:center; font-variant-numeric:tabular-nums; }
  #code::placeholder { letter-spacing:.5em; }
  button { font:inherit; cursor:pointer; }
  button:focus-visible, a:focus-visible { outline:2px solid var(--pink); outline-offset:3px; }
  #email-submit, #code-submit { position:relative; display:flex; align-items:center; justify-content:center; gap:8px; width:100%; height:48px; margin-top:14px;
    border:0; border-radius:999px; background:var(--btn); color:var(--btn-ink); font:700 15px/1 var(--sans);
    transition:transform 160ms var(--ease-out), background-color 150ms ease, opacity 150ms ease; }
  #email-submit:active, #code-submit:active { transform:scale(.97); }
  @media (hover:hover) and (pointer:fine) { #email-submit:hover, #code-submit:hover { background:var(--btn-hover); } }
  button[disabled] { opacity:.7; cursor:default; }
  button[disabled]::after { content:""; width:14px; height:14px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin 600ms linear infinite; }
  @keyframes spin { to { transform:rotate(360deg); } }
  .error { display:flex; gap:7px; min-height:20px; margin-top:10px; font-size:14px; line-height:1.45; color:var(--danger); }
  .error:not(:empty)::before { content:"!"; flex:none; display:grid; place-items:center; width:17px; height:17px; margin-top:1px; border-radius:50%;
    background:var(--danger); color:var(--surface); font:700 11px/1 var(--sans); }
  .error:not(:empty) { animation:nudge 260ms var(--ease-out); }
  @keyframes nudge { 35% { transform:translateX(-3px); } 70% { transform:translateX(2px); } }
  .links { display:flex; flex-wrap:wrap; justify-content:space-between; gap:8px 16px; margin-top:12px; }
  .link { position:relative; padding:0; border:0; background:none; color:var(--pink-text); font:700 14px/1.5 var(--sans);
    text-decoration:underline; text-decoration-color:color-mix(in srgb, var(--pink-text) 35%, transparent); text-underline-offset:3px; }
  .link::before { content:""; position:absolute; inset:-10px -4px; }
  #step-done { text-align:center; padding:6px 0 2px; }
  #step-done p { margin-bottom:4px; }
  .done-mark { position:relative; display:grid; place-items:center; width:56px; height:56px; margin:0 auto 18px; border-radius:50%; background:var(--pink); color:#fff;
    animation:pop 460ms var(--ease-out) both; }
  .done-mark svg { width:26px; height:26px; }
  .done-mark i { position:absolute; left:50%; top:50%; width:6px; height:6px; margin:-3px 0 0 -3px; border-radius:50%; background:var(--pink); opacity:0;
    animation:spark 700ms var(--ease-out) 140ms both; }
  @keyframes pop { from { transform:scale(.6); opacity:0; } 60% { transform:scale(1.08); opacity:1; } to { transform:none; } }
  @keyframes spark { 0% { opacity:1; transform:rotate(var(--a)) translateY(0) scale(1); } 100% { opacity:0; transform:rotate(var(--a)) translateY(-40px) scale(.4); } }
  .fine { max-width:420px; margin:0; font-size:12.5px; line-height:1.5; color:var(--muted); text-align:center; }
  .fine a { color:var(--ink); text-underline-offset:3px; text-decoration-color:var(--faint); }
  [hidden] { display:none !important; }
  @media (prefers-reduced-motion: reduce) {
    section, .error:not(:empty), .done-mark, .done-mark i { animation:none; }
    .done-mark i { display:none; }
    input, #email-submit, #code-submit { transition:none; }
    #email-submit:active, #code-submit:active { transform:none; }
    button[disabled]::after { animation-duration:1.6s; }
  }
</style></head><body>
<a class="brand" href="https://brains.ceo" target="_blank" rel="noopener"><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#ff0083"/><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path stroke-width="2.6" d="M10.5 6.5v19M10.5 6.5h6c3.3 0 5.5 2.1 5.5 4.75S19.8 16 16.6 16h-6.1M10.5 16h7.3c3.6 0 6 2.1 6 4.75s-2.4 4.75-6 4.75h-7.3"/><path stroke-width="1.8" d="M13.9 11.4c1.1-1.4 2.4 1.3 3.8-.1"/><path stroke-width="1.8" d="M13.9 20.9c1.2-1.5 2.6 1.4 4.1-.1.6-.6 1.3-.5 1.9.1"/></g></svg>The Brains</a>
<main>
  <section id="step-email">
    <h1>Sign in to connect ${what}${where}</h1>
    <p>Enter your email and we'll send a 6-digit code. Free, no password.</p>
    <form id="email-form">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required autofocus>
      <button id="email-submit" type="submit">Send code</button>
      <div class="error" id="email-error" role="alert"></div>
    </form>
  </section>
  <section id="step-code" hidden>
    <h1>Check your inbox</h1>
    <p>We sent a 6-digit code to <strong id="sent-to"></strong>.</p>
    <form id="code-form">
      <label for="code">Code</label>
      <input id="code" name="code" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]*" maxlength="6" placeholder="······" required>
      <button id="code-submit" type="submit">Connect</button>
      <div class="error" id="code-error" role="alert"></div>
    </form>
    <div class="links">
      <button class="link" id="resend" type="button">Send a new code</button>
      <button class="link" id="change-email" type="button">Use a different email</button>
    </div>
  </section>
  <section id="step-done" hidden>
    <div class="done-mark" aria-hidden="true"><i style="--a:0deg"></i><i style="--a:45deg"></i><i style="--a:90deg"></i><i style="--a:135deg"></i><i style="--a:180deg"></i><i style="--a:225deg"></i><i style="--a:270deg"></i><i style="--a:315deg"></i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
    <h1>Connected</h1>
    <p>${what} is connected${where}. You can close this tab and go back to your app.</p>
  </section>
</main>
<p class="fine">Your email gets you access and occasional updates about new brains. Unsubscribe anytime. Unofficial brains built from public content.</p>
<script>
  const requestId = ${JSON.stringify(requestId)};
  const $ = (id) => document.getElementById(id);
  let email = "";
  const post = (path, body) => fetch(path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ requestId, ...body }) })
    .then(async (r) => ({ ok: r.ok, status: r.status, body: await r.json().catch(() => ({})) }));
  const message = (b) => ({
    invalid_email: "That email doesn't look right.",
    rate_limited: "Too many tries. Wait " + (b.retryAfter || 30) + " seconds and try again.",
    invalid_code: "That code isn't right." + (b.attemptsLeft != null ? " " + b.attemptsLeft + " attempts left." : ""),
    expired: "That code expired. Send a new one.",
    expired_request: "This sign-in link expired. Start the connection again from your app.",
    email_failed: "We couldn't send the email. Try again in a minute.",
  })[b.error] || "Something went wrong. Try again.";
  function show(step) { for (const s of ["email", "code", "done"]) $("step-" + s).hidden = s !== step; }
  async function sendCode() {
    $("email-error").textContent = ""; $("email-submit").disabled = true;
    const r = await post("/oauth/send-code", { email });
    $("email-submit").disabled = false;
    if (!r.ok) { show("email"); $("email-error").textContent = message(r.body); return; }
    $("sent-to").textContent = email; show("code"); $("code").focus();
  }
  async function verify() {
    $("code-error").textContent = ""; $("code-submit").disabled = true;
    const r = await post("/oauth/verify", { email, code: $("code").value });
    if (!r.ok) { $("code-submit").disabled = false; $("code-error").textContent = message(r.body); return; }
    show("done");
    window.location.href = r.body.redirect;
  }
  $("email-form").addEventListener("submit", (e) => { e.preventDefault(); email = $("email").value.trim(); sendCode(); });
  $("code-form").addEventListener("submit", (e) => { e.preventDefault(); verify(); });
  $("code").addEventListener("input", () => { if (/^\\d{6}$/.test($("code").value)) verify(); });
  $("resend").addEventListener("click", sendCode);
  $("change-email").addEventListener("click", () => { show("email"); $("email").focus(); });
</script></body></html>`;
}
