/**
 * Real-time HTTP health-check uptime monitoring for AI agents.
 *
 * Performs lightweight HEAD requests to agent websites/endpoints to determine
 * if they are online. Results are cached for 5 minutes (matching ISR revalidation)
 * to avoid hammering endpoints on every page render.
 *
 * This replaces the placeholder `hasUptimeData = false` in onchain.ts.
 */

export interface UptimeResult {
  /** Whether the endpoint is reachable */
  isUp: boolean;
  /** HTTP status code (0 if unreachable) */
  statusCode: number;
  /** Response time in milliseconds */
  responseTimeMs: number;
  /** When this check was performed */
  checkedAt: string;
  /** The URL that was checked */
  url: string;
}

// In-memory cache: url → result (cleared every 5 min by ISR revalidation)
const uptimeCache = new Map<string, { result: UptimeResult; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check if a URL is reachable via a lightweight HEAD request.
 * Falls back to GET if HEAD is not supported (405).
 * Returns null if the URL is not a valid HTTP(S) URL.
 */
export async function checkEndpointHealth(
  url: string
): Promise<UptimeResult | null> {
  // Validate URL
  if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
    return null;
  }

  // Check cache first
  const cached = uptimeCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.result;
  }

  const start = Date.now();
  let result: UptimeResult;

  try {
    // Use HEAD request first (lightweight, no body transfer)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    let response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "AgentRep-UptimeMonitor/1.0",
      },
    });

    clearTimeout(timeout);

    // If HEAD returns 405 Method Not Allowed, try GET
    if (response.status === 405) {
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 8000);
      response = await fetch(url, {
        method: "GET",
        signal: controller2.signal,
        redirect: "follow",
        headers: {
          "User-Agent": "AgentRep-UptimeMonitor/1.0",
        },
      });
      clearTimeout(timeout2);
    }

    const elapsed = Date.now() - start;

    result = {
      isUp: response.status >= 200 && response.status < 500,
      statusCode: response.status,
      responseTimeMs: elapsed,
      checkedAt: new Date().toISOString(),
      url,
    };
  } catch (err) {
    const elapsed = Date.now() - start;
    result = {
      isUp: false,
      statusCode: 0,
      responseTimeMs: elapsed,
      checkedAt: new Date().toISOString(),
      url,
    };
  }

  // Cache the result
  uptimeCache.set(url, { result, timestamp: Date.now() });
  return result;
}

/**
 * Batch-check uptime for multiple agents in parallel.
 * Only checks agents that have a website URL.
 * Returns a map of agentId → UptimeResult.
 */
export async function batchCheckUptime(
  agents: { id: string; website?: string }[]
): Promise<Map<string, UptimeResult>> {
  const results = new Map<string, UptimeResult>();
  const agentsWithWebsites = agents.filter((a) => a.website);

  if (agentsWithWebsites.length === 0) return results;

  // Run all checks in parallel with concurrency limit
  const CONCURRENCY = 10;
  for (let i = 0; i < agentsWithWebsites.length; i += CONCURRENCY) {
    const batch = agentsWithWebsites.slice(i, i + CONCURRENCY);
    const checks = batch.map(async (agent) => {
      const result = await checkEndpointHealth(agent.website!);
      if (result) {
        results.set(agent.id, result);
      }
    });
    await Promise.all(checks);
  }

  return results;
}
