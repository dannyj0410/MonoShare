import { Turnstile } from "@marsidev/react-turnstile";
import { memo } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

const TurnstileWidget = memo(function TurnstileWidget({
  onVerify,
  onExpire,
}: TurnstileWidgetProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (!siteKey || import.meta.env.DEV) return null;

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onExpire={onExpire}
      onError={onExpire}
      options={{ theme: "dark", size: "invisible" }}
    />
  );
});

export default TurnstileWidget;
