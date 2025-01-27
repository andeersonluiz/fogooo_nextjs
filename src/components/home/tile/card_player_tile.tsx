import { ReactNode } from "react";
import { AgeStatus } from "../components/player_info_component";
import arrowUp from "../../../../public/images/arrow_up.png";
import arrowDown from "../../../../public/images/arrow_down.png";

export default function CardPlayerTile({
  children,
  backgroundColor,
  ageStatus = AgeStatus.None,
}: {
  children: ReactNode;
  backgroundColor: string;
  ageStatus?: AgeStatus;
}) {
  return ageStatus != AgeStatus.None ? (
    <div
      className={` relative border-white rounded-2xl h-[100px] w-[100px]  mmg:w-[130px] mmg:h-[130px] flex ${backgroundColor} items-center justify-center p-4  border-2 `}
    >
      {ageStatus != AgeStatus.Equal && (
        <div className="absolute z-10 p-2">
          <img
            src={ageStatus == AgeStatus.Lower ? arrowDown.src : arrowUp.src}
          />
        </div>
      )}
      <div className="absolute z-20">{children}</div>
    </div>
  ) : (
    <div
      className={`border-white rounded-2xl h-[100px] w-[100px]  mmg:w-[130px] mmg:h-[130px] flex ${backgroundColor} items-center justify-center p-4  border-2 `}
    >
      {children}
    </div>
  );
}
