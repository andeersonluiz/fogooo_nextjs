import { Club } from "./club";
import { Nationality } from "./nationality";

export type Player = {
  id: number;
  name: string;
  oficialName: string;
  nationality: Nationality;
  pos: string;
  age: number;
  playedForNationalTeam: boolean;
  clubHistory: Club[];
  imageUrl: string;
  yearsPlayedInterval: string[];
  yearsPlayed: number[];
};
