import React from "react";
import {
  TransitionSeries,
  springTiming,
} from "@remotion/transitions";
import type { TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { useVideoConfig } from "remotion";
import { DESIGN } from "../utils/constants";
import type { ReelContent, Slide, SlideTransition } from "../utils/types";
import { SlideIntro } from "../components/slides/SlideIntro";
import { SlideConcept } from "../components/slides/SlideConcept";
import { SlideHighlight } from "../components/slides/SlideHighlight";
import { SlideOutro } from "../components/slides/SlideOutro";
import { SlideVersus } from "../components/slides/SlideVersus";

function renderSlide(slide: Slide): React.ReactNode {
  switch (slide.type) {
    case "intro":
      return <SlideIntro {...slide} />;
    case "concept":
      return <SlideConcept {...slide} />;
    case "highlight":
      return <SlideHighlight {...slide} />;
    case "outro":
      return <SlideOutro {...slide} />;
    case "versus":
      return <SlideVersus {...slide} />;
  }
}

function getTransitionPresentation(transition: SlideTransition | undefined): TransitionPresentation<Record<string, unknown>> {
  const t = transition ?? "crossfade";
  switch (t) {
    case "crossfade":
      return fade({ shouldFadeOutExitingScene: true }) as TransitionPresentation<Record<string, unknown>>;
    case "wipe":
      return wipe({ direction: "from-bottom" }) as TransitionPresentation<Record<string, unknown>>;
    case "push":
      return slide({ direction: "from-bottom" }) as TransitionPresentation<Record<string, unknown>>;
    default:
      return fade({ shouldFadeOutExitingScene: true }) as TransitionPresentation<Record<string, unknown>>;
  }
}

export const calculateReelMetadata = ({
  props,
}: {
  props: ReelContent;
}) => {
  const { slides, id } = props;
  const FPS = DESIGN.FPS;
  const TRANSITION_FRAMES = DESIGN.TRANSITION_FRAMES;

  const totalFrames = slides.reduce(
    (sum, s) => sum + Math.round(s.duration * FPS),
    0
  );
  const transitionFrames = Math.max(0, slides.length - 1) * TRANSITION_FRAMES;

  return {
    durationInFrames: Math.max(1, totalFrames - transitionFrames),
    defaultOutName: `${id}.mp4`,
  };
};

export const AIReel: React.FC<ReelContent> = (props) => {
  const { slides } = props;
  const { fps } = useVideoConfig();
  const TRANSITION_FRAMES = DESIGN.TRANSITION_FRAMES;

  const elements: React.ReactNode[] = [];
  slides.forEach((slide, i) => {
    elements.push(
      <TransitionSeries.Sequence
        key={`slide-${i}`}
        durationInFrames={Math.round(slide.duration * fps)}
      >
        {renderSlide(slide)}
      </TransitionSeries.Sequence>
    );

    if (i < slides.length - 1) {
      const transition = "transition" in slide ? slide.transition : undefined;
      elements.push(
        <TransitionSeries.Transition
          key={`transition-${i}`}
          presentation={getTransitionPresentation(transition)}
          timing={springTiming({
            config: { damping: 33 },
            durationInFrames: TRANSITION_FRAMES,
          })}
        />
      );
    }
  });

  return <TransitionSeries>{elements}</TransitionSeries>;
};
