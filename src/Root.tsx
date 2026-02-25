import React from "react";
import { Composition } from "remotion";
import { AIReel, calculateReelMetadata } from "./compositions/AIReel";
import { DESIGN } from "./utils/constants";
import type { ReelContent } from "./utils/types";
import { validateReelContent } from "./utils/validateReel";

// Carga automática de todos los JSON de content/ usando webpack require.context.
// Validamos cada JSON y aplicamos defaults seguros para no bloquear el render.
declare const require: {
  context: (
    path: string,
    deep: boolean,
    filter: RegExp
  ) => { keys: () => string[]; <T>(id: string): T };
};

const contentCtx = require.context("../content", false, /\.json$/);
const ALL_CONTENT: ReelContent[] = contentCtx
  .keys()
  .sort()
  .map((key) => validateReelContent(contentCtx(key)));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {ALL_CONTENT.map((content) => (
        <Composition
          key={content.id}
          id={content.id}
          component={AIReel}
          durationInFrames={300}
          fps={DESIGN.FPS}
          width={DESIGN.WIDTH}
          height={DESIGN.HEIGHT}
          defaultProps={content}
          calculateMetadata={calculateReelMetadata}
        />
      ))}
    </>
  );
};
