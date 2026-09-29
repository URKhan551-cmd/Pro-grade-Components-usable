// helper attach all security headers to every response
function applyHeaders(res: VercelResponse, origin: string | undefined, extra: Record<string, string> = {}): void {
    const cors = getCorsHeaders(origin);
    Object.entries({...SECURITY_HEADERS, ...cors, ...extra}).forEach(([k, v]) => res.setHeader(k, v));
}
