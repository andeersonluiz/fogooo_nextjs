export default function LabelTile({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="flex flex-col items-center w-[250px]  ">
      <p className="pb-3 text-lg text-center flex-1 justify-center content-center">
        {title}
      </p>
      <p className=" text-3xl  font-semibold">{value}</p>
    </div>
  );
}
