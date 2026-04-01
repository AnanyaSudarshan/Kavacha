const BASE_URL = "http://172.16.3.138:5000"; // YOUR IP

export const analyzeMessage = async (text) => {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  return res.json();
};

export const autoDetectMessage = async () => {
  const res = await fetch(`${BASE_URL}/auto-detect-message`);
  return res.json();
};

export const autoDetectCall = async () => {
  const res = await fetch(`${BASE_URL}/auto-detect-call`);
  return res.json();
};

export const autoDetectFile = async () => {
  const res = await fetch(`${BASE_URL}/auto-detect-file`);
  return res.json();
};
