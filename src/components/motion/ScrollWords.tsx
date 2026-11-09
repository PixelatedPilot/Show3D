import React, { useMemo } from 'react';
import { splitWordSegments, WordSegment } from '../../utils/motionHelpers';

export interface ScrollWordsProps {
  segments: WordSegment[];
  className?: string;
  emphasisColor?: string;
}

/**
 * Renders text whose words dynamically illuminate as the user scrolls past.
 * Recreates the Apple "Most wanted" copy reveal effect.
 * Fully accessible: provides unified aria-label for screen readers.
 */
export const ScrollWords: React.FC<ScrollWordsProps> = ({
  segments,
  className = '',
  emphasisColor = '#FFFFFF',
}) => {
  const fullSentence = useMemo(
    () => segments.map((s) => s.text).join(' '),
    [segments]
  );

  const tokens = useMemo(
    () => splitWordSegments(segments),
    [segments]
  );

  return (
    <span
      className={`inline-block ${className}`}
      aria-label={fullSentence}
    >
      <span aria-hidden="true">
        {tokens.map((token, idx) => {
          if (/^\s+$/.test(token.word)) {
            return <span key={idx}>{token.word}</span>;
          }

          const style: React.CSSProperties = {
            '--lit': token.emphasis ? emphasisColor : '#86868B',
            fontWeight: token.emphasis ? 600 : 400,
          } as React.CSSProperties;

          return (
            <span
              key={idx}
              className="s3d-word inline-block transition-colors duration-200"
              style={style}
            >
              {token.word}
            </span>
          );
        })}
      </span>
    </span>
  );
};
