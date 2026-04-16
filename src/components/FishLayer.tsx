import { useEffect, useRef } from 'react';
import { useAppContext } from '../AppContext';

const FISH_R = ['><(((º>', '><((º>·', '><(º>··'];
const FISH_L = ['<º)))><', '·<º))><', '··<º)><'];
const N = 6;

export function FishLayer() {
  const { theme } = useAppContext();
  const layerRef = useRef<HTMLDivElement>(null);
  const fishesRef = useRef<any[]>([]);
  const requestRef = useRef<number>();
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, vel: 0 });
  const clickRef = useRef({ x: -9999, y: -9999, power: 0 });

  useEffect(() => {
    if (!layerRef.current) return;
    const layer = layerRef.current;
    
    // Clear existing
    layer.innerHTML = '';
    fishesRef.current = [];

    const makeFish = (scatter: boolean) => {
      const el = document.createElement('span');
      el.style.cssText = [
        'position:absolute', 'top:0', 'left:0',
        'font-family:"JetBrains Mono",monospace',
        'font-size:14px', 'font-weight:500',
        'white-space:nowrap', 'user-select:none', 'pointer-events:none',
      ].join(';');
      layer.appendChild(el);

      const W = window.innerWidth, H = window.innerHeight;
      const goRight = Math.random() > 0.5;
      return {
        el,
        x: scatter ? Math.random() * W : (goRight ? -80 : W + 80),
        y: 60 + Math.random() * (H - 120),
        vx: (0.18 + Math.random() * 0.22) * (goRight ? 1 : -1),
        vy: (Math.random() - 0.5) * 0.12,
        wb: Math.random() * Math.PI * 2,
        ws: 0.008 + Math.random() * 0.008,
        ex: 0, ey: 0, fi: 0, ft: 0,
      };
    };

    for (let i = 0; i < N; i++) {
      fishesRef.current.push(makeFish(true));
    }

    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.px = m.x; m.py = m.y;
      m.x = e.clientX; m.y = e.clientY;
      const dvx = m.x - m.px, dvy = m.y - m.py;
      m.vel = Math.min(Math.sqrt(dvx * dvx + dvy * dvy), 40);
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
      mouseRef.current.vel = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouseRef.current.x = e.touches[0].clientX;
      mouseRef.current.y = e.touches[0].clientY;
    };

    const handleClick = (e: MouseEvent) => {
      clickRef.current.x = e.clientX;
      clickRef.current.y = e.clientY;
      clickRef.current.power = 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    const tick = () => {
      const W = window.innerWidth, H = window.innerHeight;
      const col = theme === 'dark' ? '#7ab4ff' : '#2255cc';
      
      clickRef.current.power *= 0.92;
      const click = clickRef.current;
      const mouse = mouseRef.current;

      fishesRef.current.forEach(f => {
        f.wb += f.ws;
        const dx = f.x - mouse.x, dy = f.y - mouse.y;
        const d = Math.hypot(dx, dy);
        const R = 100;
        
        if (d < R && d > 0) {
          const proximity = (R - d) / R;
          const speedFactor = 0.6 + mouse.vel * 0.04;
          const str = proximity * speedFactor;
          f.ex += (dx / d) * str;
          f.ey += (dy / d) * str;
        }
        
        if (click.power > 0.05) {
          const cdx = f.x - click.x, cdy = f.y - click.y;
          const cd = Math.hypot(cdx, cdy);
          const CR = 300;
          if (cd < CR && cd > 0) {
            const str = ((CR - cd) / CR) * click.power * 5;
            f.ex += (cdx / cd) * str;
            f.ey += (cdy / cd) * str;
          }
        }
        
        f.ex *= 0.88; f.ey *= 0.88;
        f.x += f.vx + f.ex;
        f.y += f.vy + f.ey + Math.sin(f.wb) * 0.3;
        
        if (f.y < -20) f.y = H + 20;
        if (f.y > H + 20) f.y = -20;
        
        if (f.x > W + 120 || f.x < -120) {
          const goRight = Math.random() > 0.5;
          f.x = goRight ? -60 : W + 60;
          f.y = 60 + Math.random() * (H - 120);
          f.vx = (0.18 + Math.random() * 0.22) * (goRight ? 1 : -1);
          f.vy = (Math.random() - 0.5) * 0.12;
          f.ex = 0; f.ey = 0;
        }
        
        f.ft++;
        if (f.ft % 28 === 0) f.fi = (f.fi + 1) % 3;
        
        const goingRight = (f.vx + f.ex) >= 0;
        f.el.textContent = goingRight ? FISH_R[f.fi] : FISH_L[f.fi];
        f.el.style.color = col;
        f.el.style.transform = `translate(${f.x}px, ${f.y}px)`;
      });
      
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [theme]);

  return (
    <div
      ref={layerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}
    />
  );
}
