export interface IProcessStep {
  progressBarClr: string;
  pingClr: string;
  step: string;
  textClr: string;
  textBGClr: string;
  bgClr: string;
  text: string;
  extraText: string;
  status: string;
  id: number;
  guide: string;
}
export type ProcessStepsType = Record<
  "create" | "share" | "erase",
  IProcessStep
>;
