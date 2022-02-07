import { useRecoilState } from "recoil";
import { userState } from "stores/dbStore";
import { ChangeEvent, useState } from "react";
import { profileState } from "stores/profileStore";
import { supabase } from "utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import SingleActionModal, { ModalProps } from "components/SingleActionModal";

interface Props {
  onUpload: (storageUrl: string, usableUrl: string) => void;
}

export default function AvatarUpload({ onUpload }: Props) {
  const [{ userProfile }] = useRecoilState(userState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<ModalProps | null>(null);

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const avatarUrl = await downloadImage(filePath);

      if (avatarUrl) {
        onUpload(filePath, avatarUrl);
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          modalType: "error",
          title: "Error",
          description: error.message,
          buttonText: "Try again",
          onSubmit: () => {
            setMessage(null);
          },
        });
      }
    } finally {
      setUploading(false);
    }
  }

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error || data == null) {
        throw error;
      }
      return URL.createObjectURL(data);
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          modalType: "error",
          title: "Error",
          description: `Error downloading image: ${error.message}`,
          buttonText: "Try again",
          onSubmit: () => {
            setMessage(null);
          },
        });
      }
    }
  }

  return (
    <div className="sm:col-span-6">
      {message ? <SingleActionModal {...message} /> : <></>}
      <label
        htmlFor="photo"
        className="block text-sm font-medium text-gray-700"
      >
        Photo
      </label>
      <div className="mt-1 flex items-center">
        <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
          <img src={userProfile?.avatarUrl} alt={"Profile photo"} />
        </span>
        <label
          className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          htmlFor="single"
        >
          {uploading ? "Uploading ..." : "Change"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          className={"w-12"}
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
