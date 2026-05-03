import Image from "next/image";

interface UserProfileCardProps {
  nickname: string;
  profileImageUrl: string;
}

export const UserProfileCard = ({
  nickname,
  profileImageUrl,
}: UserProfileCardProps): React.ReactElement => (
  <div className="flex items-center bg-gray-0 rounded-(--radius) px-2.5 py-4 gap-2.5 mx-5 mt-2.5">
    {profileImageUrl ? (
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image
          src={profileImageUrl}
          alt={`${nickname}의 프로필 이미지`}
          fill
          className="object-cover"
        />
      </div>
    ) : (
      <div className="h-10 w-10 rounded-full bg-gray-100" aria-hidden="true" />
    )}
    <p className="body1 text-gray-700">{nickname}</p>
  </div>
);
