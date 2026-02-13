import { useGetChatbotSettingQuery } from '@/services/settingApi';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';

export default function Chatbot() {
  const { data } = useGetChatbotSettingQuery();

  const fileUrl = data?.data?.chatbot_image_url;
  const label = data?.data?.chatbot_label;

  const isVideo = fileUrl?.toLowerCase().endsWith(".mp4");

  return (
    <Button
      className="fixed! bottom-2 right-2 lg:bottom-4 lg:right-4 max-w-fit px-8!"
      variant="contained"
      color="primary"
      fullWidth
      LinkComponent={"a"}
      href={data?.data?.chatbot_link || ""}
      target='_black'
      sx={{
        justifyContent: "start"
      }}
    >
      <div className=" w-full flex! justify-start! items-center! gap-4">
        {fileUrl && (
          isVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-11 h-11 rounded-full object-cover"
            >
              <source src={fileUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={fileUrl}
              alt="chatbot"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
          )
        )}

        <Typography variant="subtitle2">
          {label}
        </Typography>
      </div>
    </Button>
  );
}
