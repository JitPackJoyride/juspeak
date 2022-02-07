import { useRecoilState } from "recoil";
import { profileState } from "stores/profileStore";

export default function ChangeUsername() {
  const [profile, setProfile] = useRecoilState(profileState);

  return (
    <div className="sm:col-span-4">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          value={profile.username}
          onChange={(e) => {
            setProfile((prevProfile) => {
              return { ...prevProfile, username: e.target.value };
            });
          }}
          className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
        />
      </div>
    </div>
  );
}
