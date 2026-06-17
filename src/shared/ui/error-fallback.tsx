import Image from "next/image";

const ErrorFallback = () => (
  <div className="flex h-full flex-col items-center justify-center gap-2">
    <Image src="/images/error.png" alt="오류" width={151} height={56} />
    <p className="body3 text-center text-gray-500">
      오류가 발생했어요.
      <br />
      잠시 후 다시 시도해주세요.
    </p>
  </div>
);

export { ErrorFallback };
