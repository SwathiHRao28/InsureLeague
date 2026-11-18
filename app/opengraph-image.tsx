import { ImageResponse } from "next/og";

// Link-preview image shown when the site is shared on WhatsApp, Facebook, LinkedIn, etc.
export const alt = "InsureLeague — Securing Lives";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 84" fill="none"><defs><clipPath id="c"><rect x="44" y="30" width="32" height="44"/></clipPath></defs><path d="M14 54C14 31 46 31 60 54C74 77 106 77 106 54" stroke="#14A89A" stroke-width="12"/><path d="M106 54C106 31 74 31 60 54C46 77 14 77 14 54" stroke="#FFFFFF" stroke-width="20" clip-path="url(#c)"/><path d="M106 54C106 31 74 31 60 54C46 77 14 77 14 54" stroke="#B5D334" stroke-width="12"/><circle cx="33" cy="15" r="9" fill="#14A89A"/><circle cx="88" cy="22" r="6.5" fill="#B5D334"/></svg>`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #EAF8F6 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(mark)}`}
            width={240}
            height={168}
            alt=""
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 700, color: "#0B4A45", lineHeight: 1 }}>
              InsureLeague
            </div>
            <div style={{ fontSize: 40, fontStyle: "italic", color: "#0F9488", marginTop: 12 }}>
              Securing Lives
            </div>
          </div>
        </div>
        <div style={{ fontSize: 36, color: "#334155", marginTop: 56, lineHeight: 1.35 }}>
          IRDAI-Approved Insurance Advisory
        </div>
      </div>
    ),
    size
  );
}
