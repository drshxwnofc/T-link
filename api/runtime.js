// /api/runtime.js
export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  try {
    const { code } = await req.json();
    if (!code || code.length > 50000) return new Response('Invalid code', { status: 400 });

    const result = await runSandbox(code);
    return new Response(JSON.stringify({ output: result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response('Runtime error: ' + err.message, { status: 500 });
  }
}

// Simple browser-safe sandbox using Function constructor
async function runSandbox(code) {
  return new Promise((resolve, reject) => {
    try {
      const fn = new Function(code);
      resolve(fn());
    } catch (e) {
      reject(e);
    }
  });
                     }    };

    worker.postMessage({});
    setTimeout(() => {
      worker.terminate();
      reject(new Error('Execution timeout'));
    }, 3000);
  });
}
