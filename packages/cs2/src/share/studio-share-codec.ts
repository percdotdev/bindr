import { parseStudioShare, type StudioShare } from './studio-share';

const MAX_JSON_LENGTH = 48_000;
const MAX_TOKEN_LENGTH = 6000;
const TOKEN_PATTERN = /^[\w-]+$/u;

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function base64UrlToBytes(token: string): Uint8Array {
  const padded = token.replaceAll('-', '+').replaceAll('_', '/');
  const pad =
    padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function deflateRaw(text: string): Promise<Uint8Array> {
  const stream = new Blob([text])
    .stream()
    .pipeThrough(new CompressionStream('deflate-raw'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

function blobFromBytes(bytes: Uint8Array): Blob {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return new Blob([buffer]);
}

async function inflateRaw(bytes: Uint8Array): Promise<string> {
  const stream = blobFromBytes(bytes)
    .stream()
    .pipeThrough(new DecompressionStream('deflate-raw'));
  return await new Response(stream).text();
}

export async function encodeStudioShare(wire: unknown): Promise<string | null> {
  const compressed = await deflateRaw(JSON.stringify(wire));
  const token = bytesToBase64Url(compressed);
  if (token.length > MAX_TOKEN_LENGTH) {
    return null;
  }
  return token;
}

export async function decodeStudioShare(
  token: string
): Promise<StudioShare | null> {
  if (!token || token.length > MAX_TOKEN_LENGTH || !TOKEN_PATTERN.test(token)) {
    return null;
  }

  try {
    const json = await inflateRaw(base64UrlToBytes(token));
    if (json.length > MAX_JSON_LENGTH) {
      return null;
    }
    return parseStudioShare(JSON.parse(json));
  } catch {
    return null;
  }
}
