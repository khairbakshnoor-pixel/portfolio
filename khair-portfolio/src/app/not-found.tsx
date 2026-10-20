import Link from "next/link";
import { portfolio as p } from "@/data/portfolio";
export default function NotFound() { return <main className="section section-shell"><p className="eyebrow">{p.ui.notFoundLabel}</p><h1 style={{ fontSize: 44, marginBottom: 24 }}>{p.ui.notFoundTitle}</h1><Link className="button button-primary" href="/">{p.ui.homeLink}</Link></main>; }
