import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

// Link-preview image shown when the site is shared on WhatsApp, Facebook, LinkedIn, etc.
export const alt = "InsureLeague — Securing Lives";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/images/logo/insureleague-logo-original.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFFFFF 0%, #EAF8F6 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={459} height={395} alt="" />
        <div style={{ fontSize: 36, color: "#334155", marginTop: 40 }}>IRDAI-Approved Insurance Advisory</div>
      </div>
    ),
    size
  );
}
