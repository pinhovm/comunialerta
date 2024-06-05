import React, { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface KeyboardEventHandlerProps {
  children: ReactNode;
}

const KeyboardEventHandler: React.FC<KeyboardEventHandlerProps> = ({
  children,
}: KeyboardEventHandlerProps) => {
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const targetElement = event.target as HTMLElement;
      const isEditable =
        targetElement.isContentEditable ||
        targetElement.nodeName === "INPUT" ||
        targetElement.nodeName === "TEXTAREA";

      if (event.key === "Backspace" && !isEditable) {
        event.preventDefault();
        window.history.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [location]);

  return <>{children}</>;
};

export default KeyboardEventHandler;
