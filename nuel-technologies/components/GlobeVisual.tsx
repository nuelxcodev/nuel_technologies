"use client";
import { useEffect, useRef } from "react";

type V = [number, number, number];
const ll = (lat: number, lng: number): V => {
  const a = (lat * Math.PI) / 180, b = (lng * Math.PI) / 180;
  return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)];
};
const cities: V[] = [ll(7.4, 3.9), ll(51.5, -0.1), ll(40.7, -74), ll(25.2, 55.3), ll(1.35, 103.8), ll(-1.3, 36.8), ll(37.8, -122.4), ll(-23.5, -46.6), ll(35.7, 139.7)];
const arcs: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 2], [3, 4], [2, 6], [0, 7], [4, 8]];
const N = 1100;
const dots: V[] = Array.from({ length: N }, (_, i) => {
  const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), th = i * 2.399963;
  return [Math.cos(th) * r, y, Math.sin(th) * r] as V;
});
// Abstract "continents": a smooth pseudo-random mask so some dots glow brighter.
const land = dots.map(([x, y, z]) => Math.sin(x * 3.1 + 1) + Math.sin(y * 4.3) + Math.cos(z * 3.7 - 1) > 0.4);
const TILT = 0.35, CT = Math.cos(TILT), ST = Math.sin(TILT);
const rot = (p: V, cs: number, sn: number): V => {
  const x = p[0] * cs + p[2] * sn, z = -p[0] * sn + p[2] * cs;
  return [x, p[1] * CT - z * ST, p[1] * ST + z * CT];
};

export default function GlobeVisual({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, raf = 0, visible = true, col = "198,255,61";

    const readColor = () => { col = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim().split(/\s+/).join(","); };
    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth;
      c.width = w * d; c.height = w * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    function frame(t: number) {
      raf = 0;
      const R = w * 0.43, cx = w / 2, cy = w / 2;
      const a = reduce ? 0.8 : t * 0.00018, cs = Math.cos(a), sn = Math.sin(a);
      ctx!.clearRect(0, 0, w, w);

      const g = ctx!.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, `rgba(${col},.10)`); g.addColorStop(1, `rgba(${col},.02)`);
      ctx!.fillStyle = g; ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, 6.2832); ctx!.fill();
      ctx!.strokeStyle = `rgba(${col},.28)`; ctx!.lineWidth = 1; ctx!.stroke();

      dots.forEach((p, i) => {
        const [x, y, z] = rot(p, cs, sn), k = (z + 1) / 2, L = land[i];
        ctx!.fillStyle = `rgba(${col},${(L ? 0.18 + 0.75 * k : 0.04 + 0.2 * k).toFixed(2)})`;
        const s = L ? 1.8 : 1.2;
        ctx!.fillRect(cx + x * R - s / 2, cy - y * R - s / 2, s, s);
      });

      arcs.forEach(([i, j], n) => {
        const A = cities[i], B = cities[j];
        const om = Math.acos(Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])), so = Math.sin(om) || 1;
        const at = (u: number): V => {
          const s1 = Math.sin((1 - u) * om) / so, s2 = Math.sin(u * om) / so, h = 1 + 0.22 * Math.sin(Math.PI * u);
          return [(A[0] * s1 + B[0] * s2) * h, (A[1] * s1 + B[1] * s2) * h, (A[2] * s1 + B[2] * s2) * h];
        };
        ctx!.beginPath();
        let pen = false;
        for (let k = 0; k <= 28; k++) {
          const [x, y, z] = rot(at(k / 28), cs, sn);
          if (z > 0) { const px = cx + x * R, py = cy - y * R; if (pen) ctx!.lineTo(px, py); else ctx!.moveTo(px, py); pen = true; } else pen = false;
        }
        ctx!.strokeStyle = `rgba(${col},.5)`; ctx!.lineWidth = 1.2; ctx!.stroke();

        const [x, y, z] = rot(at((t * 0.00035 + n * 0.173) % 1), cs, sn);
        if (z > 0) {
          ctx!.shadowColor = `rgb(${col})`; ctx!.shadowBlur = 12; ctx!.fillStyle = `rgb(${col})`;
          ctx!.beginPath(); ctx!.arc(cx + x * R, cy - y * R, 2.6, 0, 6.2832); ctx!.fill(); ctx!.shadowBlur = 0;
        }
      });

      cities.forEach((p, i) => {
        const [x, y, z] = rot(p, cs, sn);
        if (z <= 0) return;
        const px = cx + x * R, py = cy - y * R;
        ctx!.fillStyle = `rgba(${col},.22)`; ctx!.beginPath(); ctx!.arc(px, py, i === 0 ? 9 : 6, 0, 6.2832); ctx!.fill();
        ctx!.fillStyle = `rgb(${col})`; ctx!.beginPath(); ctx!.arc(px, py, i === 0 ? 3.8 : 2.8, 0, 6.2832); ctx!.fill();
      });

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    }

    readColor(); size(); frame(0);
    const ro = new ResizeObserver(() => { size(); if (!raf) frame(performance.now()); });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf && !reduce) raf = requestAnimationFrame(frame);
    });
    io.observe(c);
    const mo = new MutationObserver(() => { readColor(); if (!raf) frame(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
