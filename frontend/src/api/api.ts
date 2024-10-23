import { apiSettingsMaker } from ".";

async function callApi({ url, settings }: { url: string, settings: any }) {
  const abortController = new AbortController();
  const { signal } = abortController;
  console.log(url)
  console.log(settings)
  try {
    const response = await fetch(url, { ...settings, signal });

    if (signal.aborted) {
      throw new Error("Request was aborted.");
    }

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errorType || data.errorMessage) {
      throw new Error(`API error: ${data.errorMessage || "Unknown error"}`);
    }

    return data;

  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error("The request was aborted.");
    }
    throw new Error(`Error during API call: ${err.message}`);
  } finally {
    abortController.abort();
  }
}

export const handleApi = ({ path, method, body = null }: { path: string, method: string, body: any }) => {
  const url = `https://storypointer.xyz:4000${path}`
  return callApi({ url, settings: apiSettingsMaker({ method, body: JSON.stringify(body) }) });
};