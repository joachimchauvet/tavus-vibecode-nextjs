import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import { Loader } from "@/components/Loader";

export const ConversationLoading: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex size-full items-center justify-center">
          <Loader type="grid" size="60" speed="1.5" color="black" />
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
