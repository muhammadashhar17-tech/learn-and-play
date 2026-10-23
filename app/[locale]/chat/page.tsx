import { useTranslations } from "next-intl";
import { initLocale } from "@/lib/locale";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChatWindow } from "@/components/chat/ChatWindow";

export async function generateMetadata({ params }: PageProps<"/[locale]/chat">) {
  const { locale } = await params;
  return pageMetadata(locale, "chat", "/chat");
}

export default async function ChatPage({ params }: PageProps<"/[locale]/chat">) {
  await initLocale(params);
  return <ChatContent />;
}

function ChatContent() {
  const t = useTranslations("Chat");
  return (
    <>
      <PageHeader width="max-w-3xl" emoji="🤖" title={t("title")} subtitle={t("subtitle")} />
      <ChatWindow />
    </>
  );
}
