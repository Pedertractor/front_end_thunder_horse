const LevelForEffetiveCapacity = ({ capacity }: { capacity: number }) => {
  return (
    <p
      className={` font-semibold text-sm px-2 py-1 rounded ${
        capacity >= 50
          ? ' bg-green-400 text-green-800'
          : capacity <= 25
          ? ' bg-red-300 text-red-800'
          : 'bg-orange-400 text-orange-800'
      } `}
    >
      {capacity} %
    </p>
  );
};

export default LevelForEffetiveCapacity;
