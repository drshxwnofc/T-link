export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { code } = JSON.parse(req.body);

  if (!code || code.length > 50000) {
    return res.status(400).json({ error: 'Invalid code' });
  }

  try {
    const result = await runSandbox(code);
    res.json({ output: result });
  } catch (e) {
    res.json({ error: e.message });
  }
}

async function runSandbox(code) {
  return new Promise((resolve, reject) => {
    const workerCode = `
      self.onmessage = () => {
        try {
          let result = (function(){ ${code} })();
          self.postMessage({ result });
        } catch(e) {
          self.postMessage({ error: e.message });
        }
      }
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = e => {
      worker.terminate();
      if (e.data.error) reject(new Error(e.data.error));
      else resolve(e.data.result);
    };

    worker.postMessage({});
    setTimeout(() => {
      worker.terminate();
      reject(new Error('Execution timeout'));
    }, 3000);
  });
}
