import { FC } from "react";

interface ProfileLinkProps {
  url: string;
}

const ProfileLink: FC<ProfileLinkProps> = ({ url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
  >
    View GitHub Profile
  </a>
);

export default ProfileLink;
