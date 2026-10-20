import type { CSSProperties } from "react";

export type IconName = "arrow" | "upRight" | "sun" | "moon" | "menu" | "close" | "github" | "linkedin" | "mail" | "copy" | "check" | "network" | "chart" | "code" | "tools" | "pin" | "download" | "book" | "chevron" | "spark" | "mic";
export function Icon({ name, size = 20, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h15M13 6l6 6-6 6" /></>,
    upRight: <><path d="M6 18 18 6M6 6h12v12" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>,
    moon: <path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    github: <><path d="M9 20c-4 1-4-2-6-2m12 4v-4c0-1 .2-2-.5-2.5 3-.3 6-1.5 6-6a4.5 4.5 0 0 0-1.3-3.2 4 4 0 0 0-.1-3.3s-1.1-.3-3.6 1.3a12 12 0 0 0-7 0C6 2.7 5 3 5 3a4 4 0 0 0-.1 3.3A4.5 4.5 0 0 0 3.5 9.5c0 4.5 3 5.7 6 6C9 16 9 17 9 18v4" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10v7M7.5 7v.01M11.5 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 6 9 7 9-7" /></>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V4H4v12h4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    network: <><rect x="9" y="2" width="6" height="6" rx="1.5" /><rect x="2" y="16" width="6" height="6" rx="1.5" /><rect x="16" y="16" width="6" height="6" rx="1.5" /><path d="M12 8v4H5v4m7-4h7v4" /></>,
    chart: <><path d="M4 3v17h17M8 15v-4m5 4V6m5 9V9" /></>,
    code: <path d="m7 6-6 6 6 6m10-12 6 6-6 6M14 3l-4 18" />,
    tools: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><path d="M14 17.5h7m-3.5-3.5v7" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" />,
    book: <><path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7M22 8v8" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    spark: <path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" />,
    mic: <><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]}</svg>;
}
