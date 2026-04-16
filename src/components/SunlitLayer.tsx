import { useAppContext } from '../AppContext';

export function SunlitLayer() {
  const { theme } = useAppContext();

  if (theme !== 'sunlit') return null;

  return (
    <div id="dappled-light">
      <div className="perspective">
        <div id="leaves">
          <svg style={{ width: 0, height: 0, position: 'absolute' }}>
            <defs>
              <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blurredLeaves" />
                <feTurbulence type="fractalNoise" numOctaves="2" seed="1" result="windNoise">
                  <animate attributeName="baseFrequency" dur="24s" keyTimes="0;0.5;1"
                    values="0.003 0.002;0.005 0.004;0.003 0.002" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="blurredLeaves" in2="windNoise" scale="15" xChannelSelector="R" yChannelSelector="G">
                  <animate attributeName="scale" dur="24s" keyTimes="0;0.25;0.5;0.75;1" values="10;20;15;20;10"
                    repeatCount="indefinite" />
                </feDisplacementMap>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
