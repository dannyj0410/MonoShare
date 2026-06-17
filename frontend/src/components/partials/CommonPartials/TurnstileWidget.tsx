import { Turnstile } from "@marsidev/react-turnstile";
import { memo } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
  containerClasses: string;
}

const TurnstileWidget = memo(function TurnstileWidget({
  onVerify,
  onExpire,
  containerClasses,
}: TurnstileWidgetProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (!siteKey || import.meta.env.DEV) return null;

  return (
    <div className={containerClasses}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onVerify}
        onExpire={onExpire}
        onError={onExpire}
        options={{ theme: "light", size: "flexible" }}
      />
    </div>
  );
});

export default TurnstileWidget;
