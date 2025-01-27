export default function CardHeader({ text }: { text: string }) {
  return (
    <div className="h-[100px] w-[100px]  mmg:w-[130px] mmg:h-[100px] items-center flex flex-col justify-center">
      <p className="text-white text-center flex-1 flex items-center ">{text}</p>
      <div className="bg-white h-[5px] w-full rounded-2xl"></div>
    </div>
  );
}
